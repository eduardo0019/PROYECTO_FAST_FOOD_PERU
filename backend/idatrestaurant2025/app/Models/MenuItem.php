<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = ['category', 'name', 'description', 'price', 'image', 'available'];

    protected function casts(): array
    {
        return ['price' => 'decimal:2', 'available' => 'boolean'];
    }
}
