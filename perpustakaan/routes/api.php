<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\MemberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Resource routes
Route::apiResource('/members', MemberController::class);
Route::apiResource('/books', BookController::class);
Route::apiResource('/loans', LoanController::class);

// Custom route for returning book
Route::post('/loans/{id}/return', [LoanController::class, 'returnBook']);