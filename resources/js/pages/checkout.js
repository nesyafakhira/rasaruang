import { tables } from '../data/tables';
import { clearCart } from '../modules/cart';
import { rules, setFieldError, validateField } from '../modules/validation';
import { getCartSummary } from '../services/cartSummary';
import { createDemoOrder } from '../services/orderDemo';
import { rupiah } from '../utils/menu';

const ORDER_TYPES = ['dine_in', 'takeaway'];
const PAYMENTS = ['cash_on_counter', 'cash_at_table'];

const availableTables = tables.filter(t => t.status === 'available');

function renderSummary(listEl, summary) {
    const frag = document.createDocumentFragment();
    summary.lines.forEach(({ menu, qty, subtotal, ok }) => {
        const li = document.createElement('li');
        li.className = 'd-flex justify-content-between gap-2 mb-2' + (ok ? '' : ' text-danger');

        const left = document.createElement('span');
        left.textContent = `${qty} × ${menu.name}`;
        const right = document.createElement('span');
        right.textContent = rupiah.format(subtotal);

        li.append(left, right);
        frag.appendChild(li);
    });
    listEl.replaceChildren(frag);
}

export default function init() {
    const root = document.querySelector('[data-page="checkout"]');
    const $ = (sel) => root.querySelector(sel);

    const form = $('#checkout-form');
    const tableGroup = $('#table-group');
    const tableSelect = $('#table_id');
    const notesInput = $('#notes');
    const cartIssue = $('#co-issue');
    const submitBtn = $('#co-submit');
    const cashAtTable = $('#payment-cash_at_table');
    const cashOnCounter = $('#payment-cash_on_counter');
    const payHint = $('#pay-hint');
    const demo = form.hasAttribute('data-demo');

    // Keranjang kosong -> arahkan kembali
    const initial = getCartSummary();
    if (initial.lines.length === 0) {
        $('#co-empty').classList.remove('d-none');
        return;
    }
    form.classList.remove('d-none');

    renderSummary($('#co-lines'), initial);
    $('#co-total').textContent = rupiah.format(initial.total);
    if (initial.hasIssue) {
        cartIssue.classList.remove('d-none');
        submitBtn.disabled = true;
    }

    // Opsi meja (hanya yang available)
    availableTables.forEach((t) => {
        const opt = document.createElement('option');
        opt.value = String(t.id);
        opt.textContent = `Meja ${t.table_number} (kapasitas ${t.capacity})`;
        tableSelect.appendChild(opt);
    });

    // Dine-in: meja wajib. Takeaway: tanpa meja & hanya bayar di kasir.
    const syncType = () => {
        const dineIn = form.elements.order_type.value === 'dine_in';

        tableGroup.classList.toggle('d-none', !dineIn);
        tableSelect.disabled = !dineIn;
        if (!dineIn) setFieldError(tableSelect, '');

        cashAtTable.disabled = !dineIn;
        if (!dineIn && cashAtTable.checked) cashOnCounter.checked = true;
        payHint.textContent = dineIn ? '' : 'Pesanan takeaway dibayar di kasir.';
    };
    form.querySelectorAll('[name="order_type"]').forEach(r => r.addEventListener('change', syncType));
    tableSelect.addEventListener('change', () => setFieldError(tableSelect, ''));
    syncType();

    const validate = () => {
        const summary = getCartSummary();
        if (summary.lines.length === 0 || summary.hasIssue) {
            cartIssue.classList.remove('d-none');
            return null;
        }

        const orderType = form.elements.order_type.value;
        const paymentMethod = form.elements.payment_method.value;
        let ok = ORDER_TYPES.includes(orderType) && PAYMENTS.includes(paymentMethod);

        // takeaway hanya boleh cash_on_counter
        if (orderType === 'takeaway' && paymentMethod !== 'cash_on_counter') ok = false;

        let tableId = null;
        if (orderType === 'dine_in') {
            tableId = Number.parseInt(tableSelect.value, 10);
            const validTable = availableTables.some(t => t.id === tableId);
            setFieldError(tableSelect, validTable ? '' : 'Pilih meja yang tersedia.');
            if (!validTable) {
                tableSelect.focus();
                ok = false;
            }
        }

        if (!validateField(notesInput, [rules.max(200)])) ok = false;

        return ok ? { orderType, tableId, paymentMethod, notes: notesInput.value.trim(), summary } : null;
    };

    form.addEventListener('submit', (e) => {
        const data = validate();
        if (!data) {
            e.preventDefault();
            return;
        }
        if (!demo) {
            submitBtn.disabled = true; // mode backend: cegah klik ganda, form terkirim ke server
            return;
        }

        e.preventDefault();
        const order = createDemoOrder(data);
        clearCart();
        window.location.assign(`/order/success/${order.id}`);
    });
}
