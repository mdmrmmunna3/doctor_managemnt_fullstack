<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);

// Secure routes with authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', function (Request $request) {
        return response()->json($request->user());
    });
});