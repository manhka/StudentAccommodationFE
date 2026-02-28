import React, { useState } from "react";
import "./RoomsPage.css";
import CreateRoomPage from "./CreateRoomPage";

// ── INITIAL DATA ──────────────────────────────────────────────────
const INITIAL_ROOMS = [
    {
        id: 1,
        roomNumber: "A-301",
        building: "F-Scape Hà Nội",
        status: "available",
        type: "Phòng đơn",
        area: 18,
        capacity: 1,
        floor: 3,
        price: 4500000,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    },
    {
        id: 2,
        roomNumber: "B-205",
        building: "F-Scape FPT",
        status: "occupied",
        type: "Phòng đôi",
        area: 25,
        capacity: 2,
        floor: 2,
        price: 5200000,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    },
    {
        id: 3,
        roomNumber: "C-102",
        building: "F-Scape TP.HCM",
        status: "occupied",
        type: "Studio",
        area: 35,
        capacity: 1,
        floor: 1,
        price: 6800000,
        image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&q=80",
    },
    {
        id: 4,
        roomNumber: "A-405",
        building: "F-Scape Hà Nội",
        status: "available",
        type: "Phòng đơn",
        area: 20,
        capacity: 1,
        floor: 4,
        price: 4800000,
        image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80",
    },
    {
        id: 5,
        roomNumber: "C-308",
        building: "F-Scape TP.HCM",
        status: "available",
        type: "Phòng đôi",
        area: 28,
        capacity: 2,
        floor: 3,
        price: 5500000,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
    },
    {
        id: 6,
        roomNumber: "D-201",
        building: "F-Scape Đà Nẵng",
        status: "maintenance",
        type: "Ký túc xá",
        area: 22,
        capacity: 2,
        floor: 2,
        price: 4200000,
        image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=600&q=80",
    },
];

const STATUS_CONFIG = {
    available: { label: "Còn trống", cls: "rm-badge-available" },
    occupied: { label: "Đã thuê", cls: "rm-badge-occupied" },
    maintenance: { label: "Bảo trì", cls: "rm-badge-maintenance" },
};

const EMPTY_FORM = {
    roomNumber: "", building: "F-Scape Hà Nội", status: "available",
    type: "Phòng đơn", area: "", capacity: 1, floor: "", price: "", image: "",
};

// ── ICONS ─────────────────────────────────────────────────────────
const IconEdit = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const IconDelete = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
);
const IconClose = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const IconEye = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

// ── ROOM CARD ─────────────────────────────────────────────────────
function RoomCard({ room, onEdit, onDelete }) {
    const cfg = STATUS_CONFIG[room.status];
    const fmtPrice = (p) => p.toLocaleString("vi-VN");

    return (
        <div className="rm-card">
            {/* Image */}
            <div className="rm-card-img">
                <img src={room.image} alt={room.roomNumber} />
                <span className={`rm-badge ${cfg.cls}`}>{cfg.label}</span>
            </div>

            {/* Body */}
            <div className="rm-card-body">
                <div className="rm-card-title-row">
                    <span className="rm-room-number">{room.roomNumber}</span>
                    <span className="rm-building">{room.building}</span>
                </div>

                <div className="rm-info-grid">
                    <div className="rm-info-row">
                        <span className="rm-info-label">Loại:</span>
                        <span className="rm-info-val">{room.type}</span>
                    </div>
                    <div className="rm-info-row">
                        <span className="rm-info-label">Diện tích:</span>
                        <span className="rm-info-val">{room.area} m²</span>
                    </div>
                    <div className="rm-info-row">
                        <span className="rm-info-label">Sức chứa:</span>
                        <span className="rm-info-val">{room.capacity} người</span>
                    </div>
                    <div className="rm-info-row">
                        <span className="rm-info-label">Tầng:</span>
                        <span className="rm-info-val">Tầng {room.floor}</span>
                    </div>
                </div>

                <div className="rm-price-row">
                    <span className="rm-price">{fmtPrice(room.price)} đ</span>
                    <span className="rm-price-sub">/ tháng</span>
                </div>

                <div className="rm-actions">
                    <button className="rm-detail-btn">
                        <IconEye /> Chi tiết
                    </button>
                    <button className="rm-icon-btn rm-edit" onClick={() => onEdit(room)} title="Sửa">
                        <IconEdit />
                    </button>
                    <button className="rm-icon-btn rm-del" onClick={() => onDelete(room)} title="Xóa">
                        <IconDelete />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── ROOM MODAL ────────────────────────────────────────────────────
function RoomModal({ mode, initialData, onSave, onClose }) {
    const [form, setForm] = useState(initialData || EMPTY_FORM);
    const [errors, setErrors] = useState({});

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.roomNumber.trim()) e.roomNumber = "Vui lòng nhập số phòng";
        if (!form.floor || Number(form.floor) <= 0) e.floor = "Tầng phải > 0";
        if (!form.price || Number(form.price) <= 0) e.price = "Giá phải > 0";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({ ...form, floor: Number(form.floor), price: Number(form.price), area: Number(form.area) || 0, capacity: Number(form.capacity) || 1 });
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                <div className="modal-header">
                    <h2>{mode === "add" ? "Tạo phòng mới" : "Chỉnh sửa phòng"}</h2>
                    <button className="modal-close" onClick={onClose}><IconClose /></button>
                </div>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="modal-grid-2">
                        <div className="mf-field">
                            <label>Số phòng <span className="req">*</span></label>
                            <input value={form.roomNumber} onChange={e => set("roomNumber", e.target.value)} placeholder="VD: A-301" />
                            {errors.roomNumber && <p className="mf-err">{errors.roomNumber}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Tòa nhà</label>
                            <select value={form.building} onChange={e => set("building", e.target.value)}>
                                {["F-Scape Hà Nội", "F-Scape FPT", "F-Scape TP.HCM", "F-Scape Đà Nẵng"].map(b => <option key={b}>{b}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="modal-grid-3">
                        <div className="mf-field">
                            <label>Loại phòng</label>
                            <select value={form.type} onChange={e => set("type", e.target.value)}>
                                {["Phòng đơn", "Phòng đôi", "Studio", "Ký túc xá"].map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                        <div className="mf-field">
                            <label>Tầng <span className="req">*</span></label>
                            <input type="number" min="1" value={form.floor} onChange={e => set("floor", e.target.value)} placeholder="VD: 3" />
                            {errors.floor && <p className="mf-err">{errors.floor}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Trạng thái</label>
                            <select value={form.status} onChange={e => set("status", e.target.value)}>
                                <option value="available">Còn trống</option>
                                <option value="occupied">Đã thuê</option>
                                <option value="maintenance">Bảo trì</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-grid-3">
                        <div className="mf-field">
                            <label>Giá/tháng (đ) <span className="req">*</span></label>
                            <input type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="VD: 4500000" />
                            {errors.price && <p className="mf-err">{errors.price}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Diện tích (m²)</label>
                            <input type="number" value={form.area} onChange={e => set("area", e.target.value)} placeholder="VD: 20" />
                        </div>
                        <div className="mf-field">
                            <label>Sức chứa (người)</label>
                            <input type="number" min="1" value={form.capacity} onChange={e => set("capacity", e.target.value)} placeholder="VD: 2" />
                        </div>
                    </div>
                    <div className="mf-field">
                        <label>URL ảnh phòng</label>
                        <input value={form.image} onChange={e => set("image", e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-save">
                            {mode === "add" ? "Tạo phòng" : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── CONFIRM DELETE ─────────────────────────────────────────────────
function ConfirmDelete({ room, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
            <div className="confirm-box">
                <div className="confirm-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="32" height="32">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h3>Xóa phòng</h3>
                <p>Bạn có chắc muốn xóa phòng <strong>"{room.roomNumber}"</strong>? Hành động này không thể hoàn tác.</p>
                <div className="confirm-btns">
                    <button className="btn-cancel" onClick={onCancel}>Hủy</button>
                    <button className="btn-delete" onClick={onConfirm}>Xóa</button>
                </div>
            </div>
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────
export default function RoomsPage() {
    const [rooms, setRooms] = useState(INITIAL_ROOMS);
    const [modal, setModal] = useState(null);
    const [confirmDel, setConfirmDel] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [showCreate, setShowCreate] = useState(false);

    // Stats
    const total = rooms.length;
    const available = rooms.filter(r => r.status === "available").length;
    const occupied = rooms.filter(r => r.status === "occupied").length;
    const maintenance = rooms.filter(r => r.status === "maintenance").length;

    // Filtered
    const filtered = rooms.filter(r => {
        const q = search.toLowerCase();
        const matchSearch = r.roomNumber.toLowerCase().includes(q)
            || r.building.toLowerCase().includes(q)
            || r.type.toLowerCase().includes(q);
        const matchFilter = filter === "all" || r.status === filter;
        return matchSearch && matchFilter;
    });

    const handleSave = (data) => {
        if (modal.mode === "add") {
            setRooms(prev => [...prev, { ...data, id: Date.now() }]);
        } else {
            setRooms(prev => prev.map(r => r.id === data.id ? data : r));
        }
        setModal(null);
    };

    const handleCreateSave = (data) => {
        const statusMap = { "Còn trống": "available", "Đã thuê": "occupied", "Bảo trì": "maintenance" };
        setRooms(prev => [...prev, {
            id: Date.now(),
            roomNumber: data.roomCode || "New",
            building: data.building || "",
            status: statusMap[data.status] || "available",
            type: data.roomType || "Phòng đơn",
            area: Number(data.roomSize) || 0,
            capacity: Number(data.maxOccupancy) || 1,
            floor: Number(data.floor) || 1,
            price: Number(data.price) || 0,
            image: data.images?.[0]?.src || "",
        }]);
        setShowCreate(false);
    };

    const handleDelete = () => {
        setRooms(prev => prev.filter(r => r.id !== confirmDel.id));
        setConfirmDel(null);
    };

    const stats = [
        { label: "Tổng phòng", value: total, icon: "🏠", color: "#e8f5e9" },
        { label: "Còn trống", value: available, icon: "🏡", color: "#e3f2fd" },
        { label: "Đã thuê", value: occupied, icon: "🔑", color: "#fdf3f3" },
        { label: "Bảo trì", value: maintenance, icon: "🔧", color: "#fef9e7" },
    ];

    // Show CreateRoomPage
    if (showCreate) {
        return (
            <CreateRoomPage
                onBack={() => setShowCreate(false)}
                onSave={handleCreateSave}
            />
        );
    }

    return (
        <div className="rm-page">
            {/* Header */}
            <div className="rm-header">
                <div>
                    <h1 className="rm-title">Phòng</h1>
                    <p className="rm-subtitle">Quản lý tất cả các phòng cho thuê</p>
                </div>
                <button className="rm-add-btn" onClick={() => setShowCreate(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="15" height="15">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Tạo phòng mới
                </button>
            </div>

            {/* Stats */}
            <div className="rm-stats">
                {stats.map((s, i) => (
                    <div className="rm-stat-card" key={i} style={{ background: s.color }}>
                        <span className="rm-stat-icon">{s.icon}</span>
                        <div>
                            <p className="rm-stat-val">{s.value}</p>
                            <p className="rm-stat-lbl">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search + Filter */}
            <div className="rm-controls">
                <div className="rm-search">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="15" height="15">
                        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        placeholder="Tìm kiếm theo mã phòng, tòa nhà, hoặc loại phòng..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="rm-filter-btns">
                    {[
                        { key: "all", label: "Tất cả" },
                        { key: "available", label: "Còn trống" },
                        { key: "occupied", label: "Đã thuê" },
                        { key: "maintenance", label: "Bảo trì" },
                    ].map(f => (
                        <button
                            key={f.key}
                            className={`rm-filter-btn ${filter === f.key ? "active" : ""}`}
                            onClick={() => setFilter(f.key)}
                        >{f.label}</button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <div className="rm-empty">🚪 Không tìm thấy phòng nào.</div>
            ) : (
                <div className="rm-grid">
                    {filtered.map(r => (
                        <RoomCard
                            key={r.id}
                            room={r}
                            onEdit={r => setModal({ mode: "edit", data: { ...r } })}
                            onDelete={r => setConfirmDel(r)}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            {modal && (
                <RoomModal
                    mode={modal.mode}
                    initialData={modal.data}
                    onSave={handleSave}
                    onClose={() => setModal(null)}
                />
            )}
            {confirmDel && (
                <ConfirmDelete
                    room={confirmDel}
                    onConfirm={handleDelete}
                    onCancel={() => setConfirmDel(null)}
                />
            )}
        </div>
    );
}
