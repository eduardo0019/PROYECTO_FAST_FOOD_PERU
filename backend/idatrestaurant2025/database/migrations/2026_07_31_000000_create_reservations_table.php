<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->integer('mesa_id')->nullable();
            $table->string('guest_name', 120);
            $table->string('phone', 30);
            $table->date('visit_date');
            $table->time('visit_time');
            $table->unsignedTinyInteger('guests');
            $table->string('status', 30)->default('Pendiente');
            $table->timestamps();

            $table->foreign('mesa_id')->references('idmesa')->on('mesa')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
