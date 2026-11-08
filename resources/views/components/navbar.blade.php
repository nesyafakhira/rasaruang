<nav class="navbar navbar-expand-lg bg-white shadow-sm sticky-top" aria-label="Navigasi utama">
    <div class="container">
        <a class="navbar-brand fw-bold text-primary" href="{{ url('/') }}">RasaRuang</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
                aria-controls="nav" aria-expanded="false" aria-label="Buka menu">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div id="nav" class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto">
                <li class="nav-item"><a class="nav-link {{ request()->is('/') ? 'active' : '' }}" href="{{ url('/') }}">Home</a></li>
                <li class="nav-item"><a class="nav-link {{ request()->is('menu*') ? 'active' : '' }}" href="{{ url('/menu') }}">Menu</a></li>
                <li class="nav-item"><a class="nav-link {{ request()->is('rasamatch') ? 'active' : '' }}" href="{{ url('/rasamatch') }}">RasaMatch</a></li>
            </ul>
            <div class="d-flex align-items-center gap-2">
                <a class="btn btn-outline-dark position-relative" href="{{ url('/cart') }}" aria-label="Keranjang">
                    Keranjang
                    <span id="cart-badge" class="rr-cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary d-none">0</span>
                </a>
                <a class="btn btn-primary" href="{{ url('/login') }}">Masuk</a>
            </div>
        </div>
    </div>
</nav>
