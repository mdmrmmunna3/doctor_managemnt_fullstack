<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate incoming data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'age' => 'required|string|min:1',
            'phone' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'specialty' => 'nullable|string|max:255',
            'role' => 'required|in:patient,doctor,admin',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate image file
        ]);

        // Handle image upload if an image is provided
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            // If no image is uploaded, set a default or null value
            $imagePath = null;
        }

        // Proceed to create the user if validation passes
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'specialty' => $request->specialty,
            'age' => $request->age,
            'phone' => $request->phone,
            'address' => $request->address,
            'role' => $request->role,
            'image' => $imagePath,
        ]);

        // Generate API token for the user
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->update(['api_token' => $token]);

        // Return a success response
        return response()->json([
            'message' => 'User registered successfully',
            // 'role' => $user->role,  // Return the image URL if an image was uploaded
            // 'token' => $token,  // Return the generated API token
            $user,
            'token' => $token
        ], 200);
    }

    // Login functionality
    public function login(Request $request)
    {
        // Validate login credentials
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'role' => 'required|string', // Ensure role is provided
        ]);

        // Attempt to find the user with the specified email and role
        $user = User::where('email', $request->email)
            ->where('role', $request->role)
            ->first();

        // Check if the user exists and the password is correct
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Ensure the user's role matches the requested role
        if ($user->role !== $request->role) {
            return response()->json(['error' => 'Unauthorized: Incorrect role'], 403);
        }

        // Generate a new API token for the logged-in user
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->update(['api_token' => $token]);

        // Return the user details and token in the response
        return response()->json([
            'message' => 'User login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'image_url' => asset('storage/images/' . $user->image), // Include image URL if available
            ]
        ], 200);
    }

    // Logout functionality
    public function logout(Request $request)
    {
        try {
            $user = $request->user();

            // Delete the user's tokens (log them out)
            if ($user) {
                $user->tokens->each(function ($token) {
                    $token->delete();
                });
                return response()->json(['message' => 'Logged out successfully'], 200);
            }

            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (\Exception $e) {
            \Log::error('Logout failed: ' . $e->getMessage());
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }
}
