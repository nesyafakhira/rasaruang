@extends('layouts.app')

@section('title', 'RasaMatch')
@section('description', 'Temukan menu yang pas dengan budget dan selera Anda.')

@section('content')
<div class="container rr-section" data-page="rasamatch">
    <h1 class="h2">RasaMatch</h1>
    <p class="text-secondary mb-4">Masukkan budget dan selera, kami carikan menu yang pas.</p>

    <form id="rasamatch-form" class="row g-3 mb-4" novalidate>
        <div class="col-md-4">
            <label for="budget" class="form-label">Budget maksimum (Rp)</label>
            <input id="budget" name="budget" type="number" class="form-control" inputmode="numeric"
                   min="1000" max="10000000" step="500" placeholder="contoh: 25000" required>
            <div class="invalid-feedback">Masukkan budget antara Rp 1.000 dan Rp 10.000.000.</div>
        </div>
        <div class="col-md-3">
            <label for="category" class="form-label">Kategori</label>
            <select id="category" name="category" class="form-select">
                <option value="">Semua kategori</option>
                <option>Main Course</option><option>Beverage</option><option>Dessert</option><option>Snack</option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="spice" class="form-label">Tingkat pedas</label>
            <select id="spice" name="spice" class="form-select">
                <option value="">Semua tingkat pedas</option>
                <option value="none">Tidak pedas</option><option value="mild">Ringan</option>
                <option value="medium">Sedang</option><option value="hot">Pedas</option>
            </select>
        </div>
        <div class="col-md-2 d-flex align-items-end">
            <button id="rm-submit" type="submit" class="btn btn-primary w-100">Cari Rekomendasi</button>
        </div>
    </form>

    <div aria-live="polite">
        <p id="rm-summary" class="fw-semibold"></p>
        <div id="rm-empty" class="alert alert-warning d-none" role="alert"></div>
        <div id="rm-grid" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4"></div>
    </div>

    @include('components.menu-card-template')
</div>
@endsection
