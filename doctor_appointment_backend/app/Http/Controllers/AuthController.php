<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'specialty' => 'string|max:255',
            'role' => 'required|in:patient,doctor,admin',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',  // Ensure image validation
        ]);

        // Proceed to create the user if no validation errors
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'specialty' => $request->specialty,
            'role' => $request->role,
        ]);

        // Handle image upload if exists
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/images', $filename);

            // Save image path to user
            $user->image = $filename;
            $user->save();
        }

        // Create an authentication token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->api_token = $token;
        $user->save();

        // Return the success response
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'role' => $user->role,
            'image' => $user->image
        ], 200);
    }

    // login 
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'role' => 'required|string', // Ensure role is provided
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // ✅ Check if the user's role matches the requested role
        if ($user->role !== $request->role) {
            return response()->json(['error' => 'Unauthorized: Incorrect role'], 403);
        }

        // Generate the token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User Login successfully',
            'token' => $token,
            'role' => $user->role,
        ], 200);
    }


    // logout 
    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            if ($user) {
                // Check if the user has a valid token
                if ($user->currentAccessToken()) {
                    $user->currentAccessToken()->delete();
                }

                return response()->json(['message' => 'Logged out successfully'], 200);
            }

            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (\Exception $e) {
            \Log::error('Logout failed: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }


}

