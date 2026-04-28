#!/usr/bin/env node
// static-check.mjs — scans PR diff for content quality + code quality issues.
import { writeFileSync, appendFileSync } from 'fs';

const PR_NUMBER    = process.env.PR_NUMBER;
const GH_TOKEN     = process.env.GITHUB_TOKEN;
const GH_REPO      = process.env.GITHUB_REPOSITORY; // "owner/repo"

if (!GH_TOKEN || !GH_REPO) {
  console.error('[static] GITHUB_TOKEN or GITHUB_REPOSITORY not set');
  process.exit(1);
}

const findings = [];

// Fetch PR files via GitHub API (includes per-file patches)
let prFiles = [];
if (PR_NUMBER) {
  try {
    const url = `https://api.github.com/repos/${GH_REPO}/pulls/${PR_NUMBER}/files?per_page=100`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${GH_TOKEN}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (res.ok) {
      prFiles = await res.json();
      console.log(`[static] Checking ${prFiles.length} changed files from PR #${PR_NUMBER}`);
    } else {
      console.warn(`[static] GitHub API ${res.status} — falling back to git diff`);
    }
  } catch (err) {
    console.warn('[static] Could not fetch PR files:', err.message);
  }
} else {
  console.warn('[static] No PR_NUMBER — skipping diff-based checks');
}

const JSX_EXTS = /\.(tsx?|jsx?|html?)$/;

for (const file of prFiles) {
  const patch = file.patch ?? '';
  const name  = file.filename;

  // Only scan added lines (lines starting with '+', not '+++')
  const addedLines = patch.split('\n').filter(l => l.startsWith('+') && !l.startsWith('+++'));
  const added = addedLines.join('\n');
  if (!added.trim()) continue;

  // ── No Lorem ipsum (blocking) ───────────────────────────────────────────
  if (/lorem\s+ipsum/i.test(added)) {
    findings.push({
      severity: 'blocking',
      check:    'content_quality',
      id:       'no_lorem_ipsum',
      file:     name,
      detail:   'Lorem ipsum placeholder text detected in added lines',
    });
  }

  // ── No console.log / console.debug added (blocking) ────────────────────
  const consoleCalls = addedLines
    .filter(l => /\bconsole\.(log|debug)\s*\(/.test(l))
    .map(l => l.replace(/^\+/, '').trim().slice(0, 80));
  if (consoleCalls.length > 0) {
    findings.push({
      severity: 'blocking',
      check:    'code_quality',
      id:       'no_console_log',
      file:     name,
      detail:   `console.log/debug added: ${consoleCalls[0]}${consoleCalls.length > 1 ? ` (+${consoleCalls.length - 1} more)` : ''}`,
    });
  }

  // ── No TODO/FIXME added (warning) ───────────────────────────────────────
  const todos = addedLines
    .filter(l => /\b(TODO|FIXME)\b/.test(l))
    .map(l => l.replace(/^\+/, '').trim().slice(0, 80));
  if (todos.length > 0) {
    findings.push({
      severity: 'warning',
      check:    'content_quality',
      id:       'no_todo_fixme',
      file:     name,
      detail:   `TODO/FIXME added: ${todos[0]}`,
    });
  }

  // ── <img> without non-empty alt (blocking) ──────────────────────────────
  // Only check JSX/TSX/HTML files
  if (JSX_EXTS.test(name)) {
    // Match <img ... > or <img ... /> including multiline (within same added hunk)
    const imgPattern = /<img\b([^>]*?)(?:\/>|>)/gi;
    let m;
    while ((m = imgPattern.exec(added)) !== null) {
      const attrs = m[1];
      // Skip if alt is a non-empty string literal or JSX expression with content
      const altStringMatch = attrs.match(/\balt\s*=\s*["']([^"']*)["']/);
      const altExprMatch   = attrs.match(/\balt\s*=\s*\{([^}]{1,})\}/);
      const hasAlt = altStringMatch || altExprMatch;
      const hasEmptyAlt = altStringMatch && altStringMatch[1].trim() === '';

      if (!hasAlt || hasEmptyAlt) {
        findings.push({
          severity: 'blocking',
          check:    'accessibility',
          id:       'img_alt_text',
          file:     name,
          detail:   '<img> element added without a non-empty alt attribute',
        });
        break; // one finding per file is enough
      }
    }
  }
}

const blockingCount = findings.filter(f => f.severity === 'blocking').length;
const warningCount  = findings.filter(f => f.severity === 'warning').length;
const passed = blockingCount === 0;

const output = { findings, blocking_count: blockingCount, warning_count: warningCount, passed };
writeFileSync('static-results.json', JSON.stringify(output, null, 2));
console.log(`[static] Done — ${blockingCount} blocking, ${warningCount} warnings`);

if (!passed) {
  console.log('Blocking findings:');
  findings.filter(f => f.severity === 'blocking').forEach(f => {
    console.log(`  [${f.id}] ${f.file}: ${f.detail}`);
  });
}

const ghaOut = process.env.GITHUB_OUTPUT;
if (ghaOut) {
  try {
    appendFileSync(ghaOut, `blocking_count=${blockingCount}\nwarning_count=${warningCount}\npassed=${passed}\n`);
  } catch { /* */ }
}

if (!passed) process.exit(1);
