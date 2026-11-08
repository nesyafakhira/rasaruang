import { menus } from '../data/menus';
import { addToCart } from '../modules/cart';

const rupiah = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });
const SPICE = { none: 'Tidak pedas', mild: 'Ringan', medium: 'Sedang', hot: 'Pedas' };

function buildCard(menu, tpl) {
    const node = tpl.content.firstElementChild.cloneNode(true);
    node.querySelector('[data-name]').textContent = menu.name;
    node.querySelector('[data-category]').textContent = menu.category;
    node.querySelector('[data-price]').textContent = rupiah.format(menu.price);
    node.querySelector('[data-spice]').textContent = SPICE[menu.spice_level];
    const img = node.querySelector('img');
    img.src = `/assets/img/menu/${encodeURIComponent(menu.image)}`;
    img.alt = menu.name;
    const btn = node.querySelector('[data-add]');
    const available = menu.is_available && menu.stock > 0;
    btn.disabled = !available;
    btn.textContent = available ? 'Tambah' : 'Habis';
    btn.addEventListener('click', () => addToCart(menu.id));
    return node;
}

export function initCatalog() {
    const grid = document.getElementById('menu-grid');
    const tpl = document.getElementById('menu-card-tpl');
    const empty = document.getElementById('menu-empty');
    const form = document.getElementById('menu-filter');

    const state = { q: '', category: '', spice: '', maxPrice: Infinity };

    const render = () => {
        const q = state.q.toLowerCase();
        const result = menus.filter(m =>
            (!q || m.name.toLowerCase().includes(q)) &&
            (!state.category || m.category === state.category) &&
            (!state.spice || m.spice_level === state.spice) &&
            m.price <= state.maxPrice
        );
        const frag = document.createDocumentFragment();
        result.forEach(m => frag.appendChild(buildCard(m, tpl)));
        grid.replaceChildren(frag);
        empty.classList.toggle('d-none', result.length > 0);
    };

    let timer;
    form.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const f = new FormData(form);
            state.q = String(f.get('q') ?? '').trim().slice(0, 60);
            state.category = String(f.get('category') ?? '');
            state.spice = String(f.get('spice') ?? '');
            const max = Number(f.get('max_price'));
            state.maxPrice = max > 0 ? max : Infinity;
            render();
        }, 250);
    });
    form.addEventListener('submit', e => e.preventDefault());

    render();
}
