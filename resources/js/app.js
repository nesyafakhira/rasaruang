import * as bootstrap from 'bootstrap';
import { initCartBadge } from './modules/cart';

window.bootstrap = bootstrap;

// Code splitting: modul halaman hanya diunduh saat halaman itu dibuka
const pages = {
    catalog: () => import('./pages/catalog'),
};

document.addEventListener('DOMContentLoaded', async () => {
    initCartBadge();

    const key = document.querySelector('[data-page]')?.dataset.page;
    if (key && Object.hasOwn(pages, key)) {
        const module = await pages[key]();
        module.default();
    }
});
