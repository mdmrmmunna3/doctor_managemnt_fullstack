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
            'age' => $request->age,
            'phone' => $request->phone,
            'address' => $request->address,
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

        $token = $user->createToken('auth_token')->plainTextToken;
        $user->update(['api_token' => $token]);

        // $user->save();

        // Return the success response
        return response()->json([
            'message' => 'User registered successfully',
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

        $user = User::where('email', $request->email)
            ->where('role', $request->role)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // ✅ Check if the user's role matches the requested role
        if ($user->role !== $request->role) {
            return response()->json(['error' => 'Unauthorized: Incorrect role'], 403);
        }

                // Create new token and update user record
                $token = $user->createToken('auth_token')->plainTextToken;
                $user->update(['api_token' => $token]);        

        // Generate the token

        return response()->json([
            'message' => 'User Login successfully',
            // 'role' => $user->role,
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role 
            ]

        ], 200);
    }


    // logout 
    public function logout(Request $request)
{
    try {
        $user = $request->user();

        if ($user) {
            // You can perform any other logout logic here if needed
            $user->tokens->each(function ($token) {
                $token->delete();
            });
            return response()->json(['message' => 'Logged out successfully'], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }catch (\Exception $e) {
        \Log::error('Logout failed: ' . $e->getMessage());
        return response()->json(['error' => 'Something went wrong'], 500);
    }
}



}

