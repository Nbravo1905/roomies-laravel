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
        Schema::create('spaces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // 'desk' (escritorio), 'meeting_room' (sala de juntas), 'phone_booth' (cabina)
            $table->text('description')->nullable();
            $table->integer('capacity');
            $table->integer('credit_rate_per_hour')->default(1); // Costo por hora en créditos
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Indexamos el tipo de espacio para optimizar filtros de búsqueda rápidos
            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('spaces');
    }
};
