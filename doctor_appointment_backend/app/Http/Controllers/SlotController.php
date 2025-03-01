<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Slot;
// use App\Models\User;
use Illuminate\Http\Request;

class SlotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index($doctorId)
    // {
    //     $doctor = User::findOrFail($doctorId);

    //     $slots = $doctor->slots()->where('is_booked', false)->get();

    //     return response()->json($slots);
    // }

    public function index()
    {
        // $slots = Doctor::with('slots')->get();
        $slots = Slot::get();

        return response()->json($slots);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'doctor_id' => 'nullable|integer',
                'day' => 'required|string',
                'start_time' => 'required|date_format:H:i',
                'end_time' => 'required|date_format:H:i',
                'interval' => 'required|string',
                'duration' => 'required|string',
                'space' => 'required|string',
                'appointment_fee' => 'required|numeric',
            ]);

            $slot = Slot::create($validated);
            return response()->json($slot, 201);
        } catch (\Exception $e) {
            \Log::error('Error saving slot: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to save slot'], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($day)
    {
        $slots = Slot::where('day', $day)->get();

        return response()->json($slots);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Slot $slot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Slot $slot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($day)
    {
        try {
            // Delete all slots for the given day
            Slot::where('day', $day)->delete();

            return response()->json(['message' => 'All slots for this day have been deleted.'], 200);
        } catch (\Exception $e) {
            \Log::error('Error deleting slots: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete slots'], 500);
        }
    }
}
