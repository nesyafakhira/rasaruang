import { menus } from '../data/menus';
import { addToCart, MAX_QTY } from '../modules/cart';
import { rupiah, SPICE_LABEL, menuImage, isOrderable } from '../utils/menu';

export default function init() {
    const root = document.querySelector('[data-page="menu-detail"]');
    const $ = (sel) => root.querySelector(sel);

    const id = Number.parseInt(root.dataset.menuId, 10);
    const menu = menus.find(m => m.id === id);

    if (!menu) {
        $('#detail-not-found').classList.remove('d-none');
        return;
    }

    // Isi konten (textContent -> anti-XSS)
    document.title = `${menu.name} · RasaRuang`;
    $('#crumb-name').textContent = menu.name;
    $('#detail-category').textContent = menu.category;
    $('#detail-name').textContent = menu.name;
    $('#detail-desc').textContent = menu.description;
    $('#detail-spice').textContent = SPICE_LABEL[menu.spice_level];
    $('#detail-price').textContent = rupiah.format(menu.price);

    const img = $('#detail-img');
    img.src = menuImage(menu.image);
    img.alt = menu.name;

    const orderable = isOrderable(menu);
    $('#detail-stock').textContent = orderable ? `Tersedia (${menu.stock} porsi)` : 'Habis';

    const qtyInput = $('#qty');
    const minus = $('#qty-minus');
    const plus = $('#qty-plus');
    const addBtn = $('#detail-add');
    const status = $('#add-status');

    const max = Math.max(1, Math.min(MAX_QTY, menu.stock));
    const clamp = (v) => Math.min(max, Math.max(1, Number.parseInt(v, 10) || 1));

    qtyInput.max = String(max);

    if (!orderable) {
        [qtyInput, minus, plus, addBtn].forEach(el => (el.disabled = true));
        addBtn.textContent = 'Habis';
    } else {
        minus.addEventListener('click', () => (qtyInput.value = clamp(Number(qtyInput.value) - 1)));
        plus.addEventListener('click', () => (qtyInput.value = clamp(Number(qtyInput.value) + 1)));
        qtyInput.addEventListener('change', () => (qtyInput.value = clamp(qtyInput.value)));

        let timer;
        addBtn.addEventListener('click', () => {
            const qty = clamp(qtyInput.value);
            qtyInput.value = qty;
            addToCart(menu.id, qty);

            status.textContent = `${qty} × ${menu.name} ditambahkan ke keranjang.`;
            clearTimeout(timer);
            timer = setTimeout(() => (status.textContent = ''), 3000);
        });
    }

    $('#detail-content').classList.remove('d-none');
}
