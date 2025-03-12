<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\PatientReportController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\SlotController;
use App\Http\Controllers\SpecialityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/roleuser', function (Request $request) {
        return response()->json($request->user());
    });
    // Route::post('/roleuser/{id}', function (Request $request) {
    //     return response()->json($request->user());
    // });
    Route::put('roleuser/{id}', [AuthController::class, 'update']);
});

// Route::post('/logout', [AuthController::class, 'logout']);
Route::get('/users', [UserRoleController::class, 'getAllUsers']);
Route::get('users/{id}', [UserRoleController::class, 'indivisulaUser']);
// Route::get('/users/{email}', [UserController::class, 'individualEmailUser']);

// specilality route
Route::resource('specialities', SpecialityController::class);
Route::post('specialities/{id}', [SpecialityController::class, 'update']);
// doctor api route
Route::resource('doctors', DoctorController::class);
// slot api route 
Route::post('slots', [SlotController::class, 'store']);
Route::get('slots', [SlotController::class, 'index']);
Route::get('slots/{day}', [SlotController::class, 'show']);
Route::delete('slots/{day}', [SlotController::class, 'destroy']);
// service api route 
Route::resource('services', ServiceController::class);
Route::resource('payments', PaymentController::class);
Route::resource('patient_report', PatientReportController::class);
Route::get('patient_report/{payment_id}', [PatientReportController::class, 'show']);