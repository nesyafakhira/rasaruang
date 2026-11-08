import { fetchRecommendations } from '../services/rasamatch';
import { buildMenuCard } from '../components/menuCard';
import { rupiah } from '../utils/menu';

const MIN_BUDGET = 1000;
const MAX_BUDGET = 10_000_000;

export default function init() {
    const form = document.getElementById('rasamatch-form');
    const budgetInput = document.getElementById('budget');
    const submitBtn = document.getElementById('rm-submit');
    const summary = document.getElementById('rm-summary');
    const grid = document.getElementById('rm-grid');
    const empty = document.getElementById('rm-empty');
    const tpl = document.getElementById('menu-card-tpl');

    const parseBudget = () => {
        const value = Number(budgetInput.value);
        const valid = Number.isInteger(value) && value >= MIN_BUDGET && value <= MAX_BUDGET;
        budgetInput.classList.toggle('is-invalid', !valid);
        return valid ? value : null;
    };

    budgetInput.addEventListener('input', () => budgetInput.classList.remove('is-invalid'));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const budget = parseBudget();
        if (budget === null) {
            budgetInput.focus();
            return;
        }

        const f = new FormData(form);
        const criteria = {
            budget,
            category: String(f.get('category') ?? ''),
            spice: String(f.get('spice') ?? ''),
        };

        submitBtn.disabled = true;
        submitBtn.textContent = 'Mencari...';

        try {
            const { matches, suggestedBudget } = await fetchRecommendations(criteria);

            const frag = document.createDocumentFragment();
            matches.forEach(m => frag.appendChild(buildMenuCard(m, tpl)));
            grid.replaceChildren(frag);

            if (matches.length) {
                empty.classList.add('d-none');
                summary.textContent = `${matches.length} menu cocok untuk budget ${rupiah.format(budget)}.`;
            } else {
                summary.textContent = '';
                empty.textContent = suggestedBudget
                    ? `Belum ada menu dengan budget tersebut. Coba naikkan budget minimal ${rupiah.format(suggestedBudget)}.`
                    : 'Tidak ada menu yang cocok dengan kategori dan tingkat pedas ini. Coba ubah preferensi.';
                empty.classList.remove('d-none');
            }
        } catch {
            summary.textContent = '';
            empty.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            empty.classList.remove('d-none');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Cari Rekomendasi';
        }
    });
}
