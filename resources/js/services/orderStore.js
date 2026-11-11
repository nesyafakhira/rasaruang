// Penyimpanan sementara di localStorage. Di Phase 6 diganti query Eloquent / endpoint JSON.
const KEY = 'rr_orders_v1';

const isOrder = (o) =>
    o && Number.isInteger(o.id) && typeof o.order_code === 'string' &&
    typeof o.status === 'string' && Array.isArray(o.items) && Array.isArray(o.status_history);

const read = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(KEY));
        return Array.isArray(parsed) ? parsed.filter(isOrder) : [];
    } catch {
        return [];
    }
};

const write = (orders) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(orders));
    } catch {
        // storage penuh/diblokir
    }
};

export const getOrders = () => read().sort((a, b) => b.id - a.id); // terbaru dulu
export const getOrderById = (id) => read().find(o => o.id === id) ?? null;
export const nextOrderId = () => read().reduce((max, o) => Math.max(max, o.id), 0) + 1;

export function saveOrder(order) {
    write([...read(), order]);
}

// updater menerima salinan pesanan dan mengembalikan pesanan yang sudah diubah
export function updateOrder(id, updater) {
    const orders = read();
    const index = orders.findIndex(o => o.id === id);
    if (index < 0) return null;

    orders[index] = updater(structuredClone(orders[index]));
    write(orders);
    return orders[index];
}