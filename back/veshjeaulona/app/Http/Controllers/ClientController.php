<?php

namespace App\Http\Controllers;

use App\Models\Client;
// use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;


class ClientController extends Controller
{
    // Get all clients
  
    // public function index()
    // {
    //     return Client::all();
    // }

    public function index(Request $request)
{
    $userId = $this->getUserIdFromToken($request);
    return Client::where('user_id', $userId)->get();
}


    // Get a client by ID
    public function show($id)
    {
        $userId = $this->getUserIdFromToken($request);
        $client = Client::where('id', $id)->where('user_id', $userId)->firstOrFail();
        return $client;

    }

    // Create a new client
    

    public function update(Request $request, $id)
    {
        $userId = $this->getUserIdFromToken($request);
        $client = Client::where('id', $id)->where('user_id', $userId)->firstOrFail();

        $request->validate([
            'last_name' => 'sometimes|string|nullable',
            'first_name' => 'sometimes|string|nullable',
            'numri_telefonit' => 'sometimes|string|nullable',
            'modeli_veshjes' => 'sometimes|string|nullable',
            'cmimi' => 'sometimes|string|nullable',
            'kapare' => 'sometimes|string|nullable',
            'data_porosise' => 'sometimes|date|nullable',
            'data_marrjes' => 'sometimes|date|nullable',
            // 'foto_paths' => 'sometimes|array',
            'shenim' => 'sometimes|string|nullable',
            'krahet' => 'sometimes|string|nullable',   
            'gjoksi' => 'sometimes|string|nullable',  
            'beli' => 'sometimes|string|nullable',   
            'kollani' => 'sometimes|string|nullable',   
            'kukat' => 'sometimes|string|nullable',   
            'gjatesia_kemishes' => 'sometimes|string|nullable',   
            'gjatesia_fistonit' => 'sometimes|string|nullable',   
            'gjatesia_menges' => 'sometimes|string|nullable',   
            'numri_kembes' => 'sometimes|string|nullable',   
            'gjatesia_kembes' => 'sometimes|string|nullable',   
            'pulpi' => 'sometimes|string|nullable'
        ]);

        $client->update($request->all());

        return response()->json($client);
    }

    // Delete a client by ID
    public function destroy(Request $request, $id)
    {
        $userId = $this->getUserIdFromToken($request);
        $client = Client::where('id', $id)->where('user_id', $userId)->firstOrFail();


        $folderPath = storage_path("app/public/uploads/clients/{$client->id}");

        if (File::exists($folderPath)) {
            File::deleteDirectory($folderPath);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted successfully']);
    }

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
        ]);
        
        $id = $this->getUserIdFromToken($request);
        error_log("id : " . $id);

        $client = Client::create([  
            'first_name' => $request->first_name ?? null,
            'last_name' => $request->last_name ?? null,
            'numri_telefonit' => $request->numri_telefonit ?? null,
            'modeli_veshjes' => $request->modeli_veshjes ?? null,
            'cmimi' => $request->cmimi ?? null,
            'kapare' => $request->kapare ?? null,
            'data_porosise' => $request->data_porosise ?? null,
            'data_marrjes' => $request->data_marrjes ?? null,
            'foto_paths' => json_encode([]),
            'user_id' => $id, 
        ]);

        // Handle image uploads (if any)
        $uploadedPaths = [];
        if ($request->hasFile('foto')) {
            $uploadDir = "uploads/clients/{$client->id}";
            
            if (!File::exists(storage_path("app/public/{$uploadDir}"))) {
                File::makeDirectory(storage_path("app/public/{$uploadDir}"), 0755, true);
            }

            foreach ($request->file('foto') as $image) {
                $filename = Str::uuid() . '.' . $image->getClientOriginalExtension();
                $path = $image->storeAs($uploadDir, $filename, 'public');
                $uploadedPaths[] = [
                    'path' => $path,
                    'original_name' => $image->getClientOriginalName(),
                    'size' => $image->getSize(),
                ];
            }

            $client->update(['foto_paths' => json_encode($uploadedPaths)]);
        }

        return response()->json([
            'message' => 'Client created successfully',
            'client' => $client,
        ], 201);
    }



    public function getImages($clientId)
    {
        // Define the folder path based on the client ID (in the public disk)
        $folderPath = storage_path("app/public/uploads/clients/{$clientId}");

        // Check if the folder exists
        if (!File::exists($folderPath)) {
            return response()->json(['message' => 'No images found for this client.'], 404);
        }

        // Get all files in the directory
        $files = File::allFiles($folderPath);

        // Map files to their relative paths (to serve via the public URL)
        $imagePaths = array_map(function ($file) use ($clientId) {
            // Generate the file's relative path (accessible via the public URL)
            $relativePath = 'storage/uploads/clients/' . $clientId . '/' . $file->getFilename();

            // Return the relative URL to the image
            return url($relativePath);
        }, $files);

        return response()->json([
            'images' => $imagePaths
        ]);
    }

    
    
    // Serve a protected image
    public function serveImage($clientId, $filename)
    {
        $userId = $this->getUserIdFromToken($request);
        $client = Client::where('id', $clientId)->where('user_id', $userId)->firstOrFail();

        
        $path = "uploads/clients/{$clientId}/{$filename}";
        
        if (!Storage::exists($path)) {
            abort(404);
        }

        // Add any additional authorization checks here
        
        return response()->file(storage_path("app/{$path}"));
    }

    // Delete an image
    public function deleteImage($clientId, $imageId)
    {
        $userId = $this->getUserIdFromToken($request);
        $client = Client::where('id', $clientId)->where('user_id', $userId)->firstOrFail();

        $images = json_decode($client->foto_paths, true) ?? [];
        
        if (!isset($images[$imageId])) {
            abort(404);
        }

        // Delete the file
        Storage::delete($images[$imageId]['path']);
        
        // Remove from array
        array_splice($images, $imageId, 1);
        
        // Update client record
        $client->update(['foto_paths' => json_encode(array_values($images))]);
        
        return response()->json(['message' => 'Image deleted successfully']);
    }


    private function getUserIdFromToken(Request $request){
        try {
            $token = $request->cookie('token');
            if (!$token) {
                throw new \Exception('No token found');
            }
            $user = JWTAuth::setToken($token)->authenticate();
            return $user->id;
        } catch (\Exception $e) {
            \Log::error("Token error: " . $e->getMessage());
            abort(401, 'Unauthorized');
        }
    }

}
