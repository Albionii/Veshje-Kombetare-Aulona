<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

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
            'foto_paths' => 'nullable|array',
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
            'foto_paths' => $request->foto_paths,
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
        ]);
  
        return response()->json($client);
    }

    // Update a client by ID
    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $request->validate([
            'last_name' => 'sometimes|string',
            'first_name' => 'sometimes|string',
            'numri_telefonit' => 'sometimes|string',
            'modeli_veshjes' => 'sometimes|string',
            'cmimi' => 'sometimes|string',
            'kapare' => 'sometimes|string',
            'data_porosise' => 'sometimes|date',
            'data_marrjes' => 'sometimes|date',
            'foto_paths' => 'sometimes|array',
            'shenim' => 'sometimes|string',
            'krahet' => 'sometimes|string', // New field
            'gjoksi' => 'sometimes|string', // New field
            'beli' => 'sometimes|string', // New field
            'kollani' => 'sometimes|string', // New field
            'kukat' => 'sometimes|string', // New field
            'gjatesia_kemishes' => 'sometimes|string', // New field
            'gjatesia_fistonit' => 'sometimes|string', // New field
            'gjatesia_menges' => 'sometimes|string', // New field
            'numri_kembes' => 'sometimes|string', // New field
            'gjatesia_kembes' => 'sometimes|string', // New field
            'pulpi' => 'sometimes|string', // New field
        ]);

        $client->update($request->all());

        return response()->json($client);
    }

    // Delete a client by ID
    public function destroy($id)
    {
        Client::destroy($id);
        return response()->json(['message' => 'Client deleted successfully']);
    }
}
