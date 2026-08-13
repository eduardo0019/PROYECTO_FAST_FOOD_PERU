<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Mesa;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function index()
    {
        return Reservation::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'mesa_id' => ['required', 'integer', 'exists:mesa,idmesa'],
            'sede' => ['required', 'string', 'max:80'],
            'guest_name' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'string', 'max:30'],
            'visit_date' => ['required', 'date'],
            'visit_time' => ['required', 'date_format:H:i'],
            'guests' => ['required', 'integer', 'min:1', 'max:14'],
        ]);

        if ($data['visit_time'] < '10:00' || $data['visit_time'] > '23:00') {
            throw ValidationException::withMessages([
                'visit_time' => 'El horario de reserva debe estar entre las 10:00 y las 23:00.',
            ]);
        }

        $mesa = Mesa::findOrFail($data['mesa_id']);
        if ($data['guests'] > $mesa->cantidadsillas) {
            throw ValidationException::withMessages([
                'guests' => "La mesa seleccionada solo tiene {$mesa->cantidadsillas} sillas.",
            ]);
        }

        if (Reservation::where('mesa_id', $data['mesa_id'])
            ->where('sede', $data['sede'])
            ->where('visit_date', $data['visit_date'])
            ->where('visit_time', $data['visit_time'])
            ->exists()) {
            throw ValidationException::withMessages([
                'mesa_id' => 'Esta mesa ya se encuentra reservada para la fecha y hora seleccionadas.',
            ]);
        }

        if (Reservation::where('phone', $data['phone'])->exists()) {
            throw ValidationException::withMessages([
                'phone' => 'Solo se permite una reserva por cliente. Este numero ya tiene una reserva registrada.',
            ]);
        }

        $data['status'] = 'Pendiente';
        $reservation = Reservation::create($data);

        return response()->json($reservation, 201);
    }

    public function destroy(Reservation $reservation)
    {
        $reservation->delete();

        return response()->noContent();
    }
}
