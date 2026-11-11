import { rupiah } from './menu';

export const STATUS_FLOW = Object.freeze(['pending', 'confirmed', 'preparing', 'ready', 'completed']);

export const STATUS_LABEL = Object.freeze({
    pending: 'Menunggu konfirmasi',
    confirmed: 'Dikonfirmasi',
    preparing: 'Sedang disiapkan',
    ready: 'Siap diambil',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
});

const STATUS_BADGE = Object.freeze({
    pending: 'text-bg-warning',
    confirmed: 'text-bg-info',
    preparing: 'text-bg-primary',
    ready: 'text-bg-success',
    completed: 'text-bg-secondary',
    cancelled: 'text-bg-danger',
});

export const PAYMENT_STATUS_LABEL = Object.freeze({
    unpaid: 'Belum dibayar',
    paid: 'Sudah dibayar',
    refunded: 'Dikembalikan',
});

export const PAYMENT_METHOD_LABEL = Object.freeze({
    cash_on_counter: 'Cash on Counter (bayar di kasir)',
    cash_at_table: 'Cash at Table (bayar di meja)',
});

export const ORDER_TYPE_LABEL = Object.freeze({
    dine_in: 'Dine-in',
    takeaway: 'Takeaway',
});

// Nilai tak dikenal (mis. data localStorage rusak) -> '-' , bukan error
export const label = (map, key) => (Object.hasOwn(map, key) ? map[key] : '-');

export const badgeClass = (status) => (Object.hasOwn(STATUS_BADGE, status) ? STATUS_BADGE[status] : 'text-bg-secondary');

export function formatDateTime(iso) {
    const d = new Date(iso);
    return Number.isNaN(d.getTime())
        ? '-'
        : new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
}

// Aturan master plan: customer hanya bisa membatalkan saat Pending
export const canCancel = (order) => order.status === 'pending';

export const formatRupiah = (n) => rupiah.format(Number.isFinite(n) ? n : 0);