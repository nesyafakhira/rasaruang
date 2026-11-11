# RasaRuang — Restaurant Ordering & Management System

Aplikasi pemesanan makanan dan manajemen operasional restoran (Laravel + Bootstrap 5).

## Menjalankan project
    composer install
    npm install
    cp .env.example .env
    php artisan key:generate
    npm run dev          # terminal 1
    php artisan serve    # terminal 2

## Progres frontend 
- [x] Design system (SCSS tokens, komponen dasar)
- [x] Layout, navbar, footer
- [x] Homepage
- [x] Menu Catalog (search + filter)
- [x] Menu Detail
- [x] RasaMatch
- [x] Login / Register (validasi form, mode demo)
- [x] Shopping Cart
- [x] Checkout (dine-in / takeaway)
- [ ] Order Success / Tracking / History
- [ ] Customer Profile
- [ ] Internal dashboards (Admin, Manager, Cashier, Kitchen)

Catatan: form Login, Register, dan Checkout memakai atribut `data-demo`.
Hapus atribut itu saat backend Laravel terhubung (Phase 6).
Catatan: saat ini frontend memakai dummy data (`resources/js/data/menus.js`).
