<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePatientReportsTable extends Migration
{
    public function up()
    {
        Schema::create('patient_reports', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->string('name');
            $table->string('email');
            $table->integer('age');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();
            $table->integer('payment_id')->nullable();
            $table->json('vitals');
            $table->text('medicalHistory')->nullable();
            $table->text('criticalIssues')->nullable();
            $table->text('laboratoryTests')->nullable();
            $table->text('diagnostics')->nullable();
            $table->text('followUp')->nullable();
            $table->text('medications')->nullable();
            $table->text('dosageInstructions')->nullable();
            $table->text('doctorNotes')->nullable();
            $table->timestamps();
        });

    }

    public function down()
    {
        Schema::dropIfExists('patient_reports');
    }
}
;

