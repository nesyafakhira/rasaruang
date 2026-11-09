@extends('layouts.app')

@section('title', 'Masuk')

@section('content')
<div class="container rr-section" data-page="auth">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5">
            <div class="card border-0 shadow">
                <div class="card-body p-4">
                    <h1 class="h3 mb-1">Masuk</h1>
                    <p class="text-secondary mb-4">Masuk untuk melanjutkan pemesanan.</p>

                    <div id="form-status" class="alert alert-info d-none" role="status"></div>

                    <form id="auth-form" data-mode="login" data-demo method="POST" action="{{ url('/login') }}" novalidate>
                        @csrf
                        <x-form-field name="email" label="Email" type="email" autocomplete="email" maxlength="150" />
                        <x-form-field name="password" label="Password" type="password"
                                      autocomplete="current-password" maxlength="72" :toggle="true" />
                        <button type="submit" class="btn btn-primary w-100">Masuk</button>
                    </form>

                    <p class="text-center text-secondary mt-3 mb-0">
                        Belum punya akun? <a href="{{ url('/register') }}">Daftar</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
