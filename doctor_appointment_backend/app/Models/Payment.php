<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Payment extends Model
{
    use HasApiTokens, HasFactory;
    protected $table = 'payments';

    protected $casts = [
        'basic_info' => 'array', // Automatically cast JSON to an array
        'selected_date_time' => 'array', // Automatically cast JSON to an array
        'selected_service' => 'array', // Automatically cast JSON to an array
    ];
}
