const KEY = 'rr_cart_v1';
export const MAX_QTY = 20;

const read = () => {
    try {
        const parsed = JSON.parse(localStorage.getItem(KEY));
        return Array.isArray(parsed)
            ? parsed.filter(i => Number.isInteger(i.id) && Number.isInteger(i.qty) && i.qty > 0)
            : [];
    } catch {
        return [];
    }
};

const write = (items) => {
    try {
        localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
        // storage penuh/diblokir: abaikan, UI tetap konsisten dengan data terakhir
    }
    document.dispatchEvent(new CustomEvent('cart:changed'));
};

export const getCart = read;
export const cartCount = () => read().reduce((n, i) => n + i.qty, 0);

export function addToCart(id, qty = 1) {
    const items = read();
    const found = items.find(i => i.id === id);
    if (found) found.qty = Math.min(MAX_QTY, found.qty + qty);
    else items.push({ id, qty: Math.min(MAX_QTY, qty) });
    write(items);
}

export function setQty(id, qty) {
    const items = read();
    const found = items.find(i => i.id === id);
    if (!found) return;
    found.qty = Math.min(MAX_QTY, Math.max(1, qty));
    write(items);
}

export function removeFromCart(id) {
    write(read().filter(i => i.id !== id));
}

export function clearCart() {
    write([]);
}

export function initCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;

    const render = () => {
        const n = cartCount();
        badge.textContent = n;
        badge.classList.toggle('d-none', n === 0);
    };

    render();
    document.addEventListener('cart:changed', render);
    // Perubahan dari tab lain
    window.addEventListener('storage', (e) => {
        if (e.key === KEY) document.dispatchEvent(new CustomEvent('cart:changed'));
    });
}
