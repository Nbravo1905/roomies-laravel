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
        Schema::create('credit_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // Nullable porque una recarga de saldo no tiene una reserva asociada
            $table->foreignId('reservation_id')->nullable()->constrained()->nullOnDelete();

            $table->integer('amount'); // Positivo para recargas, negativo para consumos (ej. -4)
            $table->string('description'); // Ej: "Reserva Sala de Juntas B" o "Recarga Mensual"
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_transactions');
    }
};
