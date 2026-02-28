import React, { useState } from "react";
import "./AdminDashboard.css";
import BuildingsPage from "./BuildingsPage";
import RoomsPage from "./RoomsPage";

// ── DATA ──────────────────────────────────────────────────────────
const revenueData = [150, 162, 155, 170, 178, 192]; // triệu đ
const months = ["T1", "T2", "T3", "T4", "T5", "T6"];

const roomTypes = [
    { label: "Đơn", value: 45 },
    { label: "Đôi", value: 38 },
    { label: "Studio", value: 22 },
    { label: "Ký túc xá", value: 65 },
];

const bookings = [
    { id: 1, name: "Nguyễn Văn An", room: "A-301", school: "ĐH Quốc gia Hà Nội", date: "15/02/2026", price: "4.500.000 đ", status: "confirmed" },
    { id: 2, name: "Trần Thị Bình", room: "B-205", school: "ĐH FPT", date: "14/02/2026", price: "5.200.000 đ", status: "pending" },
    { id: 3, name: "Lê Minh Châu", room: "C-102", school: "RMIT Việt Nam", date: "14/02/2026", price: "6.800.000 đ", status: "confirmed" },
    { id: 4, name: "Phạm Quốc Đạt", room: "A-405", school: "ĐH Bách Khoa HN", date: "13/02/2026", price: "4.800.000 đ", status: "confirmed" },
];

const navItems = [
    {
        id: "dashboard", label: "Dashboard",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
    },
    {
        id: "buildings", label: "Tòa nhà",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
    },
    {
        id: "rooms", label: "Phòng",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
        id: "residents", label: "Sinh viên",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
    },
    {
        id: "payments", label: "Thanh toán",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
    },
    {
        id: "settings", label: "Cài đặt",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
    },
];

// ── LINE CHART ────────────────────────────────────────────────────
function LineChart({ data, labels }) {
    const W = 500, H = 180, pad = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const minVal = Math.min(...data) - 10;
    const maxVal = Math.max(...data) + 10;
    const xStep = innerW / (data.length - 1);
    const yScale = (v) => innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

    const points = data.map((v, i) => ({ x: i * xStep, y: yScale(v) }));
    const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
    const areaPath = `M${points.map((p) => `${p.x},${p.y}`).join("L")}L${points[points.length - 1].x},${innerH}L0,${innerH}Z`;

    const yTicks = 4;
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="db-chart-svg">
            <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ecc71" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2ecc71" stopOpacity="0" />
                </linearGradient>
            </defs>
            <g transform={`translate(${pad.left},${pad.top})`}>
                {/* Y grid lines */}
                {Array.from({ length: yTicks + 1 }, (_, i) => {
                    const y = (i / yTicks) * innerH;
                    const val = Math.round(maxVal - (i / yTicks) * (maxVal - minVal));
                    return (
                        <g key={i}>
                            <line x1={0} y1={y} x2={innerW} y2={y} stroke="#f0f0f0" strokeWidth="1" />
                            <text x={-6} y={y + 4} fontSize="10" fill="#bbb" textAnchor="end">{val}M</text>
                        </g>
                    );
                })}
                {/* Area */}
                <path d={areaPath} fill="url(#lineGrad)" />
                {/* Line */}
                <polyline points={polyline} fill="none" stroke="#2ecc71" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                {/* Dots */}
                {points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2ecc71" stroke="white" strokeWidth="2" />
                ))}
                {/* X labels */}
                {labels.map((l, i) => (
                    <text key={i} x={i * xStep} y={innerH + 20} fontSize="11" fill="#aaa" textAnchor="middle">{l}</text>
                ))}
            </g>
        </svg>
    );
}

// ── BAR CHART ─────────────────────────────────────────────────────
function BarChart({ data }) {
    const W = 320, H = 180, pad = { top: 20, right: 20, bottom: 30, left: 30 };
    const innerW = W - pad.left - pad.right;
    const innerH = H - pad.top - pad.bottom;
    const maxVal = Math.max(...data.map((d) => d.value)) + 10;
    const barW = (innerW / data.length) * 0.55;
    const gap = innerW / data.length;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="db-chart-svg">
            <g transform={`translate(${pad.left},${pad.top})`}>
                {data.map((d, i) => {
                    const barH = (d.value / maxVal) * innerH;
                    const x = i * gap + (gap - barW) / 2;
                    const y = innerH - barH;
                    return (
                        <g key={i}>
                            <rect x={x} y={y} width={barW} height={barH} fill="#2ecc71" rx="4" opacity="0.85" />
                            <text x={x + barW / 2} y={innerH + 18} fontSize="10" fill="#aaa" textAnchor="middle">{d.label}</text>
                            <text x={x + barW / 2} y={y - 5} fontSize="10" fill="#555" textAnchor="middle">{d.value}</text>
                        </g>
                    );
                })}
                {/* baseline */}
                <line x1={0} y1={innerH} x2={innerW} y2={innerH} stroke="#eee" strokeWidth="1" />
            </g>
        </svg>
    );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function AdminDashboard({ user, onLogout }) {
    const [activeNav, setActiveNav] = useState("dashboard");

    const today = new Date().toLocaleDateString("vi-VN", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const stats = [
        {
            label: "Tổng số phòng", value: "170", change: "+8.2%", positive: true,
            color: "#e8f5e9", iconBg: "#2ecc71",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
        },
        {
            label: "Phòng đã thuê", value: "142", change: "+12.5%", positive: true,
            color: "#e3f2fd", iconBg: "#3b82f6",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>,
        },
        {
            label: "Doanh thu tháng này", value: "192 triệu đ", change: "+15.3%", positive: true,
            color: "#fdf3f3", iconBg: "#ef4444",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
        },
        {
            label: "Tổng sinh viên", value: "168", change: "+6.7%", positive: true,
            color: "#fef9e7", iconBg: "#f59e0b",
            icon: <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
        },
    ];

    return (
        <div className="db-root">
            {/* ── SIDEBAR ── */}
            <aside className="db-sidebar">
                <div className="db-sidebar-logo">
                    <div className="db-logo-icon">
                        <svg viewBox="0 0 24 24" fill="white" width="22" height="22">
                            <path d="M6 2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v10h12V4H6zm2 2h3v2H8V6zm0 4h3v2H8v-2zm5-4h3v2h-3V6zm0 4h3v2h-3v-2z" />
                            <circle cx="12" cy="20" r="2" />
                        </svg>
                    </div>
                    <div>
                        <p className="db-logo-name">F-Scape</p>
                        <p className="db-logo-role">Admin Portal</p>
                    </div>
                </div>

                <nav className="db-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`db-nav-item ${activeNav === item.id ? "db-nav-active" : ""}`}
                            onClick={() => setActiveNav(item.id)}
                        >
                            <span className="db-nav-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="db-sidebar-user">
                    <div className="db-user-avatar">{user.name[0]}</div>
                    <div className="db-user-info">
                        <p className="db-user-name">{user.name}</p>
                        <p className="db-user-email">{user.email}</p>
                    </div>
                    <button className="db-logout-btn" onClick={onLogout} title="Đăng xuất">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className="db-main">
                {activeNav === "buildings" ? (
                    <BuildingsPage />
                ) : activeNav === "rooms" ? (
                    <RoomsPage />
                ) : (
                    <>
                        {/* Header */}
                        <div className="db-header">
                            <div>
                                <h1 className="db-title">Dashboard</h1>
                                <p className="db-subtitle">Chào mừng trở lại! Đây là tổng quan hoạt động của F-Scape</p>
                            </div>
                            <div className="db-date">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                <span>{today}</span>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="db-stats-grid">
                            {stats.map((s, i) => (
                                <div className="db-stat-card" key={i} style={{ background: s.color }}>
                                    <div className="db-stat-content">
                                        <p className="db-stat-label">{s.label}</p>
                                        <p className="db-stat-value">{s.value}</p>
                                        <p className={`db-stat-change ${s.positive ? "positive" : "negative"}`}>
                                            ↑ {s.change} <span>so với tháng trước</span>
                                        </p>
                                    </div>
                                    <div className="db-stat-icon" style={{ background: s.iconBg }}>
                                        {s.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Charts Row */}
                        <div className="db-charts-row">
                            <div className="db-card db-chart-card">
                                <div className="db-card-header">
                                    <div>
                                        <h3>Doanh thu 6 tháng gần đây</h3>
                                        <p className="db-card-sub">Đơn vị: Triệu đồng</p>
                                    </div>
                                </div>
                                <LineChart data={revenueData} labels={months} />
                            </div>

                            <div className="db-card db-chart-card">
                                <div className="db-card-header">
                                    <div>
                                        <h3>Phân bố loại phòng</h3>
                                        <p className="db-card-sub">Tổng quan các loại phòng hiện có</p>
                                    </div>
                                </div>
                                <BarChart data={roomTypes} />
                            </div>
                        </div>

                        {/* Recent Bookings */}
                        <div className="db-card">
                            <div className="db-card-header">
                                <div>
                                    <h3>Đặt phòng gần đây</h3>
                                    <p className="db-card-sub">Các booking mới nhất trong hệ thống</p>
                                </div>
                                <a href="#all" className="db-view-all">Xem tất cả →</a>
                            </div>
                            <div className="db-table-wrap">
                                <table className="db-table">
                                    <thead>
                                        <tr>
                                            <th>Sinh Viên</th>
                                            <th>Phòng</th>
                                            <th>Trường</th>
                                            <th>Ngày Đặt</th>
                                            <th>Giá</th>
                                            <th>Trạng Thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b) => (
                                            <tr key={b.id}>
                                                <td>
                                                    <div className="db-student-cell">
                                                        <div className="db-student-avatar">{b.name[0]}</div>
                                                        <span>{b.name}</span>
                                                    </div>
                                                </td>
                                                <td><span className="db-room-badge">{b.room}</span></td>
                                                <td>{b.school}</td>
                                                <td>{b.date}</td>
                                                <td className="db-price">{b.price}</td>
                                                <td>
                                                    <span className={`db-status db-status-${b.status}`}>
                                                        {b.status === "confirmed" ? "Đã xác nhận" : "Chờ xử lý"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bottom Stats */}
                        <div className="db-bottom-stats">
                            <div className="db-bottom-card">
                                <div className="db-bottom-icon" style={{ background: "#e8f5e9" }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" width="22" height="22">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="db-bottom-label">Tỉ lệ lấp đầy</p>
                                    <p className="db-bottom-value">83.5%</p>
                                </div>
                            </div>
                            <div className="db-bottom-card">
                                <div className="db-bottom-icon" style={{ background: "#e3f2fd" }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" width="22" height="22">
                                        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="db-bottom-label">Doanh thu trung bình/phòng</p>
                                    <p className="db-bottom-value">1.35M đ</p>
                                </div>
                            </div>
                            <div className="db-bottom-card">
                                <div className="db-bottom-icon" style={{ background: "#fef9e7" }}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" width="22" height="22">
                                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="db-bottom-label">Sinh viên mới tháng này</p>
                                    <p className="db-bottom-value">24</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
