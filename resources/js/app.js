import * as bootstrap from 'bootstrap';
import { initCartBadge } from './modules/cart';
import { initCatalog } from './pages/catalog';

window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', () => {
    initCartBadge();

    // Modul halaman hanya jalan jika elemennya ada (hemat memori)
    if (document.querySelector('[data-page="catalog"]')) {
        initCatalog();
    }
});
