<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'space_id',
        'started_at',
        'ended_at',
        'credits_used',
        'status',
        'notes',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'credits_used' => 'integer',
    ];

    /**
     * El usuario que realizó la reserva.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * El espacio físico reservado.
     */
    public function space(): BelongsTo
    {
        return $this->belongsTo(Space::class);
    }

    /**
     * La transacción de créditos que se originó a partir de esta reserva.
     */
    public function creditTransaction(): HasOne
    {
        return $this->hasOne(CreditTransaction::class);
    }

    /**
     * Query Scope para filtrar reservas activas que se solapen con un rango de tiempo.
     * Esto evita la doble reserva de un mismo espacio físico.
     * @param int $spaceId
     * @param mixed $start
     * @param mixed $end
     */
    public function scopeOverlapping(Builder $query, $spaceId, $start, $end): Builder
    {
        return $query->where('space_id', $spaceId)
            ->where('status', '!=', 'cancelled')
            ->where(function ($q) use ($start, $end) {
                $q->where('started_at', '<', $end)
                  ->where('ended_at', '>', $start);
            });
    }
}
