import { tables } from '../data/tables';
import { getOrders, nextOrderId, saveOrder } from './orderStore';

const pad = (n, len = 2) => String(n).padStart(len, '0');

// Hanya fase frontend. Di backend: OrderService membuat kode, menyimpan ke MySQL (DB transaction).
export function createDemoOrder({ orderType, tableId, paymentMethod, notes, summary }) {
    const now = new Date();
    const iso = now.toISOString();
    const day = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;

    const todayCount = getOrders().filter(o => o.order_code.startsWith(`RR-${day}-`)).length;
    const table = tableId ? tables.find(t => t.id === tableId) : null;

    const order = {
        id: nextOrderId(),
        order_code: `RR-${day}-${pad(todayCount + 1, 4)}`,
        order_type: orderType,
        table_id: tableId,
        table_number: table?.table_number ?? null,
        status: 'pending',
        payment_method: paymentMethod,
        payment_status: 'unpaid',
        notes,
        cancellation_reason: null,
        total_price: summary.total,
        items: summary.lines.map(l => ({
            menu_id: l.menu.id,
            menu_name: l.menu.name, // snapshot
            quantity: l.qty,
            price: l.menu.price,    // snapshot
            subtotal: l.subtotal,
        })),
        status_history: [{
            old_status: null,
            new_status: 'pending',
            changed_by: 'Customer',
            notes: 'Pesanan dibuat',
            created_at: iso,
        }],
        created_at: iso,
    };

    saveOrder(order);
    return order;
}