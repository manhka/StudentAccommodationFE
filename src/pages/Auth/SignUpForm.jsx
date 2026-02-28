import React, { useState } from "react";

export default function SignUpForm({ onSwitchToLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: handle signup
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
                <label>Họ và Tên</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên đầy đủ"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="auth-field">
                <label>Email</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </span>
                    <input
                        type="email"
                        name="email"
                        placeholder="sinhvien@truonghoc.edu.vn"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="auth-field">
                <label>Mật khẩu</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </span>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Tạo mật khẩu"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(!showPassword)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="auth-field">
                <label>Xác nhận mật khẩu</label>
                <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                    </span>
                    <input
                        type={showConfirm ? "text" : "password"}
                        name="confirm"
                        placeholder="Xác nhận mật khẩu"
                        value={form.confirm}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    </button>
                </div>
            </div>

            <button type="submit" className="auth-submit-btn">Tạo Tài Khoản</button>

            <div className="auth-or">
                <span>Hoặc tiếp tục với</span>
            </div>

            <button type="button" className="auth-google-btn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
            </button>
        </form>
    );
}
