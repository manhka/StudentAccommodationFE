import React, { useState } from "react";
import "./BuildingsPage.css";
import BuildingDetailPage from "./BuildingDetailPage";

// ── INITIAL DATA ──────────────────────────────────────────────────
const INITIAL_BUILDINGS = [
    {
        id: 1,
        name: "F-Scape Hà Nội",
        address: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
        status: "active",
        totalRooms: 85,
        rentedRooms: 72,
        nearSchool: "ĐH Quốc gia Hà Nội",
        distance: "500m",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
        description: "Tòa nhà hiện đại nằm ngay gần khu vực Cầu Giấy, thuận tiện di chuyển.",
        floors: 8,
        yearBuilt: 2018,
    },
    {
        id: 2,
        name: "F-Scape FPT",
        address: "Khu Công nghệ cao Hòa Lạc, Hà Nội",
        status: "active",
        totalRooms: 65,
        rentedRooms: 58,
        nearSchool: "ĐH FPT",
        distance: "300m",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80",
        description: "Ký túc xá cao cấp phục vụ sinh viên ĐH FPT tại Hòa Lạc.",
        floors: 10,
        yearBuilt: 2020,
    },
    {
        id: 3,
        name: "F-Scape TP.HCM",
        address: "702 Nguyễn Văn Linh, Quận 7, TP.HCM",
        status: "active",
        totalRooms: 120,
        rentedRooms: 98,
        nearSchool: "RMIT Việt Nam",
        distance: "400m",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80",
        description: "Tòa nhà tọa lạc trung tâm Quận 7, gần RMIT và nhiều trường đại học lớn.",
        floors: 12,
        yearBuilt: 2019,
    },
    {
        id: 4,
        name: "F-Scape Đà Nẵng",
        address: "54 Nguyễn Lương Bằng, Đà Nẵng",
        status: "maintenance",
        totalRooms: 45,
        rentedRooms: 35,
        nearSchool: "ĐH Đà Nẵng",
        distance: "600m",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
        description: "Tòa nhà đang trong giai đoạn bảo trì nâng cấp hệ thống.",
        floors: 6,
        yearBuilt: 2017,
    },
];

const EMPTY_FORM = {
    name: "",
    address: "",
    status: "active",
    totalRooms: "",
    rentedRooms: "",
    nearSchool: "",
    distance: "",
    image: "",
    description: "",
    floors: "",
    yearBuilt: "",
};

// ── ICONS ─────────────────────────────────────────────────────────
const IconEdit = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const IconDelete = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
    </svg>
);

const IconPin = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const IconClose = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// ── BUILDING CARD ─────────────────────────────────────────────────
function BuildingCard({ building, onView, onEdit, onDelete }) {
    const rate = Math.round((building.rentedRooms / building.totalRooms) * 100);
    const safeRate = isNaN(rate) ? 0 : rate;
    return (
        <div className="bl-card">
            <div className="bl-card-img">
                <img src={building.image} alt={building.name} />
                <span className={`bl-badge bl-badge-${building.status}`}>
                    {building.status === "active" ? "Hoạt động" : "Bảo trì"}
                </span>
            </div>
            <div className="bl-card-body">
                <h3 className="bl-card-name">{building.name}</h3>
                <p className="bl-card-addr">
                    <IconPin /> {building.address}
                </p>
                <div className="bl-card-stats">
                    <div className="bl-stat">
                        <span className="bl-stat-num">{building.totalRooms}</span>
                        <span className="bl-stat-lbl">Tổng phòng</span>
                    </div>
                    <div className="bl-stat">
                        <span className="bl-stat-num green">{building.rentedRooms}</span>
                        <span className="bl-stat-lbl">Đã thuê</span>
                    </div>
                    <div className="bl-stat">
                        <span className="bl-stat-num blue">{rate}%</span>
                        <span className="bl-stat-lbl">Tỷ lệ</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="bl-progress-wrap">
                    <div className="bl-progress-bar">
                        <div className="bl-progress-fill" style={{ width: `${safeRate}%` }} />
                    </div>
                </div>

                <div className="bl-card-footer">
                    <span className="bl-near">
                        🏫 Gần: <strong>{building.nearSchool}</strong>
                        <span className="bl-dist">{building.distance}</span>
                    </span>
                    <div className="bl-actions">
                        <button className="bl-detail-btn" onClick={() => onView(building)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            Xem chi tiết
                        </button>
                        <button className="bl-icon-btn edit" onClick={() => onEdit(building)} title="Sửa">
                            <IconEdit />
                        </button>
                        <button className="bl-icon-btn del" onClick={() => onDelete(building)} title="Xóa">
                            <IconDelete />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── IMAGE UPLOADER ───────────────────────────────────────────────
function ImageUploader({ value, onChange }) {
    const [dragging, setDragging] = useState(false);
    const inputRef = React.useRef();

    const handleFile = (file) => {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (e) => onChange(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleChange = (e) => handleFile(e.target.files[0]);

    return (
        <div
            className={`img-upload-zone ${dragging ? "dragging" : ""} ${value ? "has-img" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => !value && inputRef.current.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
            />
            {value ? (
                <div className="img-preview-wrap">
                    <img src={value} alt="preview" className="img-preview" />
                    <div className="img-preview-actions">
                        <button
                            type="button"
                            className="img-change-btn"
                            onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            Đổi ảnh
                        </button>
                        <button
                            type="button"
                            className="img-remove-btn"
                            onClick={(e) => { e.stopPropagation(); onChange(""); }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Xóa
                        </button>
                    </div>
                </div>
            ) : (
                <div className="img-placeholder">
                    <div className="img-upload-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1.5" width="36" height="36">
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                    <p className="img-upload-text">Kéo thả ảnh vào đây</p>
                    <p className="img-upload-sub">hoặc <span>nhấn để chọn tệp</span></p>
                    <p className="img-upload-hint">PNG, JPG, WEBP — tối đa 5MB</p>
                </div>
            )}
        </div>
    );
}

// ── MODAL FORM ────────────────────────────────────────────────────
function BuildingModal({ mode, initialData, onSave, onClose }) {
    const [form, setForm] = useState(initialData || EMPTY_FORM);
    const [errors, setErrors] = useState({});

    const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Vui lòng nhập tên tòa nhà";
        if (!form.address.trim()) e.address = "Vui lòng nhập địa chỉ";
        if (!form.totalRooms || Number(form.totalRooms) <= 0) e.totalRooms = "Số phòng phải > 0";
        if (Number(form.rentedRooms) > Number(form.totalRooms)) e.rentedRooms = "Không thể vượt tổng phòng";
        if (!form.nearSchool.trim()) e.nearSchool = "Vui lòng nhập trường gần đó";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave({
            ...form,
            totalRooms: Number(form.totalRooms),
            rentedRooms: Number(form.rentedRooms) || 0,
            floors: Number(form.floors) || 0,
            yearBuilt: Number(form.yearBuilt) || 0,
        });
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-box">
                <div className="modal-header">
                    <h2>{mode === "add" ? "Thêm tòa nhà mới" : "Chỉnh sửa tòa nhà"}</h2>
                    <button className="modal-close" onClick={onClose}><IconClose /></button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="modal-grid-2">
                        <div className="mf-field">
                            <label>Tên tòa nhà <span className="req">*</span></label>
                            <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="VD: F-Scape Hà Nội" />
                            {errors.name && <p className="mf-err">{errors.name}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Trạng thái</label>
                            <select value={form.status} onChange={(e) => set("status", e.target.value)}>
                                <option value="active">Hoạt động</option>
                                <option value="maintenance">Bảo trì</option>
                            </select>
                        </div>
                    </div>

                    <div className="mf-field">
                        <label>Địa chỉ <span className="req">*</span></label>
                        <input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="VD: 144 Xuân Thủy, Cầu Giấy, Hà Nội" />
                        {errors.address && <p className="mf-err">{errors.address}</p>}
                    </div>

                    <div className="modal-grid-3">
                        <div className="mf-field">
                            <label>Tổng số phòng <span className="req">*</span></label>
                            <input type="number" min="1" value={form.totalRooms} onChange={(e) => set("totalRooms", e.target.value)} placeholder="VD: 85" />
                            {errors.totalRooms && <p className="mf-err">{errors.totalRooms}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Phòng đã thuê</label>
                            <input type="number" min="0" value={form.rentedRooms} onChange={(e) => set("rentedRooms", e.target.value)} placeholder="VD: 72" />
                            {errors.rentedRooms && <p className="mf-err">{errors.rentedRooms}</p>}
                        </div>
                        <div className="mf-field">
                            <label>Số tầng</label>
                            <input type="number" min="1" value={form.floors} onChange={(e) => set("floors", e.target.value)} placeholder="VD: 8" />
                        </div>
                    </div>

                    <div className="modal-grid-2">
                        <div className="mf-field">
                            <label>Trường gần đó <span className="req">*</span></label>
                            <input value={form.nearSchool} onChange={(e) => set("nearSchool", e.target.value)} placeholder="VD: ĐH Quốc gia Hà Nội" />
                            {errors.nearSchool && <p className="mf-err">{errors.nearSchool}</p>}
                        </div>
                    </div>

                    <div className="modal-grid-2">
                        <div className="mf-field">
                            <label>Năm xây dựng</label>
                            <input type="number" value={form.yearBuilt} onChange={(e) => set("yearBuilt", e.target.value)} placeholder="VD: 2018" />
                        </div>
                        <div className="mf-field">
                            <label>Khoảng cách đến trường</label>
                            <input value={form.distance} onChange={(e) => set("distance", e.target.value)} placeholder="VD: 500m" />
                        </div>
                    </div>

                    <div className="mf-field">
                        <label>Ảnh tòa nhà</label>
                        <ImageUploader value={form.image} onChange={(v) => set("image", v)} />
                    </div>

                    <div className="mf-field">
                        <label>Mô tả</label>
                        <textarea rows="3" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Mô tả ngắn về tòa nhà..." />
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
                        <button type="submit" className="btn-save">
                            {mode === "add" ? "Thêm tòa nhà" : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── CONFIRM DELETE ────────────────────────────────────────────────
function ConfirmDelete({ building, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onCancel()}>
            <div className="confirm-box">
                <div className="confirm-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" width="32" height="32">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                </div>
                <h3>Xóa tòa nhà</h3>
                <p>Bạn có chắc muốn xóa tòa nhà <strong>"{building.name}"</strong>? Hành động này không thể hoàn tác.</p>
                <div className="confirm-btns">
                    <button className="btn-cancel" onClick={onCancel}>Hủy</button>
                    <button className="btn-delete" onClick={onConfirm}>Xóa</button>
                </div>
            </div>
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────
export default function BuildingsPage() {
    const [buildings, setBuildings] = useState(INITIAL_BUILDINGS);
    const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', data }
    const [confirmDel, setConfirmDel] = useState(null); // null | building
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedBuilding, setSelectedBuilding] = useState(null);  // chi tiết

    // Stats
    const totalRooms = buildings.reduce((s, b) => s + b.totalRooms, 0);
    const totalRented = buildings.reduce((s, b) => s + b.rentedRooms, 0);
    const occupancy = totalRooms ? Math.round((totalRented / totalRooms) * 100 * 10) / 10 : 0;

    // Filtered list
    const filtered = buildings.filter((b) => {
        const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.address.toLowerCase().includes(search.toLowerCase());
        const matchStatus = filterStatus === "all" || b.status === filterStatus;
        return matchSearch && matchStatus;
    });

    // CRUD handlers
    const handleAdd = () => setModal({ mode: "add", data: null });

    const handleEdit = (b) => setModal({ mode: "edit", data: { ...b } });

    const handleSave = (formData) => {
        if (modal.mode === "add") {
            setBuildings((prev) => [...prev, { ...formData, id: Date.now() }]);
        } else {
            setBuildings((prev) => prev.map((b) => (b.id === formData.id ? formData : b)));
        }
        setModal(null);
    };

    const handleDeleteConfirm = () => {
        setBuildings((prev) => prev.filter((b) => b.id !== confirmDel.id));
        setConfirmDel(null);
    };

    return (
        <div className="bl-page">
            {/* Trang chi tiết */}
            {selectedBuilding && (
                <BuildingDetailPage
                    building={selectedBuilding}
                    onBack={() => setSelectedBuilding(null)}
                />
            )}

            {/* Danh sách */}
            {!selectedBuilding && (
                <>
                    {/* Header */}
                    <div className="bl-header">
                        <div>
                            <h1 className="bl-title">Tòa nhà</h1>
                            <p className="bl-subtitle">Quản lý tất cả các tòa nhà F-Scape</p>
                        </div>
                        <button className="bl-add-btn" onClick={handleAdd}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="16" height="16">
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Thêm tòa nhà
                        </button>
                    </div>

                    {/* Summary stats */}
                    <div className="bl-summary">
                        {[
                            { label: "Tổng tòa nhà", value: buildings.length, icon: "🏢", color: "#e8f5e9" },
                            { label: "Tổng phòng", value: totalRooms, icon: "🚪", color: "#e3f2fd" },
                            { label: "Phòng đã thuê", value: totalRented, icon: "🔑", color: "#fdf3f3" },
                            { label: "Tỷ lệ lấp đầy", value: `${occupancy}%`, icon: "📊", color: "#fef9e7" },
                        ].map((s, i) => (
                            <div className="bl-sum-card" key={i} style={{ background: s.color }}>
                                <span className="bl-sum-icon">{s.icon}</span>
                                <div>
                                    <p className="bl-sum-val">{s.value}</p>
                                    <p className="bl-sum-lbl">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filters */}
                    <div className="bl-filters">
                        <div className="bl-search-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" width="16" height="16">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                placeholder="Tìm kiếm tòa nhà..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="bl-filter-btns">
                            {[
                                { key: "all", label: "Tất cả" },
                                { key: "active", label: "Hoạt động" },
                                { key: "maintenance", label: "Bảo trì" },
                            ].map((f) => (
                                <button
                                    key={f.key}
                                    className={`bl-filter-btn ${filterStatus === f.key ? "active" : ""}`}
                                    onClick={() => setFilterStatus(f.key)}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    {filtered.length === 0 ? (
                        <div className="bl-empty">
                            <p>🏚️ Không tìm thấy tòa nhà nào.</p>
                        </div>
                    ) : (
                        <div className="bl-grid">
                            {filtered.map((b) => (
                                <BuildingCard
                                    key={b.id}
                                    building={b}
                                    onView={(b) => setSelectedBuilding(b)}
                                    onEdit={handleEdit}
                                    onDelete={setConfirmDel}
                                />
                            ))}
                        </div>
                    )}

                    {/* Modal Thêm / Sửa */}
                    {modal && (
                        <BuildingModal
                            mode={modal.mode}
                            initialData={modal.data}
                            onSave={handleSave}
                            onClose={() => setModal(null)}
                        />
                    )}

                    {/* Confirm Delete */}
                    {confirmDel && (
                        <ConfirmDelete
                            building={confirmDel}
                            onConfirm={handleDeleteConfirm}
                            onCancel={() => setConfirmDel(null)}
                        />
                    )}
                </>
            )}
        </div>
    );
}
