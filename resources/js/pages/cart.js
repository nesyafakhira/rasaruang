import { setQty, removeFromCart, MAX_QTY } from '../modules/cart';
import { getCartSummary } from '../services/cartSummary';
import { rupiah, menuImage, isOrderable } from '../utils/menu';

function buildLine({ menu, qty, subtotal, ok }, tpl) {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.dataset.id = String(menu.id);

    const img = node.querySelector('img');
    img.src = menuImage(menu.image);
    img.alt = menu.name;

    node.querySelector('[data-name]').textContent = menu.name;
    node.querySelector('[data-price]').textContent = rupiah.format(menu.price);
    node.querySelector('[data-subtotal]').textContent = rupiah.format(subtotal);

    const input = node.querySelector('[data-qty]');
    input.value = String(qty);
    input.max = String(Math.min(MAX_QTY, Math.max(1, menu.stock)));
    input.setAttribute('aria-label', `Jumlah ${menu.name}`);

    const warning = node.querySelector('[data-warning]');
    if (!ok) {
        warning.textContent = isOrderable(menu)
            ? `Stok tersisa ${menu.stock}. Kurangi jumlah.`
            : 'Menu ini sedang habis. Hapus dari keranjang.';
        warning.classList.remove('d-none');
    }

    return node;
}

export default function init() {
    const root = document.querySelector('[data-page="cart"]');
    const $ = (sel) => root.querySelector(sel);

    const list = $('#cart-lines');
    const tpl = $('#cart-line-tpl');
    const checkout = $('#cart-checkout');

    const render = () => {
        const { lines, total, hasIssue } = getCartSummary();
        const isEmpty = lines.length === 0;

        $('#cart-empty').classList.toggle('d-none', !isEmpty);
        $('#cart-content').classList.toggle('d-none', isEmpty);
        if (isEmpty) {
            list.replaceChildren();
            return;
        }

        const frag = document.createDocumentFragment();
        lines.forEach(line => frag.appendChild(buildLine(line, tpl)));
        list.replaceChildren(frag);

        $('#cart-total').textContent = rupiah.format(total);
        $('#cart-issue').classList.toggle('d-none', !hasIssue);

        checkout.classList.toggle('disabled', hasIssue);
        checkout.setAttribute('aria-disabled', String(hasIssue));
        checkout.tabIndex = hasIssue ? -1 : 0;
    };

    // Event delegation: satu listener untuk semua baris
    list.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const row = btn.closest('[data-id]');
        const id = Number.parseInt(row.dataset.id, 10);
        const current = Number.parseInt(row.querySelector('[data-qty]').value, 10) || 1;
        const { action } = btn.dataset;

        if (action === 'remove') removeFromCart(id);
        if (action === 'plus') setQty(id, current + 1);
        if (action === 'minus') setQty(id, current - 1);

        // Render ulang membuat elemen baru -> kembalikan fokus keyboard
        list.querySelector(`[data-id="${id}"] [data-action="${action}"]`)?.focus();
    });

    list.addEventListener('change', (e) => {
        const input = e.target.closest('[data-qty]');
        if (!input) return;
        const id = Number.parseInt(input.closest('[data-id]').dataset.id, 10);
        setQty(id, Number.parseInt(input.value, 10) || 1);
    });

    checkout.addEventListener('click', (e) => {
        if (checkout.classList.contains('disabled')) e.preventDefault();
    });

    document.addEventListener('cart:changed', render);
    render();
}
