<?php

use Illuminate\Support\Facades\Route;

Route::view('/', 'customer.home')->name('home');
Route::view('/menu', 'customer.menu')->name('menu.index');
