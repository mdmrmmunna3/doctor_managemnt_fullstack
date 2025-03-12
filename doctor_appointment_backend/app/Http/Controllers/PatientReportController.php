<?php

namespace App\Http\Controllers;

use App\Models\PatientReport;
use Illuminate\Http\Request;

class PatientReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patientReport = PatientReport::all();
        foreach ($patientReport as $patientRep) {
            $patientRep->vitals = json_decode($patientRep->vitals, true);
        }
        return response()->json($patientReport);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'user_id' => 'nullable|integer',
            'name' => 'required|string',
            'email' => 'required|email',
            'age' => 'required|integer',
            'phone' => 'nullable|string',
            'address' => 'nullable|string',
            'payment_id' => 'nullable|integer',
            'vitals' => 'required|array',  // Ensure 'vitals' is required
            'medicalHistory' => 'nullable|string',
            'criticalIssues' => 'nullable|string',
            'laboratoryTests' => 'nullable|string',
            'diagnostics' => 'nullable|string',
            'followUp' => 'nullable|string',
            'medications' => 'nullable|string',
            'dosageInstructions' => 'nullable|string',
            'doctorNotes' => 'nullable|string',
        ]);

        // Check if the 'vitals' array is populated correctly
        if (empty($validated['vitals'])) {
            return response()->json(['error' => 'Vitals data is required.'], 400);
        }

        // Proceed with storing the data
        try {
            $patientReport = PatientReport::create([
                'user_id' => $validated['user_id'],
                'name' => $validated['name'],
                'email' => $validated['email'],
                'age' => $validated['age'],
                'phone' => $validated['phone'],
                'address' => $validated['address'],
                'payment_id' => $validated['payment_id'],
                'vitals' => json_encode($validated['vitals']),  // Store as JSON
                'medicalHistory' => $validated['medicalHistory'],
                'criticalIssues' => $validated['criticalIssues'],
                'laboratoryTests' => $validated['laboratoryTests'],
                'diagnostics' => $validated['diagnostics'],
                'followUp' => $validated['followUp'],
                'medications' => $validated['medications'],
                'dosageInstructions' => $validated['dosageInstructions'],
                'doctorNotes' => $validated['doctorNotes'],
            ]);

            return response()->json(['message' => 'Report saved successfully!', 'report' => $patientReport], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to save report: ' . $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($payment_id)
    {
        $patientReport = PatientReport::where('payment_id', $payment_id)->first();

        if (!$patientReport) {
            return response()->json(['error' => 'Patient report not found'], 404);
        }
        if ($patientReport->vitals) {
            $patientReport->vitals = json_decode($patientReport->vitals, true);
        } else {
            $patientReport->vitals = null;
        }
        return response()->json([
            'report' => $patientReport,
            'payment_id' => $payment_id,
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PatientReport $patientReport)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PatientReport $patientReport)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PatientReport $patientReport)
    {
        //
    }
}
