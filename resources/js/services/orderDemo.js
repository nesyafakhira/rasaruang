const LAST_ORDER_KEY = 'rr_last_order';

const pad = (n, len = 2) => String(n).padStart(len, '0');

// Hanya untuk fase frontend. Di backend: OrderService membuat kode & menyimpan ke MySQL.
export function createDemoOrder({ orderType, tableId, paymentMethod, notes, summary }) {
    const now = new Date();
    const day = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

    let seq = 1;
    try {
        const key = `rr_order_seq_${day}`;
        seq = (Number.parseInt(localStorage.getItem(key), 10) || 0) + 1;
        localStorage.setItem(key, String(seq));
    } catch {
        // abaikan
    }

    const order = {
        order_code: `RR-${day}-${pad(seq, 4)}`,
        order_type: orderType,
        table_id: tableId,
        status: 'pending',
        payment_method: paymentMethod,
        payment_status: 'unpaid',
        notes,
        total_price: summary.total,
        items: summary.lines.map(l => ({
            menu_id: l.menu.id,
            menu_name: l.menu.name, // snapshot
            quantity: l.qty,
            price: l.menu.price,    // snapshot
            subtotal: l.subtotal,
        })),
        created_at: now.toISOString(),
    };

    try {
        localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    } catch {
        // abaikan
    }
    return order;
}
