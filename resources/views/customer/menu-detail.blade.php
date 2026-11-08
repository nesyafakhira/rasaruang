@extends('layouts.app')

@section('title', 'Detail Menu')

@section('content')
<div class="container rr-section" data-page="menu-detail" data-menu-id="{{ $id }}">
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('menu.index') }}">Menu</a></li>
            <li class="breadcrumb-item active" aria-current="page" id="crumb-name">Detail</li>
        </ol>
    </nav>

    <div id="detail-not-found" class="alert alert-warning d-none" role="alert">
        Menu tidak ditemukan.
        <a href="{{ route('menu.index') }}" class="alert-link">Kembali ke daftar menu</a>.
    </div>

    <div id="detail-content" class="row g-4 d-none">
        <div class="col-md-6">
            <img id="detail-img" class="img-fluid rounded-4 shadow w-100" width="640" height="480" decoding="async" alt="">
        </div>
        <div class="col-md-6">
            <span id="detail-category" class="badge rr-badge-soft mb-2"></span>
            <h1 id="detail-name" class="h2"></h1>
            <p id="detail-desc" class="text-secondary"></p>

            <dl class="row mb-3">
                <dt class="col-5">Tingkat pedas</dt><dd id="detail-spice" class="col-7"></dd>
                <dt class="col-5">Ketersediaan</dt><dd id="detail-stock" class="col-7"></dd>
            </dl>

            <p id="detail-price" class="h3 text-primary mb-4"></p>

            <div class="d-flex flex-wrap gap-3 align-items-end">
                <div>
                    <label for="qty" class="form-label">Jumlah</label>
                    <div class="input-group rr-qty">
                        <button id="qty-minus" type="button" class="btn btn-outline-dark" aria-label="Kurangi jumlah">&minus;</button>
                        <input id="qty" type="number" class="form-control text-center" value="1" min="1" inputmode="numeric">
                        <button id="qty-plus" type="button" class="btn btn-outline-dark" aria-label="Tambah jumlah">+</button>
                    </div>
                </div>
                <button id="detail-add" type="button" class="btn btn-primary btn-lg">Tambah ke Keranjang</button>
            </div>

            <p id="add-status" class="text-success mt-3 mb-0" role="status"></p>
        </div>
    </div>
</div>
@endsection
