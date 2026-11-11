<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'customer.home')->name('home');
Route::view('/menu', 'customer.menu')->name('menu.index');
Route::view('/menu/{id}', 'customer.menu-detail')->whereNumber('id')->name('menu.show');
Route::view('/rasamatch', 'customer.rasamatch')->name('rasamatch');
Route::view('/login', 'auth.login')->name('login');
Route::view('/register', 'auth.register')->name('register');
