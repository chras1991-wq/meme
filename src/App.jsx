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
    thesis: {
      kicker: "The thesis",
      titleLead: "Computation should be owned,",
      titleRest: "not rented.",
      body: "Most on-chain applications rent opaque compute. TapeOut takes the opposite path: expose the gates, preserve the wiring, and let every circuit remain inspectable and composable.",
      pillars: [
        {
          id: "01",
          title: "Design locally",
          body: "Wire, simulate, and test logic in the browser before committing anything on-chain.",
        },
        {
          id: "02",
          title: "Manufacture on-chain",
          body: "Consume transistor components to create a persistent circuit represented by verifiable state.",
        },
        {
          id: "03",
          title: "Compose openly",
          body: "Standardized processors and circuits create a shared base for builders, education, and experimentation.",
        },
      ],
    },
    allocation: {
      kicker: "Capital plan",
      titleLead: "A focused round for",
      titleRest: "measurable delivery.",
      body: "Capital is staged against outputs that can be demonstrated, tested, and reviewed—rather than open-ended research.",
      rows: [
        { label: "Protocol & circuit engineering", percent: 42 },
        { label: "Security review & testing", percent: 22 },
        { label: "Developer tooling & documentation", percent: 18 },
        { label: "Ecosystem pilots", percent: 10 },
        { label: "Operations & legal readiness", percent: 8 },
      ],
    },
    returns: {
      kicker: "Return framework",
      titleLead: "Upside tied to adoption,",
      titleRest: "not a promise.",
      body: "Illustrative scenarios assume a legally executed participation instrument and milestone delivery. They are targets—not guaranteed yield, interest, or redemption terms.",
      scenarios: [
        {
          label: "Downside",
          title: "Capital at risk",
          body: "Delayed product-market fit, limited liquidity, or full loss of contributed capital.",
          featured: false,
        },
        {
          label: "Base case",
          title: "12–18% target",
          body: "Illustrative annualized return range if tooling ships and early developer usage converts.",
          featured: true,
        },
        {
          label: "Expansion",
          title: "25–40% target",
          body: "Illustrative annualized range if pilots scale and protocol activity supports revenue participation.",
          featured: false,
        },
      ],
    },
    roadmap: {
      kicker: "Execution roadmap",
      titleLead: "Six months. Six",
      titleRest: "verifiable releases.",
      body: "The roadmap starts in August 2026 and prioritizes compact releases with a visible acceptance test.",
      items: [
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
      ],
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
      noWallet: "No wallet detected. Install MetaMask or another BSC wallet.",
      connectFailed: "Wallet connection failed.",
      connectBeforePay: "Connect a wallet before paying.",
      invalidAmount: "Enter a valid USDT amount.",
      paymentFailed: "Payment failed.",
      submitted: "Submitted",
    },
    transparency: {
      kicker: "Transparency",
      title: "Reported participation.",
      tableLabel: "Reported participation.",
      participant: "Participant",
      amount: "Reported amount",
      total: "Reported total",
      disclosures: [
        "TapeOut is experimental infrastructure and may retain upgrade or administrative controls.",
        "Return scenarios are illustrative and do not constitute a guarantee, offer, or investment advice.",
        "Contributors should complete legal, technical, tax, and wallet-security review before transferring assets.",
      ],
    },
    footer: {
      tagline: "Building verifiable computation, one circuit at a time.",
      copyright: "© 2026 TAPEOUT",
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
    thesis: {
      kicker: "核心理念",
      titleLead: "计算应当被拥有，",
      titleRest: "而不是被租用。",
      body: "多数链上应用仍在租用不透明算力。TapeOut 走相反路径：公开门电路、保留连线结构，让每个电路都可检查、可组合。",
      pillars: [
        {
          id: "01",
          title: "本地设计",
          body: "在上链之前，先在浏览器中完成连线、仿真与逻辑测试。",
        },
        {
          id: "02",
          title: "链上制造",
          body: "消耗晶体管组件，生成由可验证状态表示的持久电路。",
        },
        {
          id: "03",
          title: "开放组合",
          body: "标准化处理器与电路，为开发者、教育与实验提供共享底座。",
        },
      ],
    },
    allocation: {
      kicker: "资金规划",
      titleLead: "聚焦一轮融资，",
      titleRest: "交付可衡量成果。",
      body: "资金按可演示、可测试、可审查的产出分期投入，而不是开放式研究。",
      rows: [
        { label: "协议与电路工程", percent: 42 },
        { label: "安全审计与测试", percent: 22 },
        { label: "开发者工具与文档", percent: 18 },
        { label: "生态试点", percent: 10 },
        { label: "运营与合规准备", percent: 8 },
      ],
    },
    returns: {
      kicker: "回报框架",
      titleLead: "收益与采用挂钩，",
      titleRest: "而非承诺。",
      body: "示意情景假设已签署合法参与协议并完成里程碑交付。它们是目标，不是保证收益、利息或赎回条款。",
      scenarios: [
        {
          label: "下行情景",
          title: "本金存在风险",
          body: "产品市场匹配延迟、流动性不足，或出资本金全部损失。",
          featured: false,
        },
        {
          label: "基准情景",
          title: "目标 12–18%",
          body: "若工具如期交付且早期开发者使用转化，示意年化回报区间。",
          featured: true,
        },
        {
          label: "扩张情景",
          title: "目标 25–40%",
          body: "若试点扩大且协议活动支撑收益参与，示意年化回报区间。",
          featured: false,
        },
      ],
    },
    roadmap: {
      kicker: "执行路线图",
      titleLead: "六个月，六次",
      titleRest: "可验证发布。",
      body: "路线图自 2026 年 8 月起，优先交付带有明确验收标准的紧凑版本。",
      items: [
        {
          month: "2026 年 8 月",
          title: "轮次看板",
          body: "公布资金分配、金库披露、构建范围与月度报告格式。",
          note: "公开看板 + 首份金库说明",
        },
        {
          month: "2026 年 9 月",
          title: "电路参考包",
          body: "交付 NAND、LATCH、加法器与计数器模板，并提供确定性浏览器仿真。",
          note: "四个可复现参考电路",
        },
        {
          month: "2026 年 10 月",
          title: "Builder SDK Alpha",
          body: "对外提供创建、测试与读取 TapeOut 电路的类型化原语。",
          note: "SDK Alpha + 快速入门 + 示例应用",
        },
        {
          month: "2026 年 11 月",
          title: "试点群体",
          body: "支持一小批教育与实验计算团队完成完整构建。",
          note: "三个有文档的外部原型",
        },
        {
          month: "2026 年 12 月",
          title: "安全加固",
          body: "审查特权路径、升级控制、电路完整性与生产监控。",
          note: "审查报告 + 整改台账",
        },
        {
          month: "2027 年 1 月",
          title: "主网候选版",
          body: "发布带有明确限制、运行指标与降低信任依赖路径的稳定候选版本。",
          note: "版本化发布 + 30 天指标窗口",
        },
      ],
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
      noWallet: "未检测到钱包。请安装 MetaMask 或其他 BSC 钱包。",
      connectFailed: "钱包连接失败。",
      connectBeforePay: "请先连接钱包再支付。",
      invalidAmount: "请输入有效的 USDT 金额。",
      paymentFailed: "支付失败。",
      submitted: "已提交",
    },
    transparency: {
      kicker: "透明度",
      title: "已披露参与情况。",
      tableLabel: "已披露参与情况。",
      participant: "参与方",
      amount: "披露金额",
      total: "披露合计",
      disclosures: [
        "TapeOut 属于实验性基础设施，可能保留升级或管理控制权限。",
        "回报情景仅为示意，不构成保证、要约或投资建议。",
        "出资前请自行完成法律、技术、税务与钱包安全审查。",
      ],
    },
    footer: {
      tagline: "一次一个电路，构建可验证计算。",
      copyright: "© 2026 TAPEOUT",
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

        <section className="stats-strip" aria-label={t.stats.funding}>
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
            <p className="kicker">{t.thesis.kicker}</p>
            <div>
              <h2>
                <span>{t.thesis.titleLead}</span>
                <br />
                {t.thesis.titleRest}
              </h2>
              <p>{t.thesis.body}</p>
            </div>
          </div>
          <div className="pillar-grid">
            {t.thesis.pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.id}>
                <span>{pillar.id}</span>
                <div className="mini-circuit">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section subtle-section" id="allocation">
          <div className="section-intro">
            <p className="kicker">{t.allocation.kicker}</p>
            <div>
              <h2>
                <span>{t.allocation.titleLead}</span>
                <br />
                {t.allocation.titleRest}
              </h2>
              <p>{t.allocation.body}</p>
            </div>
          </div>
          <div className="allocation-layout">
            <div className="allocation-total">
              <span className="stat-label">{t.stats.funding}</span>
              <strong>{REPORTED_LABEL}</strong>
              <small>{t.stats.updated}</small>
            </div>
            <div className="allocation-list">
              {t.allocation.rows.map((item) => (
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
            <p className="kicker">{t.returns.kicker}</p>
            <div>
              <h2>
                <span>{t.returns.titleLead}</span>
                <br />
                {t.returns.titleRest}
              </h2>
              <p>{t.returns.body}</p>
            </div>
          </div>
          <div className="scenario-grid">
            {t.returns.scenarios.map((scenario) => (
              <article
                className={`scenario${scenario.featured ? " featured" : ""}`}
                key={scenario.label}
              >
                <span className="scenario-label">{scenario.label}</span>
                <strong>{scenario.title}</strong>
                <p>{scenario.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section section-frame" id="roadmap">
          <div className="section-intro">
            <p className="kicker">{t.roadmap.kicker}</p>
            <div>
              <h2>
                <span>{t.roadmap.titleLead}</span>
                <br />
                {t.roadmap.titleRest}
              </h2>
              <p>{t.roadmap.body}</p>
            </div>
          </div>
          <div className="roadmap-section">
            <div className="roadmap-list">
              {t.roadmap.items.map((item, index) => (
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
            <p className="kicker">{t.transparency.kicker}</p>
            <h2>{t.transparency.title}</h2>
          </div>
          <div className="funding-table" role="table" aria-label={t.transparency.tableLabel}>
            <div className="table-row table-head" role="row">
              <span role="columnheader">{t.transparency.participant}</span>
              <span role="columnheader">{t.transparency.amount}</span>
            </div>
            {PARTICIPANTS.map((row) => (
              <div className="table-row" role="row" key={row.id}>
                <code role="cell">{row.id}</code>
                <strong role="cell">{formatUsdt(row.amount)}</strong>
              </div>
            ))}
            <div className="table-row table-total" role="row">
              <span role="cell">{t.transparency.total}</span>
              <strong role="cell">
                {formatUsdt(REPORTED_TOTAL)}
                <small>{t.stats.updated}</small>
              </strong>
            </div>
          </div>
          <div className="disclosure-grid">
            {t.transparency.disclosures.map((text, index) => (
              <p key={text}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {text}
              </p>
            ))}
          </div>
        </section>

        <footer className="footer section-frame">
          <span>TapeOut</span>
          <p>{t.footer.tagline}</p>
          <span>{t.footer.copyright}</span>
        </footer>
      </main>
    </div>
  );
}
