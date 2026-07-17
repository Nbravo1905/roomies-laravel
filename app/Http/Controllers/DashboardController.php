<?php

namespace App\Http\Controllers;

use App\Models\CreditTransaction;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Space;
use App\Models\User;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        
        // 1. Métricas reales para los KPIs del Administrador
        $totalReservations = Reservation::count();
        $activeUsersCount = User::where('is_admin', false)->count();
        
        // Suma de créditos consumidos este mes (valores negativos en las reservas)
        $creditsSpentThisMonth = abs(CreditTransaction::where('amount', '<', 0)
            ->where('created_at', '>=', Carbon::now()->startOfMonth())
            ->sum('amount'));

        // Tasa de ocupación diaria
        $spacesCount = Space::where('is_active', true)->count();
        $activeReservationsToday = Reservation::where('status', 'confirmed')
            ->whereDate('started_at', Carbon::today())
            ->count();
        
        $occupancyRate = $spacesCount > 0 
            ? round(($activeReservationsToday / $spacesCount) * 100) . '%' 
            : '0%';

        // 2. Historial de las últimas 5 reservas del Coworking
        $recentReservations = Reservation::with(['user', 'space'])
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($reservation) {
                return [
                    'id' => $reservation->id,
                    'user' => $reservation->user->name,
                    'space' => $reservation->space->name,
                    'time' => $reservation->started_at->format('d M, h:i A') . ' - ' . $reservation->ended_at->format('h:i A'),
                    'credits' => $reservation->credits_used,
                    'status' => $reservation->status,
                ];
            });

        // Renderiza el Dashboard pasando los datos puros del panel
        return Inertia::render('dashboard', [
            'stats' => [
                'totalReservations' => $totalReservations,
                'activeUsers' => $activeUsersCount,
                'creditsSpentThisMonth' => $creditsSpentThisMonth,
                'occupancyRate' => $occupancyRate,
            ],
            'recentReservations' => $recentReservations,
        ]);
    }
}
