export const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

export const SPICE_LABEL = Object.freeze({
    none: 'Tidak pedas',
    mild: 'Ringan',
    medium: 'Sedang',
    hot: 'Pedas',
});

export const menuImage = (file) => `/assets/img/menu/${encodeURIComponent(file)}`;

// Aturan tunggal "bisa dipesan" -> dipakai katalog, detail, dan RasaMatch
export const isOrderable = (menu) => menu.is_available && menu.stock > 0;
