@extends('layouts.app')

@section('title', 'Keranjang')

@section('content')
<div class="container rr-section" data-page="cart">
    <h1 class="h2 mb-4">Keranjang</h1>

    <div id="cart-empty" class="text-center py-5 d-none">
        <p class="text-secondary">Keranjang kamu masih kosong.</p>
        <a href="{{ route('menu.index') }}" class="btn btn-primary">Lihat Menu</a>
    </div>

    <div id="cart-content" class="row g-4 d-none">
        <div class="col-lg-8">
            <div id="cart-lines"></div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow rr-sticky-summary">
                <div class="card-body">
                    <h2 class="h5 mb-3">Ringkasan</h2>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Total</span>
                        <strong id="cart-total" class="fs-5"></strong>
                    </div>
                    <div id="cart-issue" class="alert alert-warning small d-none" role="alert">
                        Ada item yang habis atau melebihi stok. Perbaiki dulu sebelum checkout.
                    </div>
                    <a id="cart-checkout" href="{{ route('checkout.index') }}" class="btn btn-primary w-100">Checkout</a>
                    <a href="{{ route('menu.index') }}" class="btn btn-link w-100 mt-2">Tambah menu lain</a>
                </div>
            </div>
        </div>
    </div>

    <template id="cart-line-tpl">
        <div class="card rr-card mb-3">
            <div class="card-body">
                <div class="row align-items-center g-3">
                    <div class="col-auto">
                        <img class="rr-cart-img" width="80" height="80" loading="lazy" decoding="async" alt="">
                    </div>
                    <div class="col">
                        <h2 class="h6 mb-1" data-name></h2>
                        <small class="text-secondary" data-price></small>
                        <p class="text-danger small mb-0 d-none" data-warning></p>
                    </div>
                    <div class="col-12 col-md-auto">
                        <div class="input-group rr-qty">
                            <button type="button" class="btn btn-outline-dark" data-action="minus" aria-label="Kurangi jumlah">&minus;</button>
                            <input type="number" class="form-control text-center" min="1" inputmode="numeric" data-qty>
                            <button type="button" class="btn btn-outline-dark" data-action="plus" aria-label="Tambah jumlah">+</button>
                        </div>
                    </div>
                    <div class="col-6 col-md-2 text-md-end fw-semibold" data-subtotal></div>
                    <div class="col-6 col-md-auto text-end">
                        <button type="button" class="btn btn-outline-danger btn-sm" data-action="remove">Hapus</button>
                    </div>
                </div>
            </div>
        </div>
    </template>
</div>
@endsection
