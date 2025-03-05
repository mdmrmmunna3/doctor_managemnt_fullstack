<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->string('card_holder');
            $table->string('card_number');
            $table->string('expiry_date');
            $table->string('cvv');
            $table->integer('booking_id')->nullable();
            $table->json('basic_info'); // Store basic_info as JSON
            $table->string('appointment_type');
            $table->json('selected_date_time'); // Store selected_date_time as JSON
            $table->json('selected_service'); // Store selected_service as JSON
            $table->decimal('total_cost', 10, 2);
            $table->string('payment_status');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
}
