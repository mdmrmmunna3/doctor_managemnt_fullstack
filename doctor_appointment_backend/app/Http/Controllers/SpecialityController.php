<?php

namespace App\Http\Controllers;

use App\Models\Speciality;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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
        $request->validate(rules: [
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
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
    public function update(Request $request, $id)
    {
        \Log::info('Updating speciality:', $request->all()); // Log request data for debugging

        $request->validate([
            'name' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $speciality = Speciality::findOrFail($id);

        // Handle image upload if a new one is provided
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($speciality->image) {
                Storage::disk('public')->delete($speciality->image);
            }

            // Store new image
            $imagePath = $request->file('image')->store('specialities', 'public');
        } else {
            $imagePath = $speciality->image; // Keep existing image if no new one is uploaded
        }

        // Update the speciality
        $speciality->update([
            'name' => $request->name ?? $speciality->name,
            'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'Speciality updated successfully',
            'speciality' => $speciality,
        ], 200);
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
