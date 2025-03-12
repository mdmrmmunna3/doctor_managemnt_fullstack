<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class PatientReport extends Model
{
    use HasFactory, HasApiTokens;
    protected $table = 'patient_reports';
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'age',
        'phone',
        'address',
        'payment_id',
        'vitals',
        'medicalHistory',
        'criticalIssues',
        'laboratoryTests',
        'diagnostics',
        'followUp',
        'medications',
        'dosageInstructions',
        'doctorNotes',
    ];
    protected $casts = [
        'vitals' => 'array', // Automatically cast JSON to an array
    ];
}
