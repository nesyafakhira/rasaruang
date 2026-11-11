import { getOrderById } from '../services/orderStore';
import { fillOrderMeta } from '../components/orderMeta';

export default function init() {
    const root = document.querySelector('[data-page="order-success"]');
    const id = Number.parseInt(root.dataset.orderId, 10);
    const order = getOrderById(id);

    if (!order) {
        root.querySelector('#os-not-found').classList.remove('d-none');
        return;
    }

    fillOrderMeta(root, order);
    root.querySelector('#os-tracking').href = `/orders/${order.id}/tracking`;
    root.querySelector('#os-content').classList.remove('d-none');
}