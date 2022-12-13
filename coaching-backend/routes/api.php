<?php

use App\Http\Controllers\AlumniController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RazorpayPaymentController;
use App\Models\Enrollment;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::delete('/user/delete/{s}',[AuthController::class,'destroy']);
Route::get('/students',[StudentController::class,"index"]);
Route::post('/students/store',[StudentController::class,"store"]);
Route::delete('/students/delete/{s}',[StudentController::class,"destroy"]);
Route::post('/students/update',[StudentController::class,"update"]);
Route::post('/courses/store',[CoursesController::class,"store"]);
Route::get('/courses',[CoursesController::class,"index"]);
Route::get('/courses/{id}',[CoursesController::class,"show"]);
Route::delete('/courses/delete/{c}',[CoursesController::class,"destroy"]);
Route::post('/courses/update/{c}',[CoursesController::class,"update"]);
Route::get("/enrollments",[EnrollmentController::class,"index"]);
Route::get("/enrollments/get-status",[EnrollmentController::class,"getStatus"]);
Route::post('/enrollments/store',[EnrollmentController::class,"store"]);
Route::get("/alumni",[AlumniController::class,"index"]);
Route::post("/alumni/store",[AlumniController::class,"store"]);
Route::get('/razorpay-payment', [RazorpayPaymentController::class, 'index']);
// Route::post('razorpay-payment', [RazorpayPaymentController::class, 'store'])->name('razorpay.payment.store');