<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    // Get all users
    public function index()
    {
        return User::all();
    }

    // Get a user by ID
    public function show($id)
    {
        return User::findOrFail($id);
    }

    // Create a new user
    public function store(Request $request)
    {

        $request->validate([
            'username' => 'required|string|unique:users',
            'password' => 'required|string|min:8',
            // 'isAdmin' => 'boolean',
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => bcrypt($request->password),
            // 'isAdmin' => $request->is_admin ?? false,
        ]);


        return response()->json($user, 201);
    }
  
    // Update a user by ID
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'username' => 'sometimes|string|unique:users,username,' . $user->id,
            'password' => 'sometimes|string|min:8',
            'isAdmin' => 'sometimes|boolean',
        ]);

        if ($request->has('password')) {
            $request->merge(['password' => bcrypt($request->password)]);
        }

        $user->update($request->all());

        return response()->json($user);
    }

    // Delete a user by ID
    public function destroy($id)
    {
        User::destroy($id);
        return response()->json(['message' => 'User deleted successfully']);
    }
}