import { menus } from '../data/menus';
import { getCart } from '../modules/cart';
import { isOrderable } from '../utils/menu';

const byId = new Map(menus.map(m => [m.id, m]));

// Gabungkan isi keranjang dengan data menu. Di Phase 6, hitungan resmi ada di server.
export function getCartSummary() {
    const lines = getCart().flatMap(({ id, qty }) => {
        const menu = byId.get(id);
        if (!menu) return []; // menu sudah tidak ada -> abaikan
        const ok = isOrderable(menu) && qty <= menu.stock;
        return [{ menu, qty, subtotal: menu.price * qty, ok }];
    });

    return {
        lines,
        total: lines.reduce((sum, l) => sum + (l.ok ? l.subtotal : 0), 0),
        hasIssue: lines.some(l => !l.ok),
    };
}
