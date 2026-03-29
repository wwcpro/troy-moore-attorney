"use client";

export type TreeHighlight = "probate-will" | "muniment" | "heirship" | "heirship-admin" | "sea" | "aoh";

export default function ProbateDecisionTree({ highlight }: { highlight: TreeHighlight }) {
  const GOLD = "#C3A05B";
  const isWill = highlight === "probate-will" || highlight === "muniment";
  const isNoWill = !isWill;
  const line = (active: boolean) => (active ? GOLD : "rgba(255,255,255,0.1)");

  const branchCard = (active: boolean) => ({
    textAlign: "center" as const,
    padding: "0.45rem 0.75rem",
    border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.1)"}`,
    borderRadius: 4,
    background: active ? "rgba(195,160,91,0.07)" : "rgba(0,0,0,0.2)",
    opacity: active ? 1 : 0.4,
  });

  const leafCard = (nodeKey: string) => {
    const active = highlight === nodeKey;
    return {
      padding: "0.75rem 0.85rem",
      border: `1px solid ${active ? GOLD : "rgba(255,255,255,0.07)"}`,
      borderRadius: 6,
      background: active ? "rgba(195,160,91,0.06)" : "rgba(0,0,0,0.15)",
      opacity: active ? 1 : 0.35,
      flex: 1,
      minWidth: 0,
    };
  };

  const textColor = (nodeKey: string) =>
    highlight === nodeKey ? "#fff" : "rgba(255,255,255,0.45)";
  const priceOpacity = (nodeKey: string) => (highlight === nodeKey ? 1 : 0.3);
  const bulletColor = (nodeKey: string) =>
    highlight === nodeKey ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)";

  const willNodes = [
    {
      key: "muniment",
      label: "Muniment of Title",
      price: "From $3,950",
      bullets: [
        "No unpaid estate debts",
        "No executor appointed",
        "Will becomes title document",
        "Efficient — limited scope",
      ],
    },
    {
      key: "probate-will",
      label: "Independent Administration",
      price: "From $4,550",
      bullets: [
        "Valid will required",
        "Executor appointed by court",
        "Letters Testamentary issued",
        "Creditor notice required",
      ],
    },
  ];

  const noWillNodes = [
    {
      key: "sea",
      label: "Small Estate Affidavit",
      price: "From $3,450",
      bullets: [
        "Under statutory value cap",
        "No real estate (excl. homestead)",
        "All heirs must sign",
        "Court approval required",
      ],
    },
    {
      key: "heirship",
      label: "Heirship Proceeding",
      price: "From $7,150",
      bullets: [
        "Identifies legal heirs",
        "No admin authority granted",
        "Filed in property records",
        "Atty ad litem required",
      ],
    },
    {
      key: "heirship-admin",
      label: "Heirship + Administration",
      price: "From $8,150",
      bullets: [
        "Identifies legal heirs",
        "Administrator appointed",
        "Letters of Administration",
        "Full estate authority",
      ],
    },
    {
      key: "aoh",
      label: "Affidavit of Heirship",
      price: "From $3,250",
      bullets: [
        "Real property only",
        "No court proceeding required",
        "Based on family history",
        "May not satisfy all lenders",
      ],
    },
  ];

  return (
    <div
      style={{
        marginBottom: "clamp(2rem, 3vw, 3rem)",
        padding: "1.25rem",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 8,
        background: "rgba(0,0,0,0.12)",
      }}
    >
      <style>{`
        .decision-tree-cols { display: flex; gap: 0.75rem; align-items: flex-start; }
        .decision-tree-col-will { flex: 1; min-width: 0; }
        .decision-tree-col-nowill { flex: 2; min-width: 0; }
        @media (max-width: 520px) {
          .decision-tree-cols { flex-direction: column; }
          .decision-tree-col-will,
          .decision-tree-col-nowill { flex: 1; min-width: 0; }
          .decision-tree-divider { display: none; }
        }
      `}</style>
      <p
        className="eyebrow"
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.35)",
          fontSize: "clamp(0.55rem, 0.58vw, 0.7rem)",
          letterSpacing: "0.2em",
          marginBottom: "1rem",
        }}
      >
        Texas Probate Options
      </p>

      {/* Root → branch connector */}
      <div style={{ position: "relative", height: 20, marginBottom: 0 }}>
        <div
          style={{
            position: "absolute",
            left: "17%",
            width: "50%",
            top: 0,
            height: 1.5,
            background: `linear-gradient(90deg, ${line(isWill)}, ${line(isNoWill)})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "17%",
            top: 0,
            width: 1.5,
            height: 20,
            background: line(isWill),
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "67%",
            top: 0,
            width: 1.5,
            height: 20,
            background: line(isNoWill),
          }}
        />
      </div>

      <div className="decision-tree-cols">
        {/* WITH A WILL column */}
        <div className="decision-tree-col-will">
          <div style={branchCard(isWill)}>
            <span
              className="eyebrow"
              style={{
                color: isWill ? GOLD : "rgba(255,255,255,0.25)",
                fontSize: "clamp(0.5rem, 0.55vw, 0.65rem)",
              }}
            >
              With a Will
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", height: 14 }}>
            <div style={{ width: 1.5, background: line(isWill), height: "100%" }} />
          </div>
          <div style={{ position: "relative", height: 12, marginBottom: 0 }}>
            <div
              style={{
                position: "absolute",
                left: "25%",
                right: "25%",
                top: 0,
                height: 1.5,
                background: line(isWill),
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "25%",
                top: 0,
                width: 1.5,
                height: 12,
                background: line(highlight === "muniment"),
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "25%",
                top: 0,
                width: 1.5,
                height: 12,
                background: line(highlight === "probate-will"),
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {willNodes.map((n) => (
              <div key={n.key} style={leafCard(n.key)}>
                <p
                  style={{
                    color: textColor(n.key),
                    fontWeight: 500,
                    marginBottom: "0.2rem",
                    fontSize: "clamp(0.68rem, 0.7vw, 0.82rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {n.label}
                </p>
                <p
                  style={{
                    color: GOLD,
                    opacity: priceOpacity(n.key),
                    fontWeight: 600,
                    fontSize: "clamp(0.65rem, 0.68vw, 0.8rem)",
                    marginBottom: "0.45rem",
                  }}
                >
                  {n.price}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {n.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.3rem",
                        color: bulletColor(n.key),
                        fontSize: "clamp(0.6rem, 0.62vw, 0.75rem)",
                        lineHeight: 1.55,
                        marginBottom: "0.1rem",
                      }}
                    >
                      <span
                        style={{
                          color: GOLD,
                          opacity: highlight === n.key ? 0.7 : 0.25,
                          flexShrink: 0,
                        }}
                      >
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="decision-tree-divider"
          style={{
            width: 1,
            background: "rgba(255,255,255,0.05)",
            alignSelf: "stretch",
            flexShrink: 0,
          }}
        />

        {/* WITHOUT A WILL column */}
        <div className="decision-tree-col-nowill">
          <div style={branchCard(isNoWill)}>
            <span
              className="eyebrow"
              style={{
                color: isNoWill ? GOLD : "rgba(255,255,255,0.25)",
                fontSize: "clamp(0.5rem, 0.55vw, 0.65rem)",
              }}
            >
              Without a Will
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", height: 14 }}>
            <div style={{ width: 1.5, background: line(isNoWill), height: "100%" }} />
          </div>
          <div style={{ position: "relative", height: 12, marginBottom: 0 }}>
            <div
              style={{
                position: "absolute",
                left: "25%",
                right: "25%",
                top: 0,
                height: 1.5,
                background: line(isNoWill),
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "25%",
                top: 0,
                width: 1.5,
                height: 12,
                background: line(highlight === "sea" || highlight === "heirship-admin"),
              }}
            />
            <div
              style={{
                position: "absolute",
                right: "25%",
                top: 0,
                width: 1.5,
                height: 12,
                background: line(highlight === "heirship" || highlight === "aoh"),
              }}
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}
          >
            {noWillNodes.map((n) => (
              <div key={n.key} style={leafCard(n.key)}>
                <p
                  style={{
                    color: textColor(n.key),
                    fontWeight: 500,
                    marginBottom: "0.2rem",
                    fontSize: "clamp(0.68rem, 0.7vw, 0.82rem)",
                    lineHeight: 1.3,
                  }}
                >
                  {n.label}
                </p>
                <p
                  style={{
                    color: GOLD,
                    opacity: priceOpacity(n.key),
                    fontWeight: 600,
                    fontSize: "clamp(0.65rem, 0.68vw, 0.8rem)",
                    marginBottom: "0.45rem",
                  }}
                >
                  {n.price}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {n.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: "0.3rem",
                        color: bulletColor(n.key),
                        fontSize: "clamp(0.6rem, 0.62vw, 0.75rem)",
                        lineHeight: 1.55,
                        marginBottom: "0.1rem",
                      }}
                    >
                      <span
                        style={{
                          color: GOLD,
                          opacity: highlight === n.key ? 0.7 : 0.25,
                          flexShrink: 0,
                        }}
                      >
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
