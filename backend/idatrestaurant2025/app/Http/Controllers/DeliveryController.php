<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function index() { return Delivery::latest()->get(); }

    public function store(Request $request) { return response()->json(Delivery::create($this->validated($request)), 201); }

    public function update(Request $request, Delivery $delivery)
    {
        $delivery->update($this->validated($request));
        return $delivery;
    }

    public function destroy(Delivery $delivery) { $delivery->delete(); return response()->noContent(); }

    private function validated(Request $request): array
    {
        return $request->validate([
            'customer_name' => ['required', 'string', 'max:120'],
            'order_reference' => ['required', 'string', 'max:80'],
            'district' => ['required', 'string', 'max:120'],
            'status' => ['required', 'string', 'max:40'],
        ]);
    }
}
