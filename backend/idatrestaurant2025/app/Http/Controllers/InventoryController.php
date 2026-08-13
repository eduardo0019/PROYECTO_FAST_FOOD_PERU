<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index() { return Inventory::orderBy('name')->get(); }

    public function store(Request $request) { return response()->json(Inventory::create($this->validated($request)), 201); }

    public function update(Request $request, Inventory $inventory)
    {
        $inventory->update($this->validated($request));
        return $inventory;
    }

    public function destroy(Inventory $inventory) { $inventory->delete(); return response()->noContent(); }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'quantity' => ['required', 'integer', 'min:0'],
            'unit' => ['nullable', 'string', 'max:30'],
        ]);
    }
}
