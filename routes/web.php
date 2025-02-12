<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SkateboardController;
use App\Models\Skateboard;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $latestSkateboards = Skateboard::latest()->take(4)->get();

    return Inertia::render('Homepage/index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'latestSkateboards' =>$latestSkateboards
    ]);
})->name('homepage');

Route::get('/create', [SkateboardController::class, 'create'])->name('skateboards.create');
Route::post('/create', [SkateboardController::class, 'store'])->name('skateboards.store');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php'; 