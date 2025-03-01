<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Admin;
use App\Models\Doctor;
use App\Models\Patient;
// use App\Models\Slot;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'specialty',
        'role',
        'age',
        'phone',
        'address',
        'qualification',
        'fees',
        'image',
        'user_id'
    ];

    public function doctor()
    {
        return $this->hasOne(Doctor::class);
    }

    // Relationship with the Patient model
    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

    // Relationship with the Admin model
    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    // public function slots()
    // {
    //     return $this->hasMany(Slot::class);
    // }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
