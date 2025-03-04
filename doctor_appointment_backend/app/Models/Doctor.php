<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Slot;
use App\Models\User;
class Doctor extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $fillable = [
        'user_id',
        'specialty',
        'qualification',
        'fees',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function slots()
    {
        return $this->hasMany(Slot::class);
    }
}
