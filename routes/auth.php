<?php



use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\{RegisterController, LoginController};
use Inertia\Inertia;

// Rutas de autenticación
Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::post('/register', [RegisterController::class, 'store'])->name('register.store');

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login'])->name('login.submit');
Route::match(['get', 'post'], '/logout', [LoginController::class, 'logout'])->name('logout');