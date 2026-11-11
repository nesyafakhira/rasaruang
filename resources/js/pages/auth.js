import { rules, validateForm, validateField, liveValidate } from '../modules/validation';
import { initPasswordToggles } from '../modules/passwordToggle';

const { required, email, min, max, password: strongPassword, match } = rules;

const schemas = {
    login: {
        email: [required, email, max(150)],
        password: [required, max(72)],
    },
    register: {
        name: [required, min(2), max(100)],
        email: [required, email, max(150)],
        password: [required, min(8), max(72), strongPassword],
        password_confirmation: [required, match('password')],
    },
};

export default function init() {
    const form = document.getElementById('auth-form');
    const schema = schemas[form.dataset.mode];
    if (!schema) return;

    const status = document.getElementById('form-status');
    const demo = form.hasAttribute('data-demo');

    initPasswordToggles(form);
    liveValidate(form, schema);

    // Jika password berubah, cek ulang konfirmasi (bila sudah diisi)
    if (schema.password_confirmation) {
        const confirm = form.elements.namedItem('password_confirmation');
        form.elements.namedItem('password').addEventListener('input', () => {
            if (confirm.value) validateField(confirm, schema.password_confirmation);
        });
    }

    form.addEventListener('submit', (e) => {
        if (!validateForm(form, schema)) {
            e.preventDefault();
            return;
        }
        if (demo) {
            e.preventDefault();
            status.textContent = 'Mode demo: data valid, tetapi belum dikirim karena backend belum terhubung.';
            status.classList.remove('d-none');
        } else {
            form.querySelector('[type="submit"]').disabled = true;
        }
    });
}
