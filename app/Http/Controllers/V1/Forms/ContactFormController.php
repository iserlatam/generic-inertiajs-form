<?php

namespace App\Http\Controllers\V1\Forms;

use App\Http\Controllers\Controller;
use App\Models\ContactForm;
use App\Models\Lead;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ContactFormController extends Controller
{
    public function index()
    {
        return Inertia::render('V1/Forms/ContactForm');
    }

    public function save(Request $request)
    {
        try {
            // 1. Validación de los campos
            $validatedData = $request->validate([
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'message' => 'nullable|string',
            ]);

            // 2. Lógica para guardar (Simulado)
            // Aquí es donde guardarías en la base de datos, enviarías un email, etc.
            Lead::create($validatedData);
        } catch (Exception $e) {
            //throw $th;
            return back()->with('error', "Parece que algo salio mal de nuestro lado. Por favor, vuelve a intentarlo. " . $e->getMessage());
        }
        // 3. Redirección con Mensaje Flashzx
        // ¡Esta es la parte clave para Inertia!
        // Redirigimos de vuelta a la página del formulario.
        return back()->with('success', 'Nos pondremos en contacto contigo pronto.');
    }
}
