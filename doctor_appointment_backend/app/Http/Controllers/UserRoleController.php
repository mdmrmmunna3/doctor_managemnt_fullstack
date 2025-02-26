<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function getAllUsers() {
        $allUsers = User::all();
        return response()->json($allUsers);
   }
}
