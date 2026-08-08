<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index() { return MenuItem::orderBy('category')->orderBy('name')->get(); }

    public function store(Request $request)
    {
        return response()->json(MenuItem::create($this->validated($request)), 201);
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $menuItem->update($this->validated($request));
        return $menuItem;
    }

    public function destroy(MenuItem $menuItem)
    {
        $menuItem->delete();
        return response()->noContent();
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'category' => ['required', 'string', 'max:60'],
            'name' => ['required', 'string', 'max:120'],
            'description' => ['required', 'string', 'max:500'],
            'price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'string', 'max:180'],
            'available' => ['sometimes', 'boolean'],
        ]);
    }
}
