<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Speciality;

class Service extends Model
{
    use HasFactory, HasApiTokens;
    protected $fillable = ['name'];

    public function specialists()
    {
        return $this->belongsToMany(Speciality::class);
    }
}
