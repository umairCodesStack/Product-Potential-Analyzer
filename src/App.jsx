import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');

  :root {
    --bg: #080b10;
    --surface: #0d1117;
    --surface2: #131921;
    --border: #1e2a38;
    --accent: #00e5ff;
    --accent2: #ff3d6b;
    --accent3: #7fff6e;
    --text: #e2eaf5;
    --muted: #556070;
    --glow: 0 0 20px rgba(0, 229, 255, 0.3);
    --glow2: 0 0 20px rgba(255, 61, 107, 0.3);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background:
      radial-gradient(ellipse 80% 50% at 20% -10%, rgba(0,229,255,0.05) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 110%, rgba(255,61,107,0.05) 0%, transparent 60%),
      var(--bg);
  }

  .header {
    padding: 32px 48px 0;
    display: flex;
    align-items: flex-end;
    gap: 16px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 24px;
  }

  .header-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    letter-spacing: 4px;
    background: linear-gradient(90deg, var(--accent), #fff 60%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1;
  }

  .header-sub {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 2px;
    text-transform: uppercase;
    padding-bottom: 4px;
  }

  .header-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent3);
    box-shadow: 0 0 10px var(--accent3);
    animation: pulse 2s infinite;
    margin-bottom: 8px;
    margin-left: auto;
  }

  @keyframes pulse {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:0.4; transform: scale(0.8); }
  }

  .tabs {
    display: flex;
    padding: 0 48px;
    gap: 0;
    border-bottom: 1px solid var(--border);
  }

  .tab {
    padding: 16px 28px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--muted);
    position: relative;
    transition: color 0.2s;
  }

  .tab:hover { color: var(--text); }

  .tab.active {
    color: var(--accent);
  }

  .tab.active::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 2px;
    background: var(--accent);
    box-shadow: var(--glow);
  }

  .tab-icon { margin-right: 8px; }

  .main { padding: 40px 48px; max-width: 1200px; }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 28px;
    position: relative;
    overflow: hidden;
  }

  .panel::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.6;
  }

  .panel-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .panel-label::before {
    content: '';
    display: inline-block;
    width: 20px; height: 1px;
    background: var(--accent);
  }

  .field { margin-bottom: 16px; }

  .field label {
    display: block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .field input, .field select, .field textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
  }

  .field input:focus, .field select:focus, .field textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 1px rgba(0,229,255,0.2);
  }

  .field textarea { resize: vertical; min-height: 72px; }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .btn {
    width: 100%;
    padding: 14px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 3px;
    cursor: pointer;
    border: none;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
    margin-top: 8px;
  }

  .btn-primary {
    background: var(--accent);
    color: #000;
  }

  .btn-primary:hover {
    box-shadow: var(--glow);
    transform: translateY(-1px);
  }

  .btn-danger {
    background: var(--accent2);
    color: #fff;
  }

  .btn-danger:hover {
    box-shadow: var(--glow2);
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  .btn-spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #000;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* RESULT PANEL */
  .result-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 28px;
    position: relative;
    animation: fadeSlide 0.4s ease;
  }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-panel.predict::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent3));
  }

  .result-panel.safebuy::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent2), #ffaa00);
  }

  .tier-badge {
    display: inline-block;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    letter-spacing: 4px;
    padding: 8px 24px;
    border: 1px solid currentColor;
    margin-bottom: 20px;
  }

  .tier-high { color: var(--accent3); border-color: var(--accent3); text-shadow: 0 0 20px var(--accent3); }
  .tier-medium { color: #ffc837; border-color: #ffc837; text-shadow: 0 0 20px #ffc837; }
  .tier-low { color: var(--accent2); border-color: var(--accent2); text-shadow: 0 0 20px var(--accent2); }

  .confidence-meter {
    margin: 20px 0;
  }

  .confidence-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
  }

  .bar-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--muted);
    width: 60px;
    text-align: right;
  }

  .bar-track {
    flex: 1;
    height: 6px;
    background: var(--surface2);
    border: 1px solid var(--border);
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .bar-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: var(--text);
    width: 40px;
  }

  .bar-high { background: var(--accent3); box-shadow: 0 0 8px var(--accent3); }
  .bar-medium { background: #ffc837; box-shadow: 0 0 8px #ffc837; }
  .bar-low { background: var(--accent2); box-shadow: 0 0 8px var(--accent2); }

  .summary-text {
    font-size: 15px;
    color: #aab;
    line-height: 1.6;
    border-left: 2px solid var(--border);
    padding-left: 14px;
    margin: 20px 0;
  }

  .actions-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .action-item {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--text);
    line-height: 1.4;
  }

  .action-item::before {
    content: '→';
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* SAFE BUY */
  .score-ring-wrap {
    display: flex;
    align-items: center;
    gap: 28px;
    margin-bottom: 24px;
  }

  .score-ring {
    position: relative;
    width: 100px; height: 100px;
    flex-shrink: 0;
  }

  .score-ring svg { transform: rotate(-90deg); }

  .score-ring-val {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    letter-spacing: 2px;
  }

  .safe-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 30px;
    letter-spacing: 3px;
    margin-bottom: 6px;
  }

  .safe-message {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.6;
  }

  .safe-good { color: var(--accent3); }
  .safe-bad { color: var(--accent2); }
  .safe-ok { color: #ffc837; }

  .divider {
    border: none;
    border-top: 1px solid var(--border);
    margin: 24px 0;
  }

  .stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    margin-top: 16px;
  }

  .stat-cell {
    background: var(--surface2);
    padding: 14px;
    text-align: center;
  }

  .stat-cell-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: 2px;
    color: var(--accent);
    display: block;
  }

  .stat-cell-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--muted);
    display: block;
    margin-top: 2px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--muted);
  }

  .empty-icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.3;
  }

  .empty-state p {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .error-box {
    background: rgba(255,61,107,0.08);
    border: 1px solid rgba(255,61,107,0.3);
    padding: 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--accent2);
    margin-top: 12px;
  }

  select option { background: var(--surface2); }

  @media (max-width: 768px) {
    .header { padding: 24px 20px 16px; }
    .tabs { padding: 0 20px; }
    .main { padding: 24px 20px; }
    .grid-2 { grid-template-columns: 1fr; }
  }
`;

const categories = [
  "Electronics",
  "Computers&Accessories",
  "Home&Kitchen",
  "Health&PersonalCare",
  "Sports",
  "Clothing",
  "Beauty",
];

const subCategories = [
  "Headphones,Earbuds&Accessories",
  "Accessories&Peripherals",
  "MobileAccessories",
  "Kitchen&HomeAppliances",
  "HomeMedicalSupplies&Equipment",
  "OralCare",
  "ExerciseAndFitness",
  "SportsFootwear",
  "Skincare",
  "Televisions",
];

// ─── PREDICT TAB ───────────────────────────────────────────────────────────────
function PredictTab() {
  const [form, setForm] = useState({
    product_name: "",
    discounted_price: "",
    actual_price: "",
    discount_percentage: "",
    main_category: "Electronics",
    sub_category: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const autoDiscount = (f) => {
    const d =
      f.actual_price && f.discounted_price
        ? Math.round(
            ((f.actual_price - f.discounted_price) / f.actual_price) * 100,
          )
        : f.discount_percentage;
    return d;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const disc = autoDiscount(form);
    const payload = {
      product_name: form.product_name,
      discounted_price: Number(form.discounted_price),
      actual_price: Number(form.actual_price),
      discount_percentage: Number(disc),
      main_category: form.main_category,
      sub_category: form.sub_category,
      about: form.about,
    };
    try {
      const res = await fetch(
        "https://product-sales-prediction-ctb4aef5escjd7a8.centralindia-01.azurewebsites.net/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "API error");
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const tierClass = (tier) => {
    if (!tier) return "";
    const t = tier.toUpperCase();
    if (t.includes("HIGH")) return "tier-high";
    if (t.includes("MEDIUM")) return "tier-medium";
    return "tier-low";
  };

  const tierLabel = (tier) => {
    if (!tier) return "";
    const t = tier.toUpperCase();
    if (t.includes("HIGH")) return "HIGH POTENTIAL";
    if (t.includes("MEDIUM")) return "MODERATE";
    return "LOW POTENTIAL";
  };

  return (
    <div className="grid-2">
      <div className="panel">
        <div className="panel-label">Product Details</div>
        <div className="field">
          <label>Product Name</label>
          <input
            value={form.product_name}
            onChange={set("product_name")}
            placeholder="e.g. Wireless Bluetooth Earbuds"
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Actual Price (₹)</label>
            <input
              type="number"
              value={form.actual_price}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => {
                  const disc =
                    v && f.discounted_price
                      ? Math.round(((v - f.discounted_price) / v) * 100)
                      : f.discount_percentage;
                  return { ...f, actual_price: v, discount_percentage: disc };
                });
              }}
              placeholder="2999"
            />
          </div>
          <div className="field">
            <label>Discounted Price (₹)</label>
            <input
              type="number"
              value={form.discounted_price}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => {
                  const disc =
                    f.actual_price && v
                      ? Math.round(
                          ((f.actual_price - v) / f.actual_price) * 100,
                        )
                      : f.discount_percentage;
                  return {
                    ...f,
                    discounted_price: v,
                    discount_percentage: disc,
                  };
                });
              }}
              placeholder="999"
            />
          </div>
        </div>
        <div className="field">
          <label>Discount % (auto-calculated)</label>
          <input
            type="number"
            value={form.discount_percentage}
            onChange={set("discount_percentage")}
            placeholder="67"
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Main Category</label>
            <select value={form.main_category} onChange={set("main_category")}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label>Sub Category</label>
            <select value={form.sub_category} onChange={set("sub_category")}>
              {subCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>{" "}
          </div>
        </div>
        <div className="field">
          <label>Keywords / About</label>
          <textarea
            value={form.about}
            onChange={set("about")}
            placeholder="wireless bluetooth premium sound certified fast charging..."
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="btn-spinner" />
              Analyzing...
            </>
          ) : (
            "PREDICT LAUNCH POTENTIAL"
          )}
        </button>
        {error && <div className="error-box">⚠ {error}</div>}
      </div>

      <div>
        {result ? (
          <div className="result-panel predict">
            <div className="panel-label">Prediction Result</div>
            <div className={`tier-badge ${tierClass(result.tier)}`}>
              {tierLabel(result.tier)}
            </div>
            <div className="stat-row">
              <div className="stat-cell">
                <span className="stat-cell-val">
                  {result.confidence?.score?.toFixed(1)}%
                </span>
                <span className="stat-cell-label">Confidence</span>
              </div>
              <div className="stat-cell">
                <span className="stat-cell-val">
                  {result.confidence?.level}
                </span>
                <span className="stat-cell-label">Level</span>
              </div>
              <div className="stat-cell">
                <span className="stat-cell-val">
                  {result.input?.discount_percentage}%
                </span>
                <span className="stat-cell-label">Discount</span>
              </div>
            </div>

            <div className="confidence-meter" style={{ marginTop: 24 }}>
              <div className="confidence-label">Probability Breakdown</div>
              {result.confidence?.breakdown &&
                Object.entries(result.confidence.breakdown).map(([k, v]) => (
                  <div className="bar-row" key={k}>
                    <span className="bar-name">{k}</span>
                    <div className="bar-track">
                      <div
                        className={`bar-fill bar-${k.toLowerCase()}`}
                        style={{ width: `${v}%` }}
                      />
                    </div>
                    <span className="bar-val">{v.toFixed(1)}%</span>
                  </div>
                ))}
            </div>

            <hr className="divider" />
            <p className="summary-text">{result.summary}</p>
          </div>
        ) : (
          <div className="result-panel predict">
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>Fill the form to predict launch potential</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SAFE BUY TAB ──────────────────────────────────────────────────────────────
function SafeBuyTab() {
  const [form, setForm] = useState({
    product_name: "",
    rating: "",
    rating_count: "",
    discounted_price: "",
    actual_price: "",
    discount_percentage: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    const payload = {
      product_name: form.product_name,
      rating: Number(form.rating),
      rating_count: Number(form.rating_count),
      discounted_price: Number(form.discounted_price),
      actual_price: Number(form.actual_price),
      discount_percentage: Number(form.discount_percentage),
    };
    try {
      const res = await fetch(
        "https://product-sales-prediction-ctb4aef5escjd7a8.centralindia-01.azurewebsites.net/safe-buy",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "API error");
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "#7fff6e";
    if (score >= 45) return "#ffc837";
    return "#ff3d6b";
  };

  const getSafeClass = (label) => {
    if (!label) return "";
    const l = label.toUpperCase();
    if (l.includes("GOOD") && !l.includes("NOT")) return "safe-good";
    if (l.includes("NOT")) return "safe-bad";
    return "safe-ok";
  };

  const safetyRatio = result ? result.score / 100 : 0;
  const circumference = 2 * Math.PI * 38;

  return (
    <div className="grid-2">
      <div className="panel" style={{ "--top-color": "var(--accent2)" }}>
        <div className="panel-label" style={{ color: "#ff3d6b" }}>
          Product Info
        </div>
        <div className="field">
          <label>Product Name</label>
          <input
            value={form.product_name}
            onChange={set("product_name")}
            placeholder="e.g. Sony WH-1000XM5"
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label>Rating (0–5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={set("rating")}
              placeholder="4.3"
            />
          </div>
          <div className="field">
            <label>Rating Count</label>
            <input
              type="number"
              value={form.rating_count}
              onChange={set("rating_count")}
              placeholder="15432"
            />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Actual Price (₹)</label>
            <input
              type="number"
              value={form.actual_price}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => {
                  const disc =
                    v && f.discounted_price
                      ? Math.round(((v - f.discounted_price) / v) * 100)
                      : f.discount_percentage;
                  return { ...f, actual_price: v, discount_percentage: disc };
                });
              }}
              placeholder="29990"
            />
          </div>
          <div className="field">
            <label>Discounted Price (₹)</label>
            <input
              type="number"
              value={form.discounted_price}
              onChange={(e) => {
                const v = e.target.value;
                setForm((f) => {
                  const disc =
                    f.actual_price && v
                      ? Math.round(
                          ((f.actual_price - v) / f.actual_price) * 100,
                        )
                      : f.discount_percentage;
                  return {
                    ...f,
                    discounted_price: v,
                    discount_percentage: disc,
                  };
                });
              }}
              placeholder="19990"
            />
          </div>
        </div>
        <div className="field">
          <label>Discount % (auto-calculated)</label>
          <input
            type="number"
            value={form.discount_percentage}
            onChange={set("discount_percentage")}
            placeholder="33"
          />
        </div>
        <button
          className="btn btn-danger"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="btn-spinner"
                style={{ borderTopColor: "#fff" }}
              />
              Checking...
            </>
          ) : (
            "CHECK SAFE BUY SCORE"
          )}
        </button>
        {error && <div className="error-box">⚠ {error}</div>}
      </div>

      <div>
        {result ? (
          <div className="result-panel safebuy">
            <div className="panel-label" style={{ color: "#ff3d6b" }}>
              Safe Buy Analysis
            </div>
            <div className="score-ring-wrap">
              <div className="score-ring">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="none"
                    stroke={getScoreColor(result.score)}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - safetyRatio)}
                    strokeLinecap="round"
                    style={{
                      transition:
                        "stroke-dashoffset 1s cubic-bezier(0.16,1,0.3,1)",
                      filter: `drop-shadow(0 0 8px ${getScoreColor(result.score)})`,
                    }}
                  />
                </svg>
                <div
                  className="score-ring-val"
                  style={{ color: getScoreColor(result.score) }}
                >
                  {result.score?.toFixed(0)}
                </div>
              </div>
              <div>
                <div className={`safe-label ${getSafeClass(result.label)}`}>
                  {result.ui_label}
                </div>
                <div className="safe-message">{result.message}</div>
              </div>
            </div>

            <hr className="divider" />

            <div className="stat-row">
              <div className="stat-cell">
                <span
                  className="stat-cell-val"
                  style={{ color: getScoreColor(result.score) }}
                >
                  {result.score?.toFixed(1)}
                </span>
                <span className="stat-cell-label">Score / 100</span>
              </div>
              <div className="stat-cell">
                <span className="stat-cell-val">{result.confidence}</span>
                <span className="stat-cell-label">Confidence</span>
              </div>
              <div className="stat-cell">
                <span className="stat-cell-val">
                  {result.input?.discount_percentage}%
                </span>
                <span className="stat-cell-label">Discount</span>
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <div className="confidence-label">Score Gauge</div>
              <div className="bar-row">
                <span className="bar-name">Score</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${result.score}%`,
                      background: getScoreColor(result.score),
                      boxShadow: `0 0 8px ${getScoreColor(result.score)}`,
                    }}
                  />
                </div>
                <span className="bar-val">{result.score?.toFixed(1)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                {[0, 25, 50, 75, 100].map((n) => (
                  <span
                    key={n}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "var(--muted)",
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: 14,
                background: "var(--surface2)",
                borderLeft: `3px solid ${getScoreColor(result.score)}`,
              }}
            >
              <div className="confidence-label" style={{ marginBottom: 6 }}>
                Verdict
              </div>
              <div
                className={`safe-label ${getSafeClass(result.label)}`}
                style={{ fontSize: 18 }}
              >
                {result.label}
              </div>
            </div>
          </div>
        ) : (
          <div className="result-panel safebuy">
            <div className="empty-state">
              <div className="empty-icon">🛡️</div>
              <p>Fill the form to check purchase safety</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("predict");

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div>
            <div className="header-title">PRODUCT INTEL</div>
            <div className="header-sub">AI-powered sales analytics engine</div>
          </div>
          <div className="header-dot" />
        </div>

        <div className="tabs">
          <button
            className={`tab ${tab === "predict" ? "active" : ""}`}
            onClick={() => setTab("predict")}
          >
            <span className="tab-icon">⚡</span>Launch Predictor
          </button>
          <button
            className={`tab ${tab === "safebuy" ? "active" : ""}`}
            onClick={() => setTab("safebuy")}
          >
            <span className="tab-icon">🛡</span>Safe Buy Analyzer
          </button>
        </div>

        <div className="main">
          {tab === "predict" ? <PredictTab /> : <SafeBuyTab />}
        </div>
      </div>
    </>
  );
}
