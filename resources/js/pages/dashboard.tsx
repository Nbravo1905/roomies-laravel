import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Datos simulados para las métricas del Administrador
const MOCK_STATS = {
    totalReservations: 148,
    activeUsers: 42,
    creditsSpentThisMonth: 1250,
    occupancyRate: '78%'
};

const MOCK_RECENT_RESERVATIONS = [
    {
        id: 1,
        user: 'Nino Bravo',
        space: 'Sala de Juntas Creative',
        time: 'Hoy, 2:00 PM - 4:00 PM',
        credits: 8,
        status: 'confirmed'
    },
    {
        id: 2,
        user: 'Laura Gómez',
        space: 'Cabina Privada Alfa',
        time: 'Hoy, 4:30 PM - 5:30 PM',
        credits: 1,
        status: 'confirmed'
    },
    {
        id: 3,
        user: 'Carlos Pérez',
        space: 'Escritorio Flexible 05',
        time: 'Mañana, 9:00 AM - 1:00 PM',
        credits: 8,
        status: 'cancelled'
    }
];

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            <Head title="Admin Dashboard - Spotly" />

            {/* NAV BAR */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center transition-colors">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        SPOTLY <span className="text-xs font-normal text-zinc-500">(Admin)</span>
                    </span>
                </div>
                
                <Badge variant="outline" className="font-semibold text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10">
                    Modo Administrador
                </Badge>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* ENCABEZADO */}
                <div className="mb-10">
                    <h1 className="text-4xl tracking-tight font-extrabold text-zinc-900 dark:text-white">
                        Panel de Control
                    </h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-base">
                        Monitoreo en tiempo real de reservas, créditos y ocupación del coworking.
                    </p>
                </div>

                {/* TARJETAS DE ESTADÍSTICAS (KPIs) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Reservas Totales
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                                {MOCK_STATS.totalReservations}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Miembros Activos
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                                {MOCK_STATS.activeUsers}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Créditos Consumidos (Mes)
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                {MOCK_STATS.creditsSpentThisMonth}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Tasa de Ocupación
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                {MOCK_STATS.occupancyRate}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* ÚLTIMAS RESERVAS */}
                <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                    <CardHeader className="p-6">
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">
                            Actividad Reciente
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-500">
                            Últimas reservas solicitadas por los usuarios.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                        <div className="space-y-4">
                            {MOCK_RECENT_RESERVATIONS.map((res, index) => (
                                <div key={res.id}>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                                {res.user}
                                            </span>
                                            <span className="text-xs text-zinc-500">
                                                Reservó: <strong className="text-zinc-700 dark:text-zinc-300">{res.space}</strong>
                                            </span>
                                            <span className="text-xs text-zinc-400 mt-0.5">{res.time}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 justify-between sm:justify-end">
                                            <Badge variant="outline" className="text-xs font-bold text-indigo-500 border-indigo-500/20">
                                                {res.credits} créditos
                                            </Badge>
                                            <Badge 
                                                variant={res.status === 'confirmed' ? 'default' : 'destructive'}
                                                className="capitalize text-xs"
                                            >
                                                {res.status === 'confirmed' ? 'confirmada' : 'cancelada'}
                                            </Badge>
                                        </div>
                                    </div>
                                    {index < MOCK_RECENT_RESERVATIONS.length - 1 && (
                                        <Separator className="mt-4 dark:bg-zinc-800" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}