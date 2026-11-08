import { menus } from '../data/menus';
import { isOrderable } from '../utils/menu';

/**
 * Aturan RasaMatch (harus identik dengan RecommendationService di Laravel nanti):
 * - menu tersedia, harga <= budget, kategori & pedas sesuai (jika dipilih)
 * - urut harga tertinggi dulu
 * - jika kosong, hitung budget minimal sebagai saran alternatif
 */
export function recommend({ budget, category, spice }) {
    const candidates = menus.filter(m =>
        isOrderable(m) &&
        (!category || m.category === category) &&
        (!spice || m.spice_level === spice)
    );

    const matches = candidates
        .filter(m => m.price <= budget)
        .sort((a, b) => b.price - a.price);

    const suggestedBudget = matches.length || !candidates.length
        ? null
        : Math.min(...candidates.map(m => m.price));

    return { matches, suggestedBudget };
}

// Fase backend: ganti isi fungsi ini dengan fetch() ke endpoint JSON Laravel
export async function fetchRecommendations(criteria) {
    return recommend(criteria);
}
