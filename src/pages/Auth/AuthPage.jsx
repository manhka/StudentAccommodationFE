import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./AuthPage.css";

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: "Quản Lý Phòng Dễ Dàng",
        desc: "Tìm kiếm, đặt phòng và quản lý nhà ở sinh viên mọi lúc, mọi nơi",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        title: "Kết Nối Bạn Cùng Phòng",
        desc: "Trò chuyện với bạn cùng phòng tiềm năng và xây dựng cộng đồng",
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
        ),
        title: "Thanh Toán An Toàn",
        desc: "Xử lý tiền thuê và tiền đặt cọc an toàn thông qua nền tảng của chúng tôi",
    },
];

const avatars = [
    { bg: "#FF6B6B", initials: "A" },
    { bg: "#4ECDC4", initials: "B" },
    { bg: "#45B7D1", initials: "C" },
    { bg: "#96CEB4", initials: "D" },
];

export default function AuthPage({ onLogin }) {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="auth-root">
            {/* Left Panel */}
            <div className="auth-left">
                <div className="auth-brand">
                    <h1 className="auth-brand-name">F-Scape</h1>
                    <p className="auth-brand-sub">
                        Nền tảng hiện đại để quản lý<br />nhà ở sinh viên một cách liền mạch.
                    </p>
                </div>

                <div className="auth-building-img">
                    <img
                        src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80"
                        alt="Student accommodation building"
                    />
                </div>

                <div className="auth-features">
                    {features.map((f, i) => (
                        <div className="auth-feature-card" key={i}>
                            <div className="auth-feature-icon">{f.icon}</div>
                            <div>
                                <p className="auth-feature-title">{f.title}</p>
                                <p className="auth-feature-desc">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="auth-social-proof">
                    <div className="auth-avatars">
                        {avatars.map((a, i) => (
                            <div
                                className="auth-avatar"
                                key={i}
                                style={{ background: a.bg, marginLeft: i === 0 ? 0 : "-10px" }}
                            >
                                {a.initials}
                            </div>
                        ))}
                        <div className="auth-proof-text">
                            <span className="auth-proof-count">10,000+</span>
                            <span className="auth-proof-label">sinh viên</span>
                            <span className="auth-proof-sub">Đã tham gia</span>
                        </div>
                    </div>

                    <div className="auth-rating">
                        <div className="auth-stars">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <span key={s} className="auth-star">★</span>
                            ))}
                        </div>
                        <div className="auth-proof-text">
                            <span className="auth-proof-count">4.8/5</span>
                            <span className="auth-proof-label">đánh giá</span>
                            <span className="auth-proof-sub">2,500+ nhận xét</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel — Auth Card */}
            <div className="auth-right">
                <div className="auth-card">
                    {/* Logo */}
                    <div className="auth-logo">
                        <svg viewBox="0 0 24 24" fill="white" width="32" height="32">
                            <path d="M6 2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v10h12V4H6zm2 2h3v2H8V6zm0 4h3v2H8v-2zm5-4h3v2h-3V6zm0 4h3v2h-3v-2z" />
                            <circle cx="12" cy="20" r="2" />
                        </svg>
                    </div>

                    <h2 className="auth-card-title">Chào mừng đến F-Scape</h2>
                    <p className="auth-card-sub">Người bạn đồng hành nhà ở sinh viên của bạn</p>

                    {/* Tab switcher */}
                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${activeTab === "login" ? "auth-tab-active" : ""}`}
                            onClick={() => setActiveTab("login")}
                        >
                            Đăng Nhập
                        </button>
                        <button
                            className={`auth-tab ${activeTab === "signup" ? "auth-tab-active" : ""}`}
                            onClick={() => setActiveTab("signup")}
                        >
                            Đăng Ký
                        </button>
                    </div>

                    {/* Form */}
                    {activeTab === "login" ? (
                        <LoginForm onLogin={onLogin} />
                    ) : (
                        <SignUpForm onSwitchToLogin={() => setActiveTab("login")} />
                    )}

                    {/* Badges */}
                    <div className="auth-badges">
                        <div className="auth-badge">
                            <span className="auth-badge-icon">🎓</span>
                            <span>Xác Nhận Sinh Viên</span>
                        </div>
                        <div className="auth-badge">
                            <span className="auth-badge-icon">🛡️</span>
                            <span>Nền Tảng An Toàn</span>
                        </div>
                        <div className="auth-badge">
                            <span className="auth-badge-icon">👥</span>
                            <span>10K+ Người Dùng</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
