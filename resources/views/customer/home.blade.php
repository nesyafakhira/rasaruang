@extends('layouts.app')

@section('title', 'Beranda')

@section('content')
<section class="rr-hero">
    <div class="container">
        <div class="row align-items-center g-4">
            <div class="col-lg-6">
                <h1 class="display-4 fw-bold">Rasa yang pas, ruang yang hangat.</h1>
                <p class="lead text-secondary">Lihat menu, pilih sesuai selera dan anggaran, lalu pesan tanpa antre.</p>
                <a href="{{ url('/menu') }}" class="btn btn-primary btn-lg me-2">Explore Menu</a>
                <a href="{{ url('/rasamatch') }}" class="btn btn-outline-dark btn-lg">Coba RasaMatch</a>
            </div>
            <div class="col-lg-6">
                <img src="{{ asset('assets/img/hero.jpg') }}" class="img-fluid rounded-4 shadow" alt="Hidangan unggulan RasaRuang"
                     width="640" height="480" fetchpriority="high">
            </div>
        </div>
    </div>
</section>

<section class="rr-section">
    <div class="container">
        <h2 class="h3 mb-4">Kenapa RasaRuang?</h2>
        <div class="row g-4">
            @foreach ([
                ['Pesan Praktis', 'Dine-in atau takeaway, cukup dari ponsel.'],
                ['RasaMatch', 'Rekomendasi menu sesuai budget dan tingkat pedas.'],
                ['Status Real-time', 'Pantau pesanan dari dikonfirmasi sampai siap.'],
            ] as [$title, $text])
                <div class="col-md-4">
                    <div class="card rr-card h-100"><div class="card-body">
                        <h3 class="h5">{{ $title }}</h3>
                        <p class="mb-0 text-secondary">{{ $text }}</p>
                    </div></div>
                </div>
            @endforeach
        </div>
    </div>
</section>
@endsection
