import { addToCart } from '../modules/cart';
import { rupiah, SPICE_LABEL, menuImage, isOrderable } from '../utils/menu';

// Teks selalu lewat textContent (anti-XSS). Link detail opsional.
export function buildMenuCard(menu, tpl) {
    const node = tpl.content.firstElementChild.cloneNode(true);

    node.querySelector('[data-name]').textContent = menu.name;
    node.querySelector('[data-category]').textContent = menu.category;
    node.querySelector('[data-price]').textContent = rupiah.format(menu.price);
    node.querySelector('[data-spice]').textContent = SPICE_LABEL[menu.spice_level];

    const img = node.querySelector('img');
    img.src = menuImage(menu.image);
    img.alt = menu.name;

    const detail = node.querySelector('[data-detail]');
    if (detail) detail.href = `/menu/${menu.id}`;

    const btn = node.querySelector('[data-add]');
    const orderable = isOrderable(menu);
    btn.disabled = !orderable;
    btn.textContent = orderable ? 'Tambah' : 'Habis';
    btn.addEventListener('click', () => addToCart(menu.id));

    return node;
}
