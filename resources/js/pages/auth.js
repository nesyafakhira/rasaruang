import { rules, validateForm, liveValidate } from '../modules/validation';
import { initPasswordToggles } from '../modules/passwordToggle';

const { required, email, max } = rules;

const schemas = {
    login: {
        email: [required, email, max(150)],
        password: [required, max(72)],
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
            // Mode backend: cegah klik ganda
            form.querySelector('[type="submit"]').disabled = true;
        }
    });
}
