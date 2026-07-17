<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Space extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'description',
        'capacity',
        'credit_rate_per_hour',
        'is_active',
    ];

    protected $casts = [
        'capacity' => 'integer',
        'credit_rate_per_hour' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Obtiene todas las reservas asociadas a este espacio.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
