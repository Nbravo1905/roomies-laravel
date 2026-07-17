import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Space {
  id: number;
  name: string;
  type: 'desk' | 'meeting_room' | 'phone_booth';
  description: string | null;
  capacity: number;
  credit_rate_per_hour: number;
  is_active: boolean;
}

interface Props {
  spaces: Space[];
}

export default function Index({ spaces }: Props) {
  // Estado para saber si estamos editando un espacio o creando uno nuevo
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Formulario unificado de Inertia
  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: '',
    type: 'desk' as Space['type'],
    description: '',
    capacity: 1,
    credit_rate_per_hour: 1,
    is_active: true,
  });

  // Efecto para rellenar el formulario cuando se presiona "Editar"
  useEffect(() => {
    if (editingSpace) {
      setData({
        name: editingSpace.name,
        type: editingSpace.type,
        description: editingSpace.description || '',
        capacity: editingSpace.capacity,
        credit_rate_per_hour: editingSpace.credit_rate_per_hour,
        is_active: editingSpace.is_active,
      });
      setShowForm(true);
    } else {
      reset();
    }
  }, [editingSpace]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSpace) {
      put(`/spaces/${editingSpace.id}`, {
        onSuccess: () => {
          setEditingSpace(null);
          setShowForm(false);
          reset();
        },
      });
    } else {
      post('/spaces', {
        onSuccess: () => {
          setShowForm(false);
          reset();
        },
      });
    }
  };

  const handleCancel = () => {
    setEditingSpace(null);
    setShowForm(false);
    reset();
  };

  const getSpaceBadge = (type: Space['type']) => {
    switch (type) {
      case 'desk': return <Badge variant="secondary">Escritorio</Badge>;
      case 'meeting_room': return <Badge variant="default" className="bg-indigo-600">Sala de Juntas</Badge>;
      case 'phone_booth': return <Badge variant="outline">Cabina Telefónica</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Head title="Admin - Gestión de Espacios" />

      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 px-6 py-4 flex justify-between items-center transition-colors">
        <div className="flex flex-col items-start gap-2">
          <span className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
            Módulo de Espacios
          </span>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Administra el inventario físico, capacidades y tarifas de créditos de tu coworking.
          </p>
        </div>

        {!showForm && (
          <Button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
          >
            Nuevo Espacio
          </Button>
        )}
      </nav>

      <div className="max-w-7xl mx-auto pt-5">

        {/* FORMULARIO DINÁMICO (CREAR / EDITAR) */}
        {showForm && (
          <Card className="mb-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 shadow-sm animate-in fade-in-50 duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                {editingSpace ? `Editar: ${editingSpace.name}` : 'Crear Nuevo Espacio de Trabajo'}
              </CardTitle>
              <CardDescription>Modifica los parámetros operativos de la locación.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nombre único del espacio</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className="mt-1"
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="type">Tipo de instalación</Label>
                    <select
                      id="type"
                      value={data.type}
                      onChange={e => setData('type', e.target.value as Space['type'])}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm mt-1 dark:bg-zinc-900"
                    >
                      <option value="desk">Escritorio Común</option>
                      <option value="meeting_room">Sala de Juntas</option>
                      <option value="phone_booth">Cabina de Enfoque</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="capacity">Capacidad máxima</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={data.capacity}
                      onChange={e => setData('capacity', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                    {errors.capacity && <p className="text-xs text-destructive mt-1 font-medium">{errors.capacity}</p>}
                  </div>

                  <div>
                    <Label htmlFor="credit_rate">Tarifa (Créditos / hr)</Label>
                    <Input
                      id="credit_rate"
                      type="number"
                      value={data.credit_rate_per_hour}
                      onChange={e => setData('credit_rate_per_hour', parseInt(e.target.value) || 0)}
                      className="mt-1"
                    />
                    {errors.credit_rate_per_hour && <p className="text-xs text-destructive mt-1 font-medium">{errors.credit_rate_per_hour}</p>}
                  </div>

                  {editingSpace && (
                    <div>
                      <Label htmlFor="is_active">Estado operativo</Label>
                      <select
                        id="is_active"
                        value={data.is_active ? 'true' : 'false'}
                        onChange={e => setData('is_active', e.target.value === 'true')}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm mt-1 dark:bg-zinc-900"
                      >
                        <option value="true">Activo / Disponible</option>
                        <option value="false">Inactivo / Mantenimiento</option>
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Descripción interna u opcional</Label>
                  <Input
                    id="description"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={processing} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold">
                    {processing ? 'Procesando...' : editingSpace ? 'Actualizar Espacio' : 'Guardar Espacio'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* LISTADO DE TARJETAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <Card key={space.id} className="border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900/30 flex flex-col justify-between shadow-sm">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <CardTitle className="text-lg font-bold tracking-tight">{space.name}</CardTitle>
                  {getSpaceBadge(space.type)}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {space.description || 'Sin especificaciones detalladas registradas.'}
                </p>
              </CardHeader>

              <CardContent className="px-6 py-0">
                <Separator className="dark:bg-zinc-800" />
                <div className="grid grid-cols-2 py-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Capacidad</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">{space.capacity} {space.capacity === 1 ? 'Persona' : 'Personas'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block">Precio por hora</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{space.credit_rate_per_hour} cr / hr</span>
                  </div>
                </div>
              </CardContent>

              <CardContent className="p-6 pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${space.is_active ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  <span className="text-xs font-medium text-zinc-500">
                    {space.is_active ? 'Activo' : 'Desactivado'}
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingSpace(space)}
                  className="text-xs font-semibold h-8"
                >
                  Editar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}