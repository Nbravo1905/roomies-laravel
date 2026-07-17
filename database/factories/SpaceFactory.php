<?php

namespace Database\Factories;

use App\Models\Space;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Space>
 */
class SpaceFactory extends Factory
{
    protected $model = Space::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Tipos de espacio soportados por nuestro componente frontend
        $types = ['desk', 'meeting_room', 'phone_booth'];
        $type = $this->faker->randomElement($types);

        // Ajustamos la capacidad y el precio estimado en créditos según el tipo de espacio
        $capacity = match ($type) {
            'desk' => 1,
            'phone_booth' => 1,
            'meeting_room' => $this->faker->numberBetween(4, 12),
        };
        $creditRate = match ($type) {
            'phone_booth' => 1,
            'desk' => 2,
            'meeting_room' => 4,
        };


        return [
            'name' => match ($type) {
                'phone_booth' => 'Cabina Privada ' . $this->faker->unique()->firstName,
                'desk' => 'Escritorio Flexible ' . $this->faker->unique()->numberBetween(10, 99),
                'meeting_room' => 'Sala de Juntas ' . $this->faker->unique()->colorName,
            },
            'type' => $type,
            'description' => match ($type) {
                'phone_booth' => 'Espacio totalmente insonorizado ideal para llamadas de enfoque, reuniones virtuales rápidas o grabaciones.',
                'desk' => 'Espacio de trabajo ergonómico en área abierta común con acceso a internet de alta velocidad.',
                'meeting_room' => 'Equipada con pantalla inteligente, tablero de cristal templado y sistema de videoconferencia avanzado.',
            },
            'capacity' => $capacity,
            'credit_rate_per_hour' => $creditRate,
            'is_active' => true,
        ];
    }
}
