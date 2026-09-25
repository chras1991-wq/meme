import { useMemo, useState } from "react";
import PaymentCard from "./PaymentCard.jsx";
import { REPORTED_TOTAL } from "./config.js";

const PARTICIPANTS = [
  { id: "P-01", amount: 123750 },
  { id: "P-02", amount: 18500 },
  { id: "P-03", amount: 11000 },
  { id: "P-04", amount: 7500 },
  { id: "P-05", amount: 4600 },
  { id: "P-06", amount: 3700 },
  { id: "P-07", amount: 2200 },
  { id: "P-08", amount: 1300 },
  { id: "P-09", amount: 1150 },
  { id: "P-10", amount: 1100 },
  { id: "P-11", amount: 1075 },
  { id: "P-12", amount: 1050 },
  { id: "P-13", amount: 1025 },
  { id: "P-14", amount: 1025 },
  { id: "P-15", amount: 1025 },
  { id: "P-16", amount: 1000 },
  { id: "P-17", amount: 1000 },
];

const REPORTED_LABEL = `$${REPORTED_TOTAL.toLocaleString("en-US")}`;

const ALLOCATION = [
  { label: "Protocol & circuit engineering", percent: 42 },
  { label: "Security review & testing", percent: 22 },
  { label: "Developer tooling & documentation", percent: 18 },
  { label: "Ecosystem pilots", percent: 10 },
  { label: "Operations & legal readiness", percent: 8 },
];

const ROADMAP = [
  {
    month: "AUG 2026",
    title: "Round dashboard",
    body: "Publish capital allocation, treasury disclosure, build scope, and monthly reporting format.",
    note: "Public dashboard + first treasury note",
  },
  {
    month: "SEP 2026",
    title: "Circuit reference pack",
    body: "Ship NAND, LATCH, adder, and counter templates with deterministic browser simulation.",
    note: "Four reproducible reference circuits",
  },
  {
    month: "OCT 2026",
    title: "Builder SDK alpha",
    body: "Expose typed primitives for creating, testing, and reading TapeOut circuits from applications.",
    note: "SDK alpha + quick-start + sample app",
  },
  {
    month: "NOV 2026",
    title: "Pilot cohort",
    body: "Support a small group of education and experimental-compute teams through complete builds.",
    note: "Three documented external prototypes",
  },
  {
    month: "DEC 2026",
    title: "Security hardening",
    body: "Review privileged paths, upgrade controls, circuit integrity, and production monitoring.",
    note: "Review report + remediation register",
  },
  {
    month: "JAN 2027",
    title: "Mainnet candidate",
    body: "Release a stable candidate with documented limits, operating metrics, and a path to reduced trust.",
    note: "Versioned release + 30-day metrics window",
  },
];

const COPY = {
  en: {
    nav: {
      thesis: "Thesis",
      allocation: "Use of funds",
      roadmap: "Roadmap",
      transparency: "Transparency",
      fund: "Fund TapeOut",
    },
    hero: {
      kicker: "ON-CHAIN HARDWARE, BUILT IN PUBLIC",
      titleLead: "From logic to",
      titleRest: "lasting infrastructure.",
      body: "TapeOut turns BNB Smart Chain into a programmable silicon layer—where tokens become transistors and working circuits become composable on-chain assets.",
      review: "Review the round",
      explore: "Explore the roadmap",
    },
    stats: {
      funding: "Reported funding",
      updated: "Updated weekly",
      chain: "BNB Smart Chain",
      token: "USDT",
      round: "Private development round",
    },
    participate: {
      label: "Participate",
      titleLead: "Fund the next",
      titleRest: "TapeOut.",
      body: "Contributions are accepted only as USDT on BNB Smart Chain. Connect your wallet and confirm the amount before paying.",
      network: "BNB SMART CHAIN · USDT ONLY",
      amount: "Contribution amount",
      wallet: "Payment wallet",
      chooseWallet: "Choose wallet",
      pay: "Pay with wallet",
      treasury: "Treasury address",
      copy: "Copy",
      bscscan: "BscScan",
    },
    languageSwitch: "中文",
  },
  zh: {
    nav: {
      thesis: "核心理念",
      allocation: "资金用途",
      roadmap: "路线图",
      transparency: "透明度",
      fund: "参与募资",
    },
    hero: {
      kicker: "链上硬件，公开构建",
      titleLead: "从逻辑到",
      titleRest: "持久基础设施。",
      body: "TapeOut 将 BNB Smart Chain 变成可编程硅层——代币即晶体管，工作电路即链上可组合资产。",
      review: "查看本轮",
      explore: "查看路线图",
    },
    stats: {
      funding: "已披露募资",
      updated: "每周更新",
      chain: "BNB Smart Chain",
      token: "USDT",
      round: "私募开发轮",
    },
    participate: {
      label: "参与",
      titleLead: "投资下一个",
      titleRest: "TapeOut。",
      body: "仅接受 BNB Smart Chain 上的 USDT。请先连接钱包，确认金额后再支付。",
      network: "BNB SMART CHAIN · 仅 USDT",
      amount: "出资金额",
      wallet: "支付钱包",
      chooseWallet: "选择钱包",
      pay: "钱包支付",
      treasury: "收款地址",
      copy: "复制",
      bscscan: "BscScan",
    },
    languageSwitch: "EN",
  },
};

function formatUsdt(amount) {
  return `$${amount.toLocaleString("en-US")} USDT`;
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => COPY[lang], [lang]);

  return (
    <div className="site-shell">
      <header className="topbar section-frame">
        <a className="wordmark" href="#top">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="3" y="3" width="26" height="26" rx="8" />
            <path d="M10 16h12M16 10v12" />
          </svg>
          TapeOut
        </a>
        <nav aria-label="Primary navigation">
          <a href="#thesis">{t.nav.thesis}</a>
          <a href="#allocation">{t.nav.allocation}</a>
          <a href="#roadmap">{t.nav.roadmap}</a>
          <a href="#transparency">{t.nav.transparency}</a>
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="language-button"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
          >
            {t.languageSwitch}
          </button>
          <a className="small-cta" href="#fund">
            {t.nav.fund}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section section-frame">
          <div className="hero-copy">
            <p className="kicker">{t.hero.kicker}</p>
            <h1>
              <span>{t.hero.titleLead}</span>
              <br />
              {t.hero.titleRest}
            </h1>
            <p className="hero-body">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#fund">
                {t.hero.review}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a className="text-link" href="#roadmap">
                {t.hero.explore}
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="chip-grid">
              {Array.from({ length: 64 }, (_, index) => (
                <span key={index} className={index % 9 === 0 ? "active" : undefined} />
              ))}
            </div>
            <svg className="circuit-lines" viewBox="0 0 600 600">
              <path d="M120 300h360" />
              <path d="M300 120v360" />
              <circle cx="300" cy="300" r="5" />
            </svg>
            <div className="chip-label">
              <span>TO</span>
              <small>ON-CHAIN LOGIC</small>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Reported funding">
          <div>
            <span className="stat-label">{t.stats.funding}</span>
            <strong>{REPORTED_LABEL}</strong>
            <small>{t.stats.updated}</small>
          </div>
          <div>
            <span className="stat-label">{t.stats.chain}</span>
            <strong>BSC</strong>
            <small>{t.stats.token}</small>
          </div>
          <div>
            <span className="stat-label">{t.stats.round}</span>
            <strong>2026</strong>
            <small>08 — 01</small>
          </div>
        </section>

        <section className="content-section section-frame" id="thesis">
          <div className="section-intro">
            <p className="kicker">The thesis</p>
            <div>
              <h2>
                <span>Computation should be owned,</span>
                <br />
                not rented.
              </h2>
              <p>
                Most on-chain applications rent opaque compute. TapeOut takes the opposite path:
                expose the gates, preserve the wiring, and let every circuit remain inspectable and
                composable.
              </p>
            </div>
          </div>
          <div className="pillar-grid">
            {[
              [
                "01",
                "Design locally",
                "Wire, simulate, and test logic in the browser before committing anything on-chain.",
              ],
              [
                "02",
                "Manufacture on-chain",
                "Consume transistor components to create a persistent circuit represented by verifiable state.",
              ],
              [
                "03",
                "Compose openly",
                "Standardized processors and circuits create a shared base for builders, education, and experimentation.",
              ],
            ].map(([id, title, body]) => (
              <article className="pillar-card" key={id}>
                <span>{id}</span>
                <div className="mini-circuit">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section subtle-section" id="allocation">
          <div className="section-intro">
            <p className="kicker">Capital plan</p>
            <div>
              <h2>
                <span>A focused round for</span>
                <br />
                measurable delivery.
              </h2>
              <p>
                Capital is staged against outputs that can be demonstrated, tested, and
                reviewed—rather than open-ended research.
              </p>
            </div>
          </div>
          <div className="allocation-layout">
            <div className="allocation-total">
              <span className="stat-label">{t.stats.funding}</span>
              <strong>{REPORTED_LABEL}</strong>
              <small>{t.stats.updated}</small>
            </div>
            <div className="allocation-list">
              {ALLOCATION.map((item) => (
                <div className="allocation-row" key={item.label}>
                  <div>
                    <span>{item.label}</span>
                    <strong>{item.percent}%</strong>
                  </div>
                  <div className="progress-track">
                    <i style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-frame">
          <div className="section-intro">
            <p className="kicker">Return framework</p>
            <div>
              <h2>
                <span>Upside tied to adoption,</span>
                <br />
                not a promise.
              </h2>
              <p>
                Illustrative scenarios assume a legally executed participation instrument and
                milestone delivery. They are targets—not guaranteed yield, interest, or redemption
                terms.
              </p>
            </div>
          </div>
          <div className="scenario-grid">
            <article className="scenario">
              <span className="scenario-label">Downside</span>
              <strong>Capital at risk</strong>
              <p>
                Delayed product-market fit, limited liquidity, or full loss of contributed capital.
              </p>
            </article>
            <article className="scenario featured">
              <span className="scenario-label">Base case</span>
              <strong>12–18% target</strong>
              <p>
                Illustrative annualized return range if tooling ships and early developer usage
                converts.
              </p>
            </article>
            <article className="scenario">
              <span className="scenario-label">Expansion</span>
              <strong>25–40% target</strong>
              <p>
                Illustrative annualized range if pilots scale and protocol activity supports revenue
                participation.
              </p>
            </article>
          </div>
        </section>

        <section className="content-section section-frame" id="roadmap">
          <div className="section-intro">
            <p className="kicker">Execution roadmap</p>
            <div>
              <h2>
                <span>Six months. Six</span>
                <br />
                verifiable releases.
              </h2>
              <p>
                The roadmap starts in August 2026 and prioritizes compact releases with a visible
                acceptance test.
              </p>
            </div>
          </div>
          <div className="roadmap-section">
            <div className="roadmap-list">
              {ROADMAP.map((item, index) => (
                <article className="roadmap-item" key={item.title}>
                  <div className="roadmap-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <time>{item.month}</time>
                  <div className="roadmap-copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <small>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                      {item.note}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="funding-section section-frame" id="participate">
          <div className="funding-heading">
            <p className="kicker">{t.participate.label}</p>
            <h2>
              <span>{t.participate.titleLead}</span>
              <br />
              {t.participate.titleRest}
            </h2>
            <p>{t.participate.body}</p>
          </div>
          <PaymentCard copy={t.participate} />
        </section>

        <section className="content-section section-frame" id="transparency">
          <div className="section-intro">
            <p className="kicker">Transparency</p>
            <h2>Reported participation.</h2>
          </div>
          <div className="funding-table" role="table" aria-label="Reported participation.">
            <div className="table-row table-head" role="row">
              <span role="columnheader">Participant</span>
              <span role="columnheader">Reported amount</span>
            </div>
            {PARTICIPANTS.map((row) => (
              <div className="table-row" role="row" key={row.id}>
                <code role="cell">{row.id}</code>
                <strong role="cell">{formatUsdt(row.amount)}</strong>
              </div>
            ))}
            <div className="table-row table-total" role="row">
              <span role="cell">Reported total</span>
              <strong role="cell">
                {formatUsdt(REPORTED_TOTAL)}
                <small>{t.stats.updated}</small>
              </strong>
            </div>
          </div>
          <div className="disclosure-grid">
            <p>
              <span>01</span>
              TapeOut is experimental infrastructure and may retain upgrade or administrative
              controls.
            </p>
            <p>
              <span>02</span>
              Return scenarios are illustrative and do not constitute a guarantee, offer, or
              investment advice.
            </p>
            <p>
              <span>03</span>
              Contributors should complete legal, technical, tax, and wallet-security review before
              transferring assets.
            </p>
          </div>
        </section>

        <footer className="footer section-frame">
          <span>TapeOut</span>
          <p>Building verifiable computation, one circuit at a time.</p>
          <span>© 2026 TAPEOUT</span>
        </footer>
      </main>
    </div>
  );
}
