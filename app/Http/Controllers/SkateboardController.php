<?php

namespace App\Http\Controllers;

use App\Models\Skateboard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkateboardController extends Controller
{

    // Afficher un skateboard spécifique
    public function show()
    {
        //
    }

    public function create()
    {
        return Inertia::render('Homepage/ProductGrid/Components/Skateboards/Create');
    }

    public function store(Request $request)
    {
        // Validation des données
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric|min:0',
        ]);

        // Sauvegarder l'image dans storage/app/public/images/
        $imagePath = $request->file('image')->store('images', 'public');

        // Ajouter en base de données
        Skateboard::create([
            'name' => $validated['name'],
            'image' => $imagePath,
            'price' => $validated['price'],
        ]);

        // Rediriger avec un message
        return redirect()->route('skateboards.index')->with('success', 'Skateboard ajouté avec succès!');
    }

    // Mettre à jour un skateboard existant
    public function update(Request $request, $id)
    {
        $skateboard = Skateboard::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'price' => 'required|numeric',
        ]);

        $skateboard->update($validated);
        return redirect()->route('skateboards.index');
    }

    // Supprimer un skateboard
    public function destroy($id)
    {
        $skateboard = Skateboard::findOrFail($id);
        $skateboard->delete();
        return redirect()->route('skateboards.index');
    }
}