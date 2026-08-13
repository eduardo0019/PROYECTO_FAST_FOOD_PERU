<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'mesa_id',
        'sede',
        'guest_name',
        'phone',
        'visit_date',
        'visit_time',
        'guests',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'visit_date' => 'date:Y-m-d',
        ];
    }
}
