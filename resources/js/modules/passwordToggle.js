export function initPasswordToggles(root = document) {
    root.querySelectorAll('[data-toggle-password]').forEach((btn) => {
        const input = document.getElementById(btn.dataset.togglePassword);
        if (!input) return;

        btn.addEventListener('click', () => {
            const show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            btn.textContent = show ? 'Sembunyikan' : 'Tampilkan';
            btn.setAttribute('aria-pressed', String(show));
        });
    });
}
