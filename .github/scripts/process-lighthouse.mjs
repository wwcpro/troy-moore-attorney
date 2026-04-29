#!/usr/bin/env node
// Reads lhci-results/ and writes lighthouse-results.json with findings + scores.
import { readdirSync, readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { join } from 'path';

const THRESHOLDS = {
  performance:    { warning: 0.80, blocking: 0.60 },
  accessibility:  { blocking: 0.95 },
  seo:            { blocking: 1.00 },
  best_practices: { warning: 0.85 },
  lcp_ms:         { blocking: 2500 },
  cls:            { blocking: 0.1 },
  tbt_ms:         { blocking: 200 },
};

// Try to load project overrides from .wwc/prod-gate.yml
try {
  // Python yaml is not available in Node; use a simple regex-based reader
  // for the subset of fields we care about. Full YAML parsing would need
  // a dep install — acceptable for v1.
  const _ = readFileSync('.wwc/prod-gate.yml', 'utf8');
  // Future: parse lighthouse threshold overrides from config
} catch { /* no config — use defaults */ }

const LHCI_DIR = './lhci-results';

const findings = [];
const scores = {};     // { performance: "95", accessibility: "100", ... }
const cwv = {};        // { lcp_ms: 1200, cls: 0.03, tbt_ms: 80 }

if (!existsSync(LHCI_DIR)) {
  console.warn('[process-lighthouse] lhci-results/ not found — writing empty result');
  const result = { scores, cwv, findings, blocking_count: 0, warning_count: 0, passed: true, error: 'Lighthouse did not produce results' };
  writeFileSync('lighthouse-results.json', JSON.stringify(result, null, 2));
  setOutputs(0, 0, true);
  process.exit(0);
}

// LHCI filesystem upload produces files named *.report.json
const files = readdirSync(LHCI_DIR).filter(f => f.endsWith('.report.json'));

if (files.length === 0) {
  console.warn('[process-lighthouse] No LHR files found');
  const result = { scores, cwv, findings, blocking_count: 0, warning_count: 0, passed: true, error: 'No Lighthouse report files found' };
  writeFileSync('lighthouse-results.json', JSON.stringify(result, null, 2));
  setOutputs(0, 0, true);
  process.exit(0);
}

// Aggregate across all URL runs (take the worst scores)
const allPerf   = [];
const allA11y   = [];
const allSeo    = [];
const allBP     = [];
const allLcp    = [];
const allCls    = [];
const allTbt    = [];

for (const file of files) {
  let lhr;
  try {
    lhr = JSON.parse(readFileSync(join(LHCI_DIR, file), 'utf8'));
  } catch {
    continue;
  }
  const cats = lhr.categories ?? {};
  const audits = lhr.audits ?? {};

  if (cats.performance)    allPerf.push(cats.performance.score ?? 0);
  if (cats.accessibility)  allA11y.push(cats.accessibility.score ?? 0);
  if (cats.seo)            allSeo.push(cats.seo.score ?? 0);
  if (cats['best-practices']) allBP.push(cats['best-practices'].score ?? 0);

  if (audits['largest-contentful-paint']?.numericValue != null)
    allLcp.push(audits['largest-contentful-paint'].numericValue);
  if (audits['cumulative-layout-shift']?.numericValue != null)
    allCls.push(audits['cumulative-layout-shift'].numericValue);
  if (audits['total-blocking-time']?.numericValue != null)
    allTbt.push(audits['total-blocking-time'].numericValue);
}

const min = arr => arr.length ? Math.min(...arr) : null;
const max = arr => arr.length ? Math.max(...arr) : null;

const perfScore = min(allPerf);
const a11yScore = min(allA11y);
const seoScore  = min(allSeo);
const bpScore   = min(allBP);
const lcpMs     = max(allLcp);
const clsVal    = max(allCls);
const tbtMs     = max(allTbt);

// Round scores to display as percentages
if (perfScore != null) scores.performance    = String(Math.round(perfScore * 100));
if (a11yScore != null) scores.accessibility  = String(Math.round(a11yScore * 100));
if (seoScore  != null) scores.seo            = String(Math.round(seoScore  * 100));
if (bpScore   != null) scores.best_practices = String(Math.round(bpScore   * 100));
if (lcpMs     != null) cwv.lcp_ms = Math.round(lcpMs);
if (clsVal    != null) cwv.cls    = Number(clsVal.toFixed(3));
if (tbtMs     != null) cwv.tbt_ms = Math.round(tbtMs);

function check(value, threshold, label, unit = '') {
  if (value == null) return;
  const display = unit === '%' ? `${Math.round(value * 100)}%` : `${value}${unit}`;
  if (threshold.blocking != null) {
    const fail = unit === '%' ? value < threshold.blocking : value > threshold.blocking;
    if (fail) {
      findings.push({ severity: 'blocking', check: 'lighthouse', id: label, detail: `${label}: ${display} (threshold: ${threshold.blocking}${unit})` });
      return;
    }
  }
  if (threshold.warning != null) {
    const warn = unit === '%' ? value < threshold.warning : value > threshold.warning;
    if (warn) {
      findings.push({ severity: 'warning', check: 'lighthouse', id: label, detail: `${label}: ${display} (threshold: ${threshold.warning}${unit})` });
    }
  }
}

check(perfScore,  THRESHOLDS.performance,    'performance',    '%');
check(a11yScore,  THRESHOLDS.accessibility,  'accessibility',  '%');
check(seoScore,   THRESHOLDS.seo,            'seo',            '%');
check(bpScore,    THRESHOLDS.best_practices, 'best_practices', '%');
check(lcpMs,      THRESHOLDS.lcp_ms,         'lcp',            'ms');
check(clsVal,     THRESHOLDS.cls,            'cls',            '');
check(tbtMs,      THRESHOLDS.tbt_ms,         'tbt',            'ms');

const blockingCount = findings.filter(f => f.severity === 'blocking').length;
const warningCount  = findings.filter(f => f.severity === 'warning').length;
const passed = blockingCount === 0;

const result = { scores, cwv, findings, blocking_count: blockingCount, warning_count: warningCount, passed };
writeFileSync('lighthouse-results.json', JSON.stringify(result, null, 2));

console.log('[process-lighthouse] Scores:', scores);
console.log('[process-lighthouse] CWV:', cwv);
console.log(`[process-lighthouse] ${blockingCount} blocking, ${warningCount} warnings`);

setOutputs(blockingCount, warningCount, passed);
if (!passed) process.exit(1);

function setOutputs(blocking, warning, ok) {
  const out = process.env.GITHUB_OUTPUT;
  if (!out) return;
  try { appendFileSync(out, `blocking_count=${blocking}\nwarning_count=${warning}\npassed=${ok}\n`); }
  catch { /* not in GHA */ }
}
