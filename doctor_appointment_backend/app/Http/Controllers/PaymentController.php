<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::all();
        return response()->json($payments);
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
        // Validate the incoming request
        $validated = $request->validate([
            'cardHolder' => 'required|string|max:255',
            'cardNumber' => 'required|string|size:16',
            'expiryDate' => 'required|date_format:m/Y',      // Ensure valid expiry date format (MM/YYYY)
            'cvv' => 'required|string|size:3',
            'selectedDateTime' => 'nullable|array',
            'basicInfo' => 'nullable|array',
            'appointmentType' => 'nullable|string',
            'selectedService' => 'nullable|array',
            'totalCost' => 'required|numeric',
            'paymentStatus' => 'nullable|string',
        ]);

        // Extract the data
        $data = $request->all();

        // Create new Payment record
        $payment = new Payment();
        $payment->card_holder = $data['cardHolder'];
        $payment->card_number = $data['cardNumber'];
        $payment->expiry_date = $data['expiryDate'];
        $payment->cvv = $data['cvv'];
        $payment->selected_date_time = json_encode($data['selectedDateTime']);
        $payment->basic_info = json_encode($data['basicInfo']);
        $payment->appointment_type = $data['appointmentType'];
        $payment->selected_service = json_encode($data['selectedService']);
        $payment->total_cost = $data['totalCost'];
        $payment->payment_status = $data['paymentStatus'] ?? 'pending';  // Default to 'pending' if not provided
        $payment->save();

        // Return a success response
        return response()->json([
            'message' => 'Payment processed successfully!',
            'payment' => $payment
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
