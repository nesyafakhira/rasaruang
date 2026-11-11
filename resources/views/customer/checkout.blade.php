@extends('layouts.app')

@section('title', 'Checkout')

@section('content')
<div class="container rr-section" data-page="checkout">
    <h1 class="h2 mb-4">Checkout</h1>

    <div id="co-empty" class="text-center py-5 d-none">
        <p class="text-secondary">Tidak ada item untuk di-checkout.</p>
        <a href="{{ route('menu.index') }}" class="btn btn-primary">Lihat Menu</a>
    </div>

    <form id="checkout-form" class="row g-4 d-none" data-demo method="POST" action="{{ url('/checkout') }}" novalidate>
        @csrf

        <div class="col-lg-7">
            <fieldset class="mb-4">
                <legend class="h5">Jenis pesanan</legend>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="order_type" id="type-dine_in" value="dine_in" checked>
                    <label class="form-check-label" for="type-dine_in">Dine-in (makan di tempat)</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="order_type" id="type-takeaway" value="takeaway">
                    <label class="form-check-label" for="type-takeaway">Takeaway (bawa pulang)</label>
                </div>
            </fieldset>

            <div id="table-group" class="mb-4">
                <label for="table_id" class="form-label">Pilih meja</label>
                <select id="table_id" name="table_id" class="form-select" aria-describedby="table_id-error">
                    <option value="">-- Pilih meja --</option>
                </select>
                <div id="table_id-error" class="invalid-feedback"></div>
            </div>

            <fieldset class="mb-4">
                <legend class="h5">Metode pembayaran</legend>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment_method" id="payment-cash_on_counter" value="cash_on_counter" checked>
                    <label class="form-check-label" for="payment-cash_on_counter">Cash on Counter (bayar di kasir)</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment_method" id="payment-cash_at_table" value="cash_at_table">
                    <label class="form-check-label" for="payment-cash_at_table">Cash at Table (bayar di meja)</label>
                </div>
                <small id="pay-hint" class="text-secondary"></small>
            </fieldset>

            <div class="mb-4">
                <label for="notes" class="form-label">Catatan (opsional)</label>
                <textarea id="notes" name="notes" class="form-control" rows="3" maxlength="200"
                          aria-describedby="notes-error"></textarea>
                <div id="notes-error" class="invalid-feedback"></div>
            </div>
        </div>

        <div class="col-lg-5">
            <div class="card border-0 shadow rr-sticky-summary">
                <div class="card-body">
                    <h2 class="h5 mb-3">Ringkasan pesanan</h2>
                    <ul id="co-lines" class="list-unstyled"></ul>
                    <hr>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Total</span>
                        <strong id="co-total" class="fs-5"></strong>
                    </div>
                    <div id="co-issue" class="alert alert-warning small d-none" role="alert">
                        Ada item yang bermasalah. <a href="{{ route('cart.index') }}" class="alert-link">Perbaiki di keranjang</a>.
                    </div>
                    <button id="co-submit" type="submit" class="btn btn-primary w-100">Buat Pesanan</button>
                </div>
            </div>
        </div>
    </form>
</div>
@endsection