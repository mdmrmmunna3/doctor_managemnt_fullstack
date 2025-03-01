<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Slot;

class Appointment extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = ['slot_id', 'patient_id'];
    public function slot()
    {
        return $this->belongsTo(Slot::class);
    }
}
