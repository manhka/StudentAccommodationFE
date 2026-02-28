import React from "react";
import "./BuildingDetailPage.css";

// ── ICON ──────────────────────────────────────────────────────────
const IconBack = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

// ── MAIN ──────────────────────────────────────────────────────────
export default function BuildingDetailPage({ building, onBack }) {
    const totalRooms = building.totalRooms || 0;
    const rentedRooms = building.rentedRooms || 0;
    const available = totalRooms - rentedRooms;
    const occupancyRate = totalRooms ? Math.round((rentedRooms / totalRooms) * 100) : 0;

    const stats = [
        { label: "Tổng phòng", value: totalRooms, icon: "🚪", color: "#e8f5e9" },
        { label: "Đang thuê", value: rentedRooms, icon: "👤", color: "#e3f2fd" },
        { label: "Còn trống", value: available, icon: "✅", color: "#f0fdf4" },
        { label: "Tỷ lệ lấp đầy", value: `${occupancyRate}%`, icon: "📊", color: "#fef9e7" },
    ];

    return (
        <div className="bd-page">
            {/* HEADER */}
            <div className="bd-header">
                <div className="bd-header-left">
                    <button className="bd-back-btn" onClick={onBack}>
                        <IconBack /> Quay lại
                    </button>
                    <div>
                        <div className="bd-title-row">
                            <h1 className="bd-title">{building.name}</h1>
                            <span className={`bd-status-badge ${building.status === "active" ? "active" : "maintenance"}`}>
                                {building.status === "active" ? "Hoạt động" : "Bảo trì"}
                            </span>
                        </div>
                        <p className="bd-subtitle">📍 {building.address}</p>
                    </div>
                </div>
            </div>

            {/* INFO CARD */}
            <div className="bd-info-card">
                <div className="bd-info-img">
                    {building.image
                        ? <img src={building.image} alt={building.name} />
                        : <div className="bd-no-img">🏢</div>
                    }
                </div>
                <div className="bd-info-details">
                    <div className="bd-info-grid">
                        <div className="bd-info-item">
                            <span className="bd-info-label">Địa chỉ</span>
                            <span className="bd-info-value">📍 {building.address}</span>
                        </div>
                        <div className="bd-info-item">
                            <span className="bd-info-label">Trường gần đó</span>
                            <span className="bd-info-value">🏫 {building.nearSchool} — {building.distance}</span>
                        </div>
                        {building.floors > 0 && (
                            <div className="bd-info-item">
                                <span className="bd-info-label">Số tầng</span>
                                <span className="bd-info-value">🏗️ {building.floors} tầng</span>
                            </div>
                        )}
                        {building.yearBuilt > 0 && (
                            <div className="bd-info-item">
                                <span className="bd-info-label">Năm xây dựng</span>
                                <span className="bd-info-value">📅 {building.yearBuilt}</span>
                            </div>
                        )}
                    </div>
                    {building.description && (
                        <p className="bd-description">{building.description}</p>
                    )}
                </div>
            </div>

            {/* STATS */}
            <div className="bd-stats-row">
                {stats.map((s, i) => (
                    <div className="bd-stat-card" key={i} style={{ background: s.color }}>
                        <span className="bd-stat-icon">{s.icon}</span>
                        <div>
                            <p className="bd-stat-value">{s.value}</p>
                            <p className="bd-stat-label">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
