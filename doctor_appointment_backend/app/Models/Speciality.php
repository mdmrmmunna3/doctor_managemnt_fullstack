<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Service;

class Speciality extends Model
{
    use HasFactory, HasApiTokens;

    protected $fillable = ['name', 'image'];

    public function services()
    {
        return $this->belongsToMany(Service::class);
    }
}
