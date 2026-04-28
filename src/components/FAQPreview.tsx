import { supabase } from "@/lib/supabase";

interface FAQPreviewProps {
  category: "Probate" | "Estate Planning" | "Other Practices";
  limit?: number;
  /**
   * Optional inline items. When provided, FAQPreview renders these directly
   * instead of querying Supabase. Used by location pages to show
   * location-specific FAQs that aren't in the global FAQ database.
   */
  items?: { question: string }[];
}

export default async function FAQPreview({ category, limit = 5, items }: FAQPreviewProps) {
  let displayItems: { id: string | number; question: string }[];

  if (items && items.length > 0) {
    displayItems = items
      .slice(0, limit)
      .map((it, i) => ({ id: `inline-${i}`, question: it.question }));
  } else {
    const { data } = await supabase
      .from("faq")
      .select("id, question")
      .eq("category", category)
      .order("sort_order")
      .limit(limit);
    displayItems = data ?? [];
  }

  return (
    <>
      <style>{`
        .faq-preview-item {
          border-bottom: 1px solid #e5e7eb;
        }
        .faq-preview-item:first-child { border-top: 1px solid #e5e7eb; }

        .faq-preview-row {
          display: flex;
          align-items: baseline;
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
          padding: clamp(1rem, 1.5vw, 1.4rem) 0;
        }

        .faq-preview-num {
          font-family: var(--font-heading);
          font-size: clamp(1.25rem, 1.8vw, 2rem);
          font-weight: 300;
          font-style: italic;
          color: var(--gold);
          opacity: 0.4;
          min-width: 1.6ch;
          line-height: 1;
          flex-shrink: 0;
        }

        .faq-preview-q {
          font-family: var(--font-heading);
          font-size: clamp(0.92rem, 1.05vw, 1.15rem);
          font-weight: 300;
          font-style: italic;
          color: var(--navy);
          line-height: 1.3;
          flex: 1;
        }

        .faq-preview-arrow {
          flex-shrink: 0;
          color: var(--gold);
          opacity: 0.5;
          font-family: var(--font-eyebrow);
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .faq-preview-item:hover .faq-preview-arrow {
          opacity: 1;
          transform: translateX(3px);
        }
        .faq-preview-item:hover .faq-preview-q { color: var(--gold); }
        .faq-preview-q { transition: color 0.2s ease; }
      `}</style>

      <div>
        {displayItems.map((item, idx) => (
          <a
            key={item.id}
            href={`/faq`}
            className="faq-preview-item"
            style={{ display: "block", textDecoration: "none" }}
          >
            <div className="faq-preview-row">
              <span className="faq-preview-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="faq-preview-q">{item.question}</span>
              <span className="faq-preview-arrow">→</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
