<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\NewsController;
use App\Http\Controllers\Api\v1\UserPreferenceController;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Log as FacadesLog;

Route::get('/', function () {
    return response()->json([
        'status' => 'ok',
    ]);
})->name('api.v1.health');

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    FacadesLog::info('Protected routes are being accessed');

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/preferences', [UserPreferenceController::class, 'show']);
    Route::post('/preferences', [UserPreferenceController::class, 'update']);
    Route::get('/news', [NewsController::class, 'index']);
});
