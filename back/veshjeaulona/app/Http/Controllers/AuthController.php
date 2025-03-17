<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    // Login method
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('username', 'password');
    
        // Check if the user exists
        $user = User::where('username', $credentials['username'])->first();
    
        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }
    
        // Generate JWT token
        $token = JWTAuth::fromUser($user);
    
        $cookie = cookie(
            'token',         // Cookie name
            $token,          // Token value
            1440,           // Expiration time in minutes (1 day)
            '/',            // Path
            null,           // Domain (null = default)
            false,          // Secure (set true if using HTTPS)
            true,           // HttpOnly (prevents JavaScript access)
            false,          // Raw (leave false)
            'Strict'        // SameSite policy
        );
    
        return response()->json(['message' => 'Login successful'])->withCookie($cookie);
    }
    

    // Logout method (Invalidate token)
      public function logout(Request $request)
      {
      
         $token = $request -> cookie("token");
         JWTAuth::setToken($token) -> invalidate(true);
          // Remove JWT cookie
          $cookie = cookie('token', '', -1, '/'); // Expire immediately

          return response()->json(['message' => 'Logout successful'])
                          ->withCookie($cookie);
      }
 

    // Check authentication status
    public function checkAuth(Request $request)
    {
        try {
            // Read token from the cookie
            $token = $request->cookie('token');
            if (!$token) {
                throw new \Exception('No token found');
            }
    
            // Authenticate user
            $user = JWTAuth::setToken($token)->authenticate();
    
            return response()->json(['message' => 'Authenticated', 'user' => $user], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Not authenticated'], Response::HTTP_UNAUTHORIZED);
        }
    }
    
}
