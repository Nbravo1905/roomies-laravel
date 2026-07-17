<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            
            // Relación con el usuario que reserva
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Relación con el espacio físico reservado
            $table->foreignId('space_id')->constrained()->cascadeOnDelete();

            $table->dateTime('started_at');
            $table->dateTime('ended_at');
            $table->integer('credits_used'); // Respaldamos los créditos cobrados en ese momento
            $table->string('status')->default('confirmed'); // 'confirmed', 'cancelled'
            $table->text('notes')->nullable();
            $table->timestamps();

            // Este índice compuesto acelera drásticamente la verificación de solapamientos de horas
            $table->index(['space_id', 'started_at', 'ended_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
