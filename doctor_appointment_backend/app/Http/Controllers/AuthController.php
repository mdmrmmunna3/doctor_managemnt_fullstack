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

        // Return the success response
        return response()->json([
            'message' => 'User registered successfully',
            'token' => $token,
            'role' => $user->role,
            'image' => $user->image
        ], 201);
    }


}

