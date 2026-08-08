<?php

use App\Http\Controllers\MesaController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\MenuItemController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::get('/mesas', [MesaController::class, 'index']);

Route::get('/test', function () {
    return 'api funcionando';
});

Route::apiResource('reservations', ReservationController::class)
    ->only(['index', 'store', 'destroy']);
Route::apiResource('menu-items', MenuItemController::class)
    ->only(['index', 'store', 'update', 'destroy']);
Route::apiResource('inventories', InventoryController::class)
    ->only(['index', 'store', 'update', 'destroy']);
Route::apiResource('deliveries', DeliveryController::class)
    ->only(['index', 'store', 'update', 'destroy']);
