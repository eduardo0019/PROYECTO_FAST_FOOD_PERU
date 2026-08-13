<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('reservations', 'sede')) {
            Schema::table('reservations', function (Blueprint $table) {
                $table->string('sede', 80)->default('Sede no especificada')->after('mesa_id');
            });
        }

        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['mesa_id']);
            $table->dropUnique('reservations_table_schedule_unique');
            $table->index('mesa_id', 'reservations_mesa_id_index');
            $table->unique(['sede', 'mesa_id', 'visit_date', 'visit_time'], 'reservations_branch_table_schedule_unique');
            $table->unique('phone', 'reservations_phone_unique');
            $table->foreign('mesa_id')->references('idmesa')->on('mesa')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign(['mesa_id']);
            $table->dropUnique('reservations_branch_table_schedule_unique');
            $table->dropUnique('reservations_phone_unique');
            $table->dropIndex('reservations_mesa_id_index');
            $table->unique(['mesa_id', 'visit_date', 'visit_time'], 'reservations_table_schedule_unique');
            $table->foreign('mesa_id')->references('idmesa')->on('mesa')->nullOnDelete();
            $table->dropColumn('sede');
        });
    }
};
