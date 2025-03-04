<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Doctor;
use App\Models\Appointment;

class Slot extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'doctor_id',
        'day',
        'start_time',
        'end_time',
        'interval',
        'duration',
        'space',
        'appointment_fee',
    ];
    public function doctor()
    {
        return $this->belongsTo(Doctor::class, 'doctor_id');
    }

    public function appointment()
    {
        return $this->hasOne(Appointment::class);
    }

}
