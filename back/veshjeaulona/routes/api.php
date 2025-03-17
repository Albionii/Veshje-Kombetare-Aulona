<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::prefix('users')->group(function () {
  Route::get('/get', [UserController::class, 'index']); // Get all users
  Route::post('/create', [UserController::class, 'store']); // Create a new user
  Route::get('/get/{id}', [UserController::class, 'show']); // Get a specific user
  Route::put('/update/{id}', [UserController::class, 'update']); // Update a user
  Route::delete('/delete/{id}', [UserController::class, 'destroy']); // Delete a user
});

Route::apiResource('client', ClientController::class);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout']);
Route::get('/auth/check-auth', [AuthController::class, 'checkAuth']);

Route::get('/', function () {
  return view('welcome');
});

