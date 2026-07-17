<?php

namespace App\Http\Controllers;

use App\Models\Space;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SpaceAdminController extends Controller
{
    public function index()
    {
        $spaces = Space::latest()->get();

        return Inertia::render('Admin/Spaces/Index', [
            'spaces' => $spaces
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:spaces,name',
            'type' => 'required|in:desk,meeting_room,phone_booth',
            'description' => 'nullable|string',
            'capacity' => 'required|integer|min:1',
            'credit_rate_per_hour' => 'required|integer|min:0',
        ]);

        Space::create($validated);

        return redirect()->route('spaces.index')
            ->with('success', 'Espacio creado exitosamente.');
    }

    public function update(Request $request, Space $space)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:spaces,name,' . $space->id,
            'type' => 'required|in:desk,meeting_room,phone_booth',
            'description' => 'nullable|string',
            'capacity' => 'required|integer|min:1',
            'credit_rate_per_hour' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $space->update($validated);

        return redirect()->route('spaces.index')
            ->with('success', 'Espacio actualizado correctamente.');
    }
}
