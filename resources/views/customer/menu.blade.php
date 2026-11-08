@extends('layouts.app')

@section('title', 'Menu')

@section('content')
<div class="container rr-section" data-page="catalog">
    <h1 class="h2 mb-4">Menu</h1>

    <form id="menu-filter" class="row g-2 mb-4" role="search" novalidate>
        <div class="col-md-4">
            <label for="q" class="visually-hidden">Cari menu</label>
            <input id="q" name="q" type="search" class="form-control" placeholder="Cari menu..." maxlength="60" autocomplete="off">
        </div>
        <div class="col-6 col-md-2">
            <label for="category" class="visually-hidden">Kategori</label>
            <select id="category" name="category" class="form-select">
                <option value="">Semua kategori</option>
                <option>Main Course</option><option>Beverage</option><option>Dessert</option><option>Snack</option>
            </select>
        </div>
        <div class="col-6 col-md-3">
            <label for="spice" class="visually-hidden">Tingkat pedas</label>
            <select id="spice" name="spice" class="form-select">
                <option value="">Semua tingkat pedas</option>
                <option value="none">Tidak pedas</option><option value="mild">Ringan</option>
                <option value="medium">Sedang</option><option value="hot">Pedas</option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="max_price" class="visually-hidden">Harga maksimum</label>
            <input id="max_price" name="max_price" type="number" min="0" step="1000" class="form-control" placeholder="Harga maks (Rp)" inputmode="numeric">
        </div>
    </form>

    <div id="menu-grid" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4" aria-live="polite"></div>
    <p id="menu-empty" class="text-center text-secondary py-5 d-none">Menu tidak ditemukan. Coba ubah filter.</p>

    @include('components.menu-card-template')
</div>
@endsection
