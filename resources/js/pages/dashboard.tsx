import React from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface DashboardProps {
    stats: {
        totalReservations: number;
        activeUsers: number;
        creditsSpentThisMonth: number;
        occupancyRate: string;
    };
    recentReservations: Array<{
        id: number;
        user: string;
        space: string;
        time: string;
        credits: number;
        status: 'confirmed' | 'cancelled' | 'pending';
    }>;
}
export default function Dashboard({ stats, recentReservations }: DashboardProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
            <Head title="Panel de Administración - Spotly" />

            {/* BARRA DE NAVEGACIÓN SUPERIOR */}
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center transition-colors">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                        Roomies
                    </span>
                </div>
                
                {/* <Badge variant="outline" className="font-semibold text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10">
                    Modo Administrador Activo
                </Badge> */}
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* ENCABEZADO PRINCIPAL */}
                <div className="mb-10">
                    <h1 className="text-4xl tracking-tight font-extrabold text-zinc-900 dark:text-white">
                        Panel de Control General
                    </h1>
                    <p className="mt-2 text-zinc-500 dark:text-zinc-400 text-base">
                        Métricas globales de consumo de créditos, flujo de usuarios y actividad de reservas.
                    </p>
                </div>

                {/* TARJETAS DE ESTADÍSTICAS (Métricas Reales) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Reservas Totales
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                                {stats.totalReservations}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Miembros Activos
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-zinc-900 dark:text-white mt-1">
                                {stats.activeUsers}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Créditos Usados (Mes)
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                {stats.creditsSpentThisMonth} cr
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                        <CardHeader className="p-6 pb-2">
                            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                Tasa de Ocupación
                            </CardDescription>
                            <CardTitle className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                                {stats.occupancyRate}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>

                {/* TABLA / LISTADO DE ACTIVIDAD RECIENTE */}
                <Card className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/40">
                    <CardHeader className="p-6">
                        <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">
                            Flujo de Reservas Recientes
                        </CardTitle>
                        <CardDescription className="text-sm text-zinc-500">
                            Historial detallado de las últimas interacciones del sistema.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-6">
                        <div className="space-y-4">
                            {recentReservations.length === 0 ? (
                                <p className="text-sm text-zinc-500 text-center py-4">No hay actividad registrada en la base de datos.</p>
                            ) : (
                                recentReservations.map((res, index) => (
                                    <div key={res.id}>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                                    {res.user}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    Espacio asignado: <strong className="text-zinc-700 dark:text-zinc-300">{res.space}</strong>
                                                </span>
                                                <span className="text-xs text-zinc-400 mt-0.5">{res.time}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 justify-between sm:justify-end">
                                                <Badge variant="outline" className="text-xs font-bold text-indigo-500 border-indigo-500/20 bg-indigo-500/5">
                                                    {res.credits} cr
                                                </Badge>
                                                <Badge 
                                                    variant={res.status === 'confirmed' ? 'default' : 'destructive'}
                                                    className="capitalize text-xs font-semibold"
                                                >
                                                    {res.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                                                </Badge>
                                            </div>
                                        </div>
                                        {index < recentReservations.length - 1 && (
                                            <Separator className="mt-4 dark:bg-zinc-800" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}