import * as bootstrap from 'bootstrap';
import { initCartBadge } from './modules/cart';

window.bootstrap = bootstrap;

document.addEventListener('DOMContentLoaded', () => {
    initCartBadge();
});
