<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Allow all users for now, you can change this logic later
    }

    public function rules()
    {
        return [
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
            'isAdmin' => 'required|boolean',
        ];
    }
}
