import { useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Crown,
  ExternalLink,
  Globe2,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Newspaper,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const packages = [
  { id: "1BLN", name: "1 Bulan", duration: "30 hari", price: 299000 },
  { id: "6BLN", name: "6 Bulan", duration: "180 hari", price: 500000 },
  { id: "1THN", name: "1 Tahun", duration: "365 hari", price: 900000 },
  { id: "3THN", name: "3 Tahun", duration: "1095 hari", price: 1500000 },
];

const demoSignals = [
  {
    id: "DEMO-001",
    direction: "BUY",
    symbol: "XAUUSD",
    entry: "Data demo",
    sl: "Data demo",
    tp1: "Data demo",
    tp2: "Data demo",
    status: "DEMO",
    time: "Contoh tampilan",
  },
  {
    id: "DEMO-002",
    direction: "SELL",
    symbol: "XAUUSD",
    entry: "Data demo",
    sl: "Data demo",
    tp1: "Data demo",
    tp2: "Data demo",
    status: "DEMO",
    time: "Contoh tampilan",
  },
];

const demoNews = [
  {
    category: "EKONOMI AS",
    title: "Pantau agenda ekonomi Amerika Serikat",
    desc: "Perhatikan rilis inflasi, tenaga kerja, dan kebijakan Federal Reserve sebelum mengambil keputusan trading.",
    impact: "Pantauan",
  },
  {
    category: "EMAS",
    title: "Faktor yang dapat memengaruhi XAUUSD",
    desc: "Dolar AS, imbal hasil obligasi, ekspektasi suku bunga, dan sentimen risiko dapat memengaruhi harga emas.",
    impact: "Edukasi",
  },
  {
    category: "MANAJEMEN RISIKO",
    title: "Waspadai volatilitas saat berita berdampak tinggi",
    desc: "Spread dan pergerakan harga dapat meningkat saat rilis data ekonomi. Sesuaikan risiko dengan kondisi pasar.",
    impact: "Penting",
  },
];

const lessons = [
  {
    level: "DASAR",
    title: "Memahami struktur pasar",
    desc: "Pelajari Higher High, Higher Low, Lower High, Lower Low, BOS, dan CHoCH.",
    icon: TrendingUp,
  },
  {
    level: "MENENGAH",
    title: "Smart Money Concept",
    desc: "Pahami Order Block, Fair Value Gap, likuiditas, dan area mitigasi.",
    icon: Activity,
  },
  {
    level: "MANAJEMEN RISIKO",
    title: "Mengatur risiko trading",
    desc: "Kenali ukuran posisi, stop loss, rasio risiko-imbalan, dan disiplin trading.",
    icon: ShieldCheck,
  },
];

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

function TradingViewChart() {
  return (
    <div className="chart-frame">
      <div className="chart-toolbar">
        <div className="chart-symbol">
          <div className="gold-icon small-gold">Au</div>
          <div>
            <strong>Gold Spot / U.S. Dollar</strong>
            <span>XAUUSD · Chart eksternal TradingView</span>
          </div>
        </div>
        <a
          className="chart-external"
          href="https://www.tradingview.com/chart/?symbol=OANDA%3AXAUUSD"
          target="_blank"
          rel="noreferrer"
        >
          Buka chart <ExternalLink size={14} />
        </a>
      </div>

      <iframe
        className="tradingview-iframe"
        title="TradingView XAUUSD chart"
        src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_gold&symbol=OANDA%3AXAUUSD&interval=15&hidesidetoolbar=0&symboledit=0&saveimage=0&toolbarbg=%230c0f12&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FJakarta&withdateranges=1&hideideas=1&allow_symbol_change=1&details=0&hotlist=0&calendar=0"
        allowFullScreen
        loading="lazy"
      />
      <div className="chart-disclaimer">
        <Activity size={14} />
        Chart disediakan oleh TradingView. Harga dan waktu dapat berbeda
        dengan broker yang kamu gunakan.
      </div>
    </div>
  );
}

function SignalCard({ signal }) {
  const isBuy = signal.direction === "BUY";

  return (
    <article className="signal-card">
      <div className="signal-card-top">
        <div className="signal-symbol">
          <div className={`direction-icon ${isBuy ? "buy" : "sell"}`}>
            {isBuy ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
          </div>
          <div>
            <strong>{signal.symbol}</strong>
            <span>{signal.id}</span>
          </div>
        </div>
        <span className={`signal-direction ${isBuy ? "buy-text" : "sell-text"}`}>
          {signal.direction}
        </span>
      </div>

      <div className="signal-data-grid">
        <div>
          <span>ENTRY</span>
          <strong>{signal.entry}</strong>
        </div>
        <div>
          <span>STOP LOSS</span>
          <strong>{signal.sl}</strong>
        </div>
        <div>
          <span>TAKE PROFIT 1</span>
          <strong>{signal.tp1}</strong>
        </div>
        <div>
          <span>TAKE PROFIT 2</span>
          <strong>{signal.tp2}</strong>
        </div>
      </div>

      <div className="signal-card-bottom">
        <span><Clock3 size={13} /> {signal.time}</span>
        <span className="demo-status">{signal.status}</span>
      </div>
    </article>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showPackages, setShowPackages] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("1BLN");
  const [notice, setNotice] = useState("");
  const [searchLesson, setSearchLesson] = useState("");

  const selected = packages.find((item) => item.id === selectedPackage);

  function navigate(tab) {
    setActiveTab(tab);
    setMobileMenu(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function choosePackage(item) {
    setSelectedPackage(item.id);
    setShowPackages(false);
    setNotice(
      `Paket ${item.name} dipilih (${formatRupiah(item.price)}). Aktivasi dan pembayaran belum dihubungkan.`
    );
  }

  const filteredLessons = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.desc} ${lesson.level}`
      .toLowerCase()
      .includes(searchLesson.toLowerCase())
  );

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <span>Au</span>
            <Sparkles size={14} />
          </div>
          <div className="brand-copy">
            <strong>AI ASSISTANTS</strong>
            <span>GOLD INTELLIGENCE</span>
          </div>
          <button
            className="icon-button mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Tutup menu"
          >
            <X size={19} />
          </button>
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="side-nav">
          <button
            className={activeTab === "dashboard" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("dashboard")}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className={activeTab === "signals" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("signals")}
          >
            <Activity size={18} /> Signal XAUUSD
            <span className="nav-tag">DEMO</span>
          </button>
          <button
            className={activeTab === "news" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("news")}
          >
            <Newspaper size={18} /> Fundamental
          </button>
          <button
            className={activeTab === "education" ? "nav-item active" : "nav-item"}
            onClick={() => navigate("education")}
          >
            <BookOpen size={18} /> Materi Trading
          </button>
        </nav>

        <div className="sidebar-label market-label">MARKET</div>
        <div className="market-mini">
          <div className="market-mini-top">
            <div className="gold-icon small-gold">Au</div>
            <div>
              <strong>XAUUSD</strong>
              <span>Gold / US Dollar</span>
            </div>
          </div>
          <div className="market-price">Live chart</div>
          <div className="market-note">
            <span className="status-dot" /> Lihat TradingView
          </div>
        </div>

        <div className="sidebar-spacer" />

        <div className="sidebar-plan">
          <div className="plan-crown"><Crown size={18} /></div>
          <strong>Unlock Premium</strong>
          <p>Akses pengalaman AI Gold premium.</p>
          <button onClick={() => setShowPackages(true)}>
            Lihat Paket <ChevronRight size={15} />
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="footer-avatar">AG</div>
          <div>
            <strong>AI Assistants Gold</strong>
            <span>Website Preview</span>
          </div>
          <Globe2 size={16} className="footer-globe" />
        </div>
      </aside>

      {mobileMenu && (
        <button
          className="mobile-backdrop"
          onClick={() => setMobileMenu(false)}
          aria-label="Tutup navigasi"
        />
      )}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu-button"
              onClick={() => setMobileMenu(true)}
              aria-label="Buka menu"
            >
              <Menu size={21} />
            </button>
            <div className="breadcrumb">Workspace <ChevronRight size={14} />
              <strong>
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "signals" && "Signal XAUUSD"}
                {activeTab === "news" && "Fundamental"}
                {activeTab === "education" && "Materi Trading"}
              </strong>
            </div>
          </div>

          <div className="topbar-right">
            <span className="preview-pill"><span /> WEBSITE PREVIEW</span>
            <button className="language-button" aria-label="Bahasa Indonesia">
              <Globe2 size={16} /> ID
            </button>
            <button className="login-button" onClick={() => setNotice("Fitur login akan diaktifkan setelah sistem member dibuat.")}>
              <LockKeyhole size={15} /> Login
            </button>
          </div>
        </header>

        {notice && (
          <div className="notice-banner">
            <span>{notice}</span>
            <button onClick={() => setNotice("")} aria-label="Tutup pemberitahuan">
              <X size={16} />
            </button>
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="page-content">
            <section className="welcome-banner">
              <div className="welcome-orb orb-one" />
              <div className="welcome-orb orb-two" />
              <div className="welcome-content">
                <div className="welcome-eyebrow">
                  <Sparkles size={14} /> INTELLIGENCE FOR GOLD TRADERS
                </div>
                <h1>Trade with <span>Intelligence.</span></h1>
                <p>
                  Satu workspace untuk chart XAUUSD, analisis pasar, sinyal,
                  dan pembelajaran Smart Money Concept.
                </p>
                <div className="welcome-actions">
                  <button className="primary-button" onClick={() => navigate("signals")}>
                    <Activity size={16} /> Lihat Signal <ChevronRight size={16} />
                  </button>
                  <button className="secondary-button" onClick={() => setShowPackages(true)}>
                    <Crown size={16} /> Aktivasi Premium
                  </button>
                </div>
              </div>
              <div className="hero-coin" aria-hidden="true">
                <div className="hero-coin-inner">
                  <span>Au</span>
                  <Sparkles size={25} />
                </div>
                <div className="coin-caption">GOLD INTELLIGENCE</div>
              </div>
              <div className="banner-bottom-line" />
            </section>

            <section className="metric-grid">
              <article className="metric-card">
                <div className="metric-top">
                  <span>INSTRUMEN</span>
                  <div className="metric-icon"><Activity size={17} /></div>
                </div>
                <strong>XAUUSD</strong>
                <span className="metric-caption">Gold / US Dollar</span>
              </article>
              <article className="metric-card">
                <div className="metric-top">
                  <span>CHART</span>
                  <div className="metric-icon"><TrendingUp size={17} /></div>
                </div>
                <strong>TradingView</strong>
                <span className="metric-caption">Grafik eksternal</span>
              </article>
              <article className="metric-card">
                <div className="metric-top">
                  <span>STATUS DATA</span>
                  <div className="metric-icon"><RefreshCw size={17} /></div>
                </div>
                <strong className="metric-demo">Mode Demo</strong>
                <span className="metric-caption">Menunggu koneksi bot</span>
              </article>
              <article className="metric-card">
                <div className="metric-top">
                  <span>AKUN</span>
                  <div className="metric-icon"><ShieldCheck size={17} /></div>
                </div>
                <strong>Guest</strong>
                <span className="metric-caption">Belum login</span>
              </article>
            </section>

            <section className="content-section chart-section">
              <SectionHeading
                eyebrow="MARKET OVERVIEW"
                title="Gold Market"
                description="Pantau grafik XAUUSD melalui TradingView."
                action={
                  <span className="section-chip"><span /> CHART EXTERNAL</span>
                }
              />
              <TradingViewChart />
            </section>

            <section className="content-section">
              <SectionHeading
                eyebrow="SIGNAL CENTER"
                title="Signal Terbaru"
                description="Contoh tampilan sinyal. Belum berasal dari bot Telegram."
                action={
                  <button className="text-button" onClick={() => navigate("signals")}>
                    Lihat semua <ChevronRight size={15} />
                  </button>
                }
              />
              <div className="signal-grid">
                {demoSignals.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </section>

            <section className="content-section">
              <SectionHeading
                eyebrow="FUNDAMENTAL WATCH"
                title="Market Insights"
                description="Informasi edukasi yang membantu memahami faktor penggerak emas."
                action={
                  <button className="text-button" onClick={() => navigate("news")}>
                    Selengkapnya <ChevronRight size={15} />
                  </button>
                }
              />
              <div className="news-grid">
                {demoNews.slice(0, 2).map((item) => (
                  <article className="news-card" key={item.title}>
                    <div className="news-card-top">
                      <span className="news-category">{item.category}</span>
                      <span className="news-badge">{item.impact}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className="news-card-footer">
                      <span><Newspaper size={14} /> Materi informasi</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="premium-banner">
              <div className="premium-symbol"><Crown size={24} /></div>
              <div className="premium-copy">
                <span>AI ASSISTANTS GOLD PREMIUM</span>
                <h2>Upgrade pengalaman trading kamu.</h2>
                <p>Informasi sinyal, chart, dan edukasi dalam satu dashboard.</p>
              </div>
              <button className="primary-button" onClick={() => setShowPackages(true)}>
                Lihat Paket <ChevronRight size={16} />
              </button>
            </section>
          </div>
        )}

        {activeTab === "signals" && (
          <div className="page-content inner-page">
            <SectionHeading
              eyebrow="SIGNAL CENTER"
              title="Signal XAUUSD"
              description="Panel ini masih menggunakan data demo. Tidak ada sinyal real dari bot yang ditampilkan."
              action={<span className="demo-status">DEMO MODE</span>}
            />
            <div className="signal-warning">
              <Activity size={18} />
              <div>
                <strong>Integrasi Telegram belum aktif</strong>
                <p>Setelah website siap, repository bot akan diperbarui untuk mengirim sinyal ke API website.</p>
              </div>
            </div>
            <div className="signal-grid">
              {demoSignals.map((signal) => (
                <SignalCard key={signal.id} signal={signal} />
              ))}
            </div>
            <div className="content-section history-section">
              <SectionHeading
                eyebrow="TRADE LOG"
                title="Riwayat Sinyal"
                description="Riwayat real akan muncul setelah API dan penyimpanan sinyal terhubung."
              />
              <div className="empty-state">
                <CalendarDays size={30} />
                <strong>Belum ada riwayat real</strong>
                <p>Data demo tidak disimpan sebagai histori trading.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "news" && (
          <div className="page-content inner-page">
            <SectionHeading
              eyebrow="FUNDAMENTAL INTELLIGENCE"
              title="Fundamental XAUUSD"
              description="Informasi edukasi berbahasa Indonesia mengenai faktor yang dapat memengaruhi harga emas."
            />
            <div className="signal-warning">
              <Newspaper size={18} />
              <div>
                <strong>Belum terhubung ke feed berita real-time</strong>
                <p>Konten di bawah merupakan materi edukasi, bukan berita terbaru atau kalender ekonomi langsung.</p>
              </div>
            </div>
            <div className="news-grid news-grid-large">
              {demoNews.map((item) => (
                <article className="news-card" key={item.title}>
                  <div className="news-card-top">
                    <span className="news-category">{item.category}</span>
                    <span className="news-badge">{item.impact}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="news-card-footer">
                    <span><Globe2 size={14} /> Edukasi pasar</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="page-content inner-page">
            <SectionHeading
              eyebrow="KNOWLEDGE CENTER"
              title="Materi Trading"
              description="Bangun pemahaman struktur pasar, SMC, dan manajemen risiko."
            />
            <input
              className="lesson-search"
              value={searchLesson}
              onChange={(event) => setSearchLesson(event.target.value)}
              placeholder="Cari materi..."
              aria-label="Cari materi"
            />
            <div className="lesson-grid">
              {filteredLessons.map((lesson) => {
                const LessonIcon = lesson.icon;
                return (
                  <article className="lesson-card" key={lesson.title}>
                    <div className="lesson-icon"><LessonIcon size={22} /></div>
                    <span className="news-category">{lesson.level}</span>
                    <h3>{lesson.title}</h3>
                    <p>{lesson.desc}</p>
                    <button
                      className="text-button"
                      onClick={() => setNotice("Materi lengkap akan ditambahkan pada tahap pengembangan berikutnya.")}
                    >
                      Segera hadir <ChevronRight size={15} />
                    </button>
                  </article>
                );
              })}
              {filteredLessons.length === 0 && (
                <div className="empty-state">
                  <BookOpen size={28} />
                  <strong>Materi tidak ditemukan</strong>
                  <p>Coba gunakan kata kunci lain.</p>
                </div>
              )}
            </div>
          </div>
        )}

        <footer className="main-footer">
          <div className="footer-brand">
            <div className="brand-mark footer-mark"><span>Au</span></div>
            <span>AI ASSISTANTS GOLD</span>
          </div>
          <p>Platform informasi dan edukasi XAUUSD.</p>
          <span className="footer-disclaimer">
            Trading memiliki risiko. Informasi pada situs ini bukan jaminan keuntungan.
          </span>
        </footer>
      </main>

      {showPackages && (
        <div className="modal-backdrop" onClick={() => setShowPackages(false)}>
          <div
            className="package-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close icon-button"
              onClick={() => setShowPackages(false)}
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
            <div className="modal-symbol"><Crown size={25} /></div>
            <div className="eyebrow">MEMBERSHIP</div>
            <h2 id="package-title">Aktivasi AI Gold</h2>
            <p className="modal-description">
              Pilih durasi paket yang sesuai dengan kebutuhanmu.
            </p>
            <div className="package-list">
              {packages.map((item) => (
                <button
                  key={item.id}
                  className={`package-option ${selectedPackage === item.id ? "selected" : ""}`}
                  onClick={() => setSelectedPackage(item.id)}
                >
                  <span className="package-radio">
                    {selectedPackage === item.id && <span />}
                  </span>
                  <span className="package-details">
                    <strong>{item.name}</strong>
                    <small>{item.duration} akses</small>
                  </span>
                  <strong className="package-price">{formatRupiah(item.price)}</strong>
                </button>
              ))}
            </div>
            <div className="package-summary">
              <span>Paket dipilih</span>
              <strong>{selected?.name} · {formatRupiah(selected?.price ?? 0)}</strong>
            </div>
            <button
              className="primary-button modal-submit"
              onClick={() => {
                setShowPackages(false);
                setNotice(`Paket ${selected?.name} dipilih. Sistem QRIS, upload bukti, dan persetujuan admin belum diaktifkan.`);
              }}
            >
              <Wallet size={17} /> Pilih Paket <ChevronRight size={17} />
            </button>
            <p className="modal-footnote">
              <LockKeyhole size={13} /> Pembayaran belum diaktifkan pada versi preview.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
