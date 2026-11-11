import {
    ORDER_TYPE_LABEL, PAYMENT_METHOD_LABEL, PAYMENT_STATUS_LABEL, STATUS_LABEL,
    badgeClass, formatDateTime, formatRupiah, label,
} from '../utils/order';

// Mengisi elemen [data-f="..."] di dalam root. Elemen yang tidak ada dilewati.
// Semua lewat textContent (anti-XSS).
export function fillOrderMeta(root, order) {
    const set = (key, text) => {
        const el = root.querySelector(`[data-f="${key}"]`);
        if (el) el.textContent = text;
    };

    set('code', order.order_code);
    set('type', label(ORDER_TYPE_LABEL, order.order_type));
    set('table', order.order_type === 'dine_in' ? `Meja ${order.table_number ?? '-'}` : 'Tanpa meja (takeaway)');
    set('method', label(PAYMENT_METHOD_LABEL, order.payment_method));
    set('payment', label(PAYMENT_STATUS_LABEL, order.payment_status));
    set('total', formatRupiah(order.total_price));
    set('date', formatDateTime(order.created_at));
    set('notes', order.notes || '-');

    const badge = root.querySelector('[data-f="status"]');
    if (badge) {
        badge.textContent = label(STATUS_LABEL, order.status);
        [...badge.classList].forEach(c => c.startsWith('text-bg-') && badge.classList.remove(c));
        badge.classList.add('badge', badgeClass(order.status));
    }
}