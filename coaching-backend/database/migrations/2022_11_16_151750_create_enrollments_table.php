<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("student_id")->constrained()->onDelete("cascade");
            $table->foreignId("course_id")->constrained()->onDelete("cascade");
            $table->boolean("was_discounted")->default('0');
            $table->string("discount_coupon")->nullable();
            $table->float("price_paid");
            $table->text("payment_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('enrollments');
    }
};
