<?php

namespace App\Http\Controllers;

use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SpecialityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all specialities and return as JSON
        $specialities = Speciality::all();
        return response()->json($specialities, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image if exists
        ]);

        // Handle the image upload if provided
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('specialities', 'public');
        } else {
            // If no image is uploaded, set a default or null value
            $imagePath = null;
        }

        // Create new speciality
        $speciality = Speciality::create([
            'name' => $request->name,
            'image' => $imagePath, 
        ]);

        $token = $speciality->createToken('auth_token')->plainTextToken;
        $speciality->update(['api_token' => $token]);

        // return response()->json($speciality, 201); 
        return response()->json([
            'message' => 'Speciality create successfully',
            $speciality,
            'token' => $token
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Speciality $speciality)
    {
        // Return a single speciality
        return response()->json($speciality, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Speciality $speciality)
    {
        // Validate incoming request
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle the image upload if provided
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($speciality->image && Storage::exists('public/' . $speciality->image)) {
                Storage::delete('public/' . $speciality->image);
            }

            // Store the new image
            $imagePath = $request->file('image')->store('specialities', 'public');
        } else {
            $imagePath = $speciality->image; // Keep the current image if no new image is provided
        }

        // Update the speciality
        $speciality->update([
            'name' => $request->name,
            'image' => $imagePath, // Update image if changed
        ]);

        return response()->json($speciality, 200); // Return the updated speciality
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Speciality $speciality)
    {
        // Delete the image if it exists
        if ($speciality->image && Storage::exists('public/' . $speciality->image)) {
            Storage::delete('public/' . $speciality->image);
        }

        // Delete the speciality record
        $speciality->delete();

        return response()->json(['message' => 'Speciality deleted successfully'], 200);
    }
}
