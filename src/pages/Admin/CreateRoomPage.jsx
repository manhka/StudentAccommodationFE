import React, { useState, useRef } from "react";
import "./CreateRoomPage.css";

// ── CONSTANTS ─────────────────────────────────────────────────────
const ROOM_TYPES = ["Phòng đơn", "Phòng đôi", "Studio", "Ký túc xá", "Penthouse"];
const BUILDINGS = ["F-Scape Hà Nội", "F-Scape FPT", "F-Scape TP.HCM", "F-Scape Đà Nẵng"];
const STATUS_OPTS = ["Còn trống", "Đã thuê", "Bảo trì"];
const CONTRACT_TYPES = ["Ngắn hạn (1–3 tháng)", "Trung hạn (3–6 tháng)", "Dài hạn (6–12 tháng)", "Theo năm"];
const MIN_STAY_OPTS = ["1 tháng", "2 tháng", "3 tháng", "6 tháng", "12 tháng"];
const BED_TYPES = ["Giường đơn", "Giường đôi", "Giường tầng", "Không có giường"];
const BATHROOM_TYPES = ["WC riêng", "WC chung"];

const IN_ROOM_AMENITIES = [
    "WiFi", "Tủ kệ", "Tủ áo", "Tủ quần áo",
    "Điều hòa", "Sưởi ấm", "Cửa sổ", "Bàn làm việc",
];
const SHARED_FACILITIES = [
    "Bếp dùng chung", "Giặt ủi", "Phòng gym", "Phòng học",
    "Khu vực chung", "Sân thượng", "Chỗ để xe đạp", "Phòng chiếu phim",
];

const INIT_FORM = {
    roomCode: "", roomType: "", building: "", floor: "", status: "",
    price: "", contractType: "", minStay: "", availableFrom: "",
    roomSize: "", bedType: "", bathroomType: "", maxOccupancy: "",
    inRoomAmenities: [], sharedFacilities: [],
    images: [],
    description: "",
};

// ── ICONS ─────────────────────────────────────────────────────────
const IconChevron = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const IconClose = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);
const IconUpload = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="36" height="36">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);
const IconBack = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);

// ── CUSTOM SELECT ─────────────────────────────────────────────────
function Select({ value, onChange, options, placeholder }) {
    return (
        <div className="cr-select-wrap">
            <select value={value} onChange={e => onChange(e.target.value)} className={!value ? "placeholder" : ""}>
                <option value="">{placeholder}</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <span className="cr-select-icon"><IconChevron /></span>
        </div>
    );
}

// ── CHECKBOX CHIP ─────────────────────────────────────────────────
function AmenityChip({ label, checked, onChange }) {
    return (
        <label className={`cr-chip ${checked ? "checked" : ""}`}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="cr-chip-box" />
            {label}
        </label>
    );
}

// ── MULTI-IMAGE UPLOADER ──────────────────────────────────────────
function MultiImageUploader({ images, onChange }) {
    const inputRef = useRef();
    const [dragging, setDragging] = useState(false);

    const readFiles = (files) => {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith("image/")) return;
            if (file.size > 10 * 1024 * 1024) return;
            const reader = new FileReader();
            reader.onload = e => {
                onChange(prev => [...prev, { src: e.target.result, name: file.name, id: Date.now() + Math.random() }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        readFiles(e.dataTransfer.files);
    };

    const removeImage = (id) => onChange(prev => prev.filter(img => img.id !== id));

    return (
        <div className="cr-img-section">
            <div
                className={`cr-drop-zone ${dragging ? "dragging" : ""}`}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={e => readFiles(e.target.files)}
                />
                <div className="cr-drop-content">
                    <div className="cr-drop-icon"><IconUpload /></div>
                    <p className="cr-drop-text">Kéo thả ảnh vào đây hoặc nhấn để tải lên</p>
                    <p className="cr-drop-hint">Hỗ trợ JPG, PNG, GIF, WEBP — tối đa 10MB mỗi ảnh</p>
                </div>
            </div>

            {images.length > 0 && (
                <div className="cr-img-preview-grid">
                    {images.map((img, idx) => (
                        <div className={`cr-img-thumb ${idx === 0 ? "main" : ""}`} key={img.id}>
                            <img src={img.src} alt={img.name} />
                            {idx === 0 && <span className="cr-main-label">Ảnh chính</span>}
                            <button type="button" className="cr-img-remove" onClick={() => removeImage(img.id)}>
                                <IconClose />
                            </button>
                        </div>
                    ))}
                    <div className="cr-img-add-more" onClick={() => inputRef.current.click()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" width="24" height="24">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Thêm ảnh</span>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────
export default function CreateRoomPage({ onBack, onSave }) {
    const [form, setForm] = useState(INIT_FORM);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const toggleAmenity = (key, val) => {
        setForm(p => {
            const cur = p[key] || [];
            return { ...p, [key]: cur.includes(val) ? cur.filter(a => a !== val) : [...cur, val] };
        });
    };

    const handleImages = (updater) =>
        setForm(p => ({ ...p, images: typeof updater === "function" ? updater(p.images) : updater }));

    const validate = () => {
        const e = {};
        if (!form.roomCode.trim()) e.roomCode = "Vui lòng nhập mã phòng";
        if (!form.roomType) e.roomType = "Vui lòng chọn loại phòng";
        if (!form.building) e.building = "Vui lòng chọn tòa nhà";
        if (!form.floor) e.floor = "Vui lòng nhập số tầng";
        if (!form.price || Number(form.price) <= 0) e.price = "Vui lòng nhập giá hợp lệ";
        if (!form.status) e.status = "Vui lòng chọn trạng thái";
        if (form.description.length > 0 && form.description.length < 50)
            e.description = "Mô tả phải có ít nhất 50 ký tự";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e, asDraft = false) => {
        e.preventDefault();
        if (!asDraft && !validate()) return;
        setSubmitting(true);
        setTimeout(() => {
            onSave && onSave({ ...form, draft: asDraft });
            setSubmitting(false);
        }, 400);
    };

    const charCount = form.description.length;

    return (
        <div className="cr-page">
            {/* TOPBAR */}
            <div className="cr-topbar">
                <div className="cr-breadcrumb">
                    <span>Dashboard</span>
                    <span className="cr-bc-sep">›</span>
                    <span className="cr-bc-link" onClick={onBack}>Phòng</span>
                    <span className="cr-bc-sep">›</span>
                    <span className="cr-bc-current">Tạo mới</span>
                </div>
                <div className="cr-toolbar-actions">
                    <button type="button" className="cr-btn-cancel" onClick={onBack}>Hủy</button>
                    <button type="button" className="cr-btn-draft" onClick={e => handleSubmit(e, true)}>
                        Lưu nháp
                    </button>
                    <button
                        type="button"
                        className="cr-btn-create"
                        disabled={submitting}
                        onClick={e => handleSubmit(e, false)}
                    >
                        {submitting ? "Đang lưu..." : "✦ Tạo phòng"}
                    </button>
                </div>
            </div>

            <h1 className="cr-title">Tạo phòng mới</h1>

            <form className="cr-form" onSubmit={e => e.preventDefault()}>

                {/* ── THÔNG TIN CƠ BẢN ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Thông tin cơ bản</h2>
                    <div className="cr-grid-2">
                        <div className="cr-field">
                            <label>Tên / Mã phòng <span className="req">*</span></label>
                            <input
                                value={form.roomCode}
                                onChange={e => set("roomCode", e.target.value)}
                                placeholder="VD: A-101"
                                className={errors.roomCode ? "error" : ""}
                            />
                            {errors.roomCode && <p className="cr-err">{errors.roomCode}</p>}
                        </div>
                        <div className="cr-field">
                            <label>Loại phòng <span className="req">*</span></label>
                            <Select
                                value={form.roomType}
                                onChange={v => set("roomType", v)}
                                options={ROOM_TYPES}
                                placeholder="Chọn loại phòng"
                            />
                            {errors.roomType && <p className="cr-err">{errors.roomType}</p>}
                        </div>
                    </div>
                    <div className="cr-grid-3">
                        <div className="cr-field">
                            <label>Tòa nhà <span className="req">*</span></label>
                            <Select
                                value={form.building}
                                onChange={v => set("building", v)}
                                options={BUILDINGS}
                                placeholder="Chọn tòa nhà"
                            />
                            {errors.building && <p className="cr-err">{errors.building}</p>}
                        </div>
                        <div className="cr-field">
                            <label>Tầng <span className="req">*</span></label>
                            <input
                                type="number"
                                min="1"
                                value={form.floor}
                                onChange={e => set("floor", e.target.value)}
                                placeholder="VD: 3"
                                className={errors.floor ? "error" : ""}
                            />
                            {errors.floor && <p className="cr-err">{errors.floor}</p>}
                        </div>
                        <div className="cr-field">
                            <label>Trạng thái <span className="req">*</span></label>
                            <Select
                                value={form.status}
                                onChange={v => set("status", v)}
                                options={STATUS_OPTS}
                                placeholder="Chọn trạng thái"
                            />
                            {errors.status && <p className="cr-err">{errors.status}</p>}
                        </div>
                    </div>
                </section>

                {/* ── GIÁ THUÊ & HỢP ĐỒNG ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Giá thuê &amp; Hợp đồng</h2>
                    <div className="cr-grid-2">
                        <div className="cr-field">
                            <label>Giá thuê/tháng <span className="req">*</span></label>
                            <div className="cr-input-prefix">
                                <span className="cr-prefix">₫</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={form.price}
                                    onChange={e => set("price", e.target.value)}
                                    placeholder="VD: 4.500.000"
                                    className={errors.price ? "error" : ""}
                                />
                            </div>
                            {errors.price && <p className="cr-err">{errors.price}</p>}
                        </div>
                        <div className="cr-field">
                            <label>Loại hợp đồng</label>
                            <Select
                                value={form.contractType}
                                onChange={v => set("contractType", v)}
                                options={CONTRACT_TYPES}
                                placeholder="Chọn loại hợp đồng"
                            />
                        </div>
                    </div>
                    <div className="cr-grid-2">
                        <div className="cr-field">
                            <label>Thời gian tối thiểu</label>
                            <Select
                                value={form.minStay}
                                onChange={v => set("minStay", v)}
                                options={MIN_STAY_OPTS}
                                placeholder="Chọn thời gian tối thiểu"
                            />
                        </div>
                        <div className="cr-field">
                            <label>Ngày sẵn sàng cho thuê</label>
                            <input
                                type="date"
                                value={form.availableFrom}
                                onChange={e => set("availableFrom", e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                {/* ── THÔNG SỐ PHÒNG ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Thông số phòng</h2>
                    <div className="cr-grid-2">
                        <div className="cr-field">
                            <label>Diện tích (m²)</label>
                            <input
                                type="number"
                                min="0"
                                value={form.roomSize}
                                onChange={e => set("roomSize", e.target.value)}
                                placeholder="VD: 20"
                            />
                        </div>
                        <div className="cr-field">
                            <label>Loại giường</label>
                            <Select
                                value={form.bedType}
                                onChange={v => set("bedType", v)}
                                options={BED_TYPES}
                                placeholder="Chọn loại giường"
                            />
                        </div>
                    </div>
                    <div className="cr-grid-2">
                        <div className="cr-field">
                            <label>Loại phòng tắm</label>
                            <Select
                                value={form.bathroomType}
                                onChange={v => set("bathroomType", v)}
                                options={BATHROOM_TYPES}
                                placeholder="Chọn loại phòng tắm"
                            />
                        </div>
                        <div className="cr-field">
                            <label>Sức chứa tối đa</label>
                            <input
                                type="number"
                                min="1"
                                value={form.maxOccupancy}
                                onChange={e => set("maxOccupancy", e.target.value)}
                                placeholder="VD: 2"
                            />
                        </div>
                    </div>
                </section>

                {/* ── TIỆN ÍCH ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Tiện ích</h2>

                    <div className="cr-amenity-group">
                        <p className="cr-amenity-label">Trong phòng</p>
                        <div className="cr-chips-grid">
                            {IN_ROOM_AMENITIES.map(a => (
                                <AmenityChip
                                    key={a} label={a}
                                    checked={form.inRoomAmenities.includes(a)}
                                    onChange={() => toggleAmenity("inRoomAmenities", a)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="cr-amenity-group">
                        <p className="cr-amenity-label">Tiện ích chung</p>
                        <div className="cr-chips-grid">
                            {SHARED_FACILITIES.map(a => (
                                <AmenityChip
                                    key={a} label={a}
                                    checked={form.sharedFacilities.includes(a)}
                                    onChange={() => toggleAmenity("sharedFacilities", a)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ẢNH PHÒNG ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Ảnh phòng</h2>
                    <MultiImageUploader images={form.images} onChange={handleImages} />
                    {form.images.length > 0 && (
                        <p className="cr-img-count">
                            {form.images.length} ảnh đã tải lên · Ảnh đầu tiên sẽ là ảnh đại diện
                        </p>
                    )}
                </section>

                {/* ── MÔ TẢ ── */}
                <section className="cr-section">
                    <h2 className="cr-section-title">Mô tả</h2>
                    <div className="cr-field">
                        <label>Mô tả phòng</label>
                        <textarea
                            rows="5"
                            value={form.description}
                            onChange={e => set("description", e.target.value)}
                            placeholder="Mô tả về phòng, các tiện ích, vị trí và thông tin thêm..."
                            className={errors.description ? "error" : ""}
                        />
                        <div className="cr-desc-footer">
                            {errors.description
                                ? <p className="cr-err">{errors.description}</p>
                                : <p className="cr-hint">Vui lòng mô tả ít nhất 50 ký tự</p>
                            }
                            <span className={`cr-charcount ${charCount > 0 && charCount < 50 ? "warn" : ""}`}>
                                {charCount} ký tự
                            </span>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <div className="cr-footer">
                    <button type="button" className="cr-footer-cancel" onClick={onBack}>
                        <IconBack /> Hủy
                    </button>
                    <div className="cr-footer-right">
                        <button type="button" className="cr-btn-draft" onClick={e => handleSubmit(e, true)}>
                            Lưu nháp
                        </button>
                        <button
                            type="button"
                            className="cr-btn-create"
                            disabled={submitting}
                            onClick={e => handleSubmit(e, false)}
                        >
                            {submitting ? "Đang lưu..." : "✦ Tạo phòng"}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}
