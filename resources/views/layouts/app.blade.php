<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <title>@yield('title', 'RasaRuang') · RasaRuang</title>
    <meta name="description" content="@yield('description', 'Pesan makanan favorit Anda di RasaRuang.')">
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])
</head>
<body class="d-flex flex-column min-vh-100">
    <a class="rr-skip-link btn btn-dark" href="#main">Lewati ke konten</a>

    @include('components.navbar')

    <main id="main" class="flex-grow-1">
        @yield('content')
    </main>

    @include('components.footer')
</body>
</html>
