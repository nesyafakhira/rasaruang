const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Setiap aturan: (value) => true | 'pesan error'
export const rules = {
    required: (v) => v.trim() !== '' || 'Wajib diisi.',
    email: (v) => EMAIL_RE.test(v.trim()) || 'Format email tidak valid.',
    min: (n) => (v) => v.length >= n || `Minimal ${n} karakter.`,
    max: (n) => (v) => v.length <= n || `Maksimal ${n} karakter.`,
    password: (v) => (/[A-Za-z]/.test(v) && /\d/.test(v)) || 'Harus mengandung huruf dan angka.',
    match: (otherId, message = 'Konfirmasi tidak sama.') => (v) =>
        v === document.getElementById(otherId)?.value || message,
};

// Konvensi: setiap field punya elemen <div id="{id}-error" class="invalid-feedback">
export function setFieldError(input, message = '') {
    const invalid = message !== '';
    const feedback = document.getElementById(`${input.id}-error`);

    input.classList.toggle('is-invalid', invalid);
    input.setAttribute('aria-invalid', String(invalid));
    if (feedback) {
        feedback.textContent = message;
        feedback.classList.toggle('d-block', invalid);
    }
}

export function validateField(input, checks) {
    let error = '';
    for (const check of checks) {
        const result = check(input.value);
        if (result !== true) {
            error = result;
            break;
        }
    }
    setFieldError(input, error);
    return error === '';
}

// schema: { namaField: [aturan, aturan, ...] }
export function validateForm(form, schema) {
    let firstInvalid = null;
    for (const [name, checks] of Object.entries(schema)) {
        const input = form.elements.namedItem(name);
        if (!validateField(input, checks) && !firstInvalid) firstInvalid = input;
    }
    firstInvalid?.focus();
    return firstInvalid === null;
}

// Validasi saat keluar field (blur); setelah error, perbaiki langsung saat mengetik
export function liveValidate(form, schema) {
    for (const [name, checks] of Object.entries(schema)) {
        const input = form.elements.namedItem(name);
        input.addEventListener('blur', () => validateField(input, checks));
        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) validateField(input, checks);
        });
    }
}
