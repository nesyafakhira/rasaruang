@extends('layouts.app')

@section('title', 'Daftar')

@section('content')
<div class="container rr-section" data-page="auth">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card border-0 shadow">
                <div class="card-body p-4">
                    <h1 class="h3 mb-1">Daftar</h1>
                    <p class="text-secondary mb-4">Buat akun customer untuk mulai memesan.</p>

                    <div id="form-status" class="alert alert-info d-none" role="status"></div>

                    <form id="auth-form" data-mode="register" data-demo method="POST" action="{{ url('/register') }}" novalidate>
                        @csrf
                        <x-form-field name="name" label="Nama lengkap" autocomplete="name" maxlength="100" />
                        <x-form-field name="email" label="Email" type="email" autocomplete="email" maxlength="150" />
                        <x-form-field name="password" label="Password" type="password"
                                      autocomplete="new-password" maxlength="72" :toggle="true" />
                        <p class="form-text mt-n2 mb-3">Minimal 8 karakter, kombinasi huruf dan angka.</p>
                        <x-form-field name="password_confirmation" label="Konfirmasi password" type="password"
                                      autocomplete="new-password" maxlength="72" :toggle="true" />
                        <button type="submit" class="btn btn-primary w-100">Daftar</button>
                    </form>

                    <p class="text-center text-secondary mt-3 mb-0">
                        Sudah punya akun? <a href="{{ url('/login') }}">Masuk</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection