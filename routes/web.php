<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'customer.home')->name('home');
Route::view('/menu', 'customer.menu')->name('menu.index');
Route::view('/menu/{id}', 'customer.menu-detail')->whereNumber('id')->name('menu.show');
Route::view('/rasamatch', 'customer.rasamatch')->name('rasamatch');
Route::view('/login', 'auth.login')->name('login');
Route::view('/register', 'auth.register')->name('register');
Route::view('/cart', 'customer.cart')->name('cart.index');
Route::view('/checkout', 'customer.checkout')->name('checkout.index');
Route::view('/order/success/{id}', 'customer.order-success')->whereNumber('id')->name('orders.success');
