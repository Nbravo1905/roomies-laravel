<?php

namespace Database\Seeders;

use App\Models\CreditTransaction;
use App\Models\Space;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // 1. Crear tu usuario de prueba para iniciar sesión
        $user = User::factory()->create([
            'name' => 'Nino Andrés Bravo',
            'email' => 'nino@test.com',
            'password' => Hash::make('password'), // Contraseña fácil para pruebas
            'is_admin' => true,
        ]);

        // 2. Asignarle un saldo inicial de créditos (Ejemplo: 100 créditos para reservar)
        CreditTransaction::create([
            'user_id' => $user->id,
            'amount' => 100,
            'description' => 'Carga inicial de bienvenida',
        ]);

        // También creamos un par de usuarios más aleatorios para simular comunidad
        User::factory(5)->create()->each(function ($otherUser) {
            CreditTransaction::create([
                'user_id' => $otherUser->id,
                'amount' => 50,
                'description' => 'Carga mensual base',
            ]);
        });

        // 3. Generar 9 espacios de coworking utilizando el SpaceFactory que creamos arriba
        Space::factory()->createMany([
            ['type' => 'phone_booth'],
            ['type' => 'phone_booth'],
            ['type' => 'phone_booth'],
            ['type' => 'desk'],
            ['type' => 'desk'],
            ['type' => 'desk'],
            ['type' => 'meeting_room'],
            ['type' => 'meeting_room'],
            ['type' => 'meeting_room'],
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }
}
