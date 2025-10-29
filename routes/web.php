<?php

use App\Http\Controllers\V1\Forms\ContactFormController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

Route::fallback(function () {
    return redirect('v1/formularios/contactanos');
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// FORM V1
Route::prefix('v1/formularios')->name('v1.forms.')->group(function () {
    Route::get('contactanos', [ContactFormController::class, 'index'])->name('contact-form.index');
    Route::post('contactanos', [ContactFormController::class, 'save'])->name('contact-form.save');
});

// require __DIR__.'/settings.php';
