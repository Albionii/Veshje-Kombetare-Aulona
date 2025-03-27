<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'last_name',
        'first_name',
        'numri_telefonit',
        'modeli_veshjes',
        'cmimi',
        'kapare',
        'data_porosise',
        'data_marrjes',
        'foto_paths',
        'shenim',
        'krahet',
        'gjoksi',
        'beli',
        'kollani',
        'kukat',
        'gjatesia_kemishes',
        'gjatesia_fistonit',
        'gjatesia_menges',
        'numri_kembes',
        'gjatesia_kembes',
        'pulpi', 
        'paguar'
    ];

    protected $casts = [
        'data_porosise' => 'date',
        'data_marrjes' => 'date',
        'foto_paths' => 'array',
        'paguar' => 'boolean'
    ];
}
