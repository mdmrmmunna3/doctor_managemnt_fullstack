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
        foreach ($payments as $payment) {
            $payment->basic_info = json_decode($payment->basic_info, true); // Decode the JSON string into an array
            $payment->selected_date_time = json_decode($payment->selected_date_time, true);
            $payment->selected_service = json_decode($payment->selected_service, true);
        }
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
            'expiryDate' => 'required|date_format:m/Y',
            'cvv' => 'required|string|size:3',
            'booking_id' => 'nullable|integer',
            'basicInfo' => 'required|array',
            'selectedDateTime' => 'required|array',
            'selectedService' => 'required|array',
            'totalCost' => 'required|numeric',
            'paymentStatus' => 'nullable|string',
        ]);

        // Extract the data from the request
        $data = $request->all();

        // Create new Payment record
        $payment = new Payment();
        $payment->card_holder = $data['cardHolder'];
        $payment->card_number = $data['cardNumber'];
        $payment->expiry_date = $data['expiryDate'];
        $payment->cvv = $data['cvv'];

        // Store the data as JSON
        $payment->basic_info = json_encode($data['basicInfo']); // JSON encoding
        $payment->selected_date_time = json_encode($data['selectedDateTime']); // JSON encoding
        $payment->selected_service = json_encode($data['selectedService']); // JSON encoding

        $payment->total_cost = $data['totalCost'];
        $payment->payment_status = $data['paymentStatus'] ?? 'pending';

        // Save payment to the database
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
