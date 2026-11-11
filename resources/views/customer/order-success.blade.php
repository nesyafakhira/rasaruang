@extends('layouts.app')

@section('title', 'Pesanan Berhasil')

@section('content')
<div class="container rr-section" data-page="order-success" data-order-id="{{ $id }}">
    <div id="os-not-found" class="alert alert-warning d-none" role="alert">
        Pesanan tidak ditemukan.
        <a href="{{ url('/orders') }}" class="alert-link">Lihat riwayat pesanan</a>.
    </div>

    <div id="os-content" class="row justify-content-center d-none">
        <div class="col-lg-6">
            <div class="card border-0 shadow text-center">
                <div class="card-body p-4">
                    <h1 class="h3">Pesanan berhasil dibuat</h1>
                    <p class="text-secondary">Tunjukkan nomor pesanan ini ke kasir.</p>
                    <p class="display-6 fw-bold text-primary" data-f="code"></p>

                    <dl class="row text-start mt-4">
                        <dt class="col-5">Jenis</dt><dd class="col-7" data-f="type"></dd>
                        <dt class="col-5">Lokasi</dt><dd class="col-7" data-f="table"></dd>
                        <dt class="col-5">Pembayaran</dt><dd class="col-7" data-f="method"></dd>
                        <dt class="col-5">Status</dt><dd class="col-7"><span class="badge" data-f="status"></span></dd>
                        <dt class="col-5">Total</dt><dd class="col-7 fw-semibold" data-f="total"></dd>
                    </dl>

                    <a id="os-tracking" class="btn btn-primary">Lihat Status</a>
                    <a href="{{ url('/menu') }}" class="btn btn-outline-dark">Pesan Lagi</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection