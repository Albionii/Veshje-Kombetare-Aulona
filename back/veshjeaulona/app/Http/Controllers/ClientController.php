<?php

namespace App\Http\Controllers;

use App\Models\Client;
// use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ClientController extends Controller
{
    // Get all clients
  
    public function index()
    {
        return Client::all();
    }

    // Get a client by ID
    public function show($id)
    {
        return Client::findOrFail($id);
    }

    // Create a new client
    public function store(Request $request)
    {
        $request->validate([
            'last_name' => 'nullable|string',
            'first_name' => 'nullable|string',
            'numri_telefonit' => 'nullable|string',
            'modeli_veshjes' => 'nullable|string',
            'cmimi' => 'nullable|string',
            'kapare' => 'nullable|string',
            'data_porosise' => 'nullable|date',
            'data_marrjes' => 'nullable|date',
            'foto' => 'nullable|array',
            'shenim' => 'nullable|string',
            'krahet' => 'nullable|string', // Added new field
            'gjoksi' => 'nullable|string', // Added new field
            'beli' => 'nullable|string', // Added new field
            'kollani' => 'nullable|string', // Added new field
            'kukat' => 'nullable|string', // Added new field
            'gjatesia_kemishes' => 'nullable|string', // Added new field
            'gjatesia_fistonit' => 'nullable|string', // Added new field
            'gjatesia_menges' => 'nullable|string', // Added new field
            'numri_kembes' => 'nullable|string', // Added new field
            'gjatesia_kembes' => 'nullable|string', // Added new field
            'pulpi' => 'nullable|string', // Added new field
            'paguar' => 'nullable|boolean'
        ]);
    
        $client = Client::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'numri_telefonit' => $request->numri_telefonit,
            'modeli_veshjes' => $request->modeli_veshjes,
            'cmimi' => $request->cmimi,
            'kapare' => $request->kapare,
            'data_porosise' => $request->data_porosise,
            'data_marrjes' => $request->data_marrjes,
            'shenim' => $request->shenim,
            'krahet' => $request->krahet, // New field
            'gjoksi' => $request->gjoksi, // New field
            'beli' => $request->beli, // New field
            'kollani' => $request->kollani, // New field
            'kukat' => $request->kukat, // New field
            'gjatesia_kemishes' => $request->gjatesia_kemishes, // New field
            'gjatesia_fistonit' => $request->gjatesia_fistonit, // New field
            'gjatesia_menges' => $request->gjatesia_menges, // New field
            'numri_kembes' => $request->numri_kembes, // New field
            'gjatesia_kembes' => $request->gjatesia_kembes, // New field
            'pulpi' => $request->pulpi, // New field
            'paguar' => $request -> paguar ?? false,
            'foto_paths' => json_encode([])
        ]);

        // Here I am trying to code it
        $foto = $request -> file('foto');       
        Storage::disk('local')->put("upload", $foto[0]);
        dd($foto);
        
        return response()->json($client);
    }

    // Delete a client by ID
    public function destroy($id)
    {
        Client::destroy($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }
}
