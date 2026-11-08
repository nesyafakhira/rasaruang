import { menus } from '../data/menus';
import { buildMenuCard } from '../components/menuCard';

export default function init() {
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
        result.forEach(m => frag.appendChild(buildMenuCard(m, tpl)));
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
