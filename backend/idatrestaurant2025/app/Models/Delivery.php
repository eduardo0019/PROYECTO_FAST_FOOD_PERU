<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    protected $fillable = ['customer_name', 'order_reference', 'district', 'status'];
}
