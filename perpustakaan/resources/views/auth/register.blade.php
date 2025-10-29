@extends('layouts.app')

@section('content')
<div class="flex justify-center items-center min-h-[70vh]">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-2xl font-bold mb-6 text-center text-green-600">Register</h2>

        <form action="{{ route('register') }}" method="POST">
            @csrf
            <div class="mb-4">
                <label class="block text-gray-700 mb-2">Nama</label>
                <input type="text" name="name"
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    required>
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 mb-2">Email</label>
                <input type="email" name="email"
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    required>
            </div>

            <div class="mb-6">
                <label class="block text-gray-700 mb-2">Password</label>
                <input type="password" name="password"
                    class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                    required>
            </div>

            <button type="submit"
                class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>

            <p class="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun? <a href="{{ route('login') }}" class="text-green-600 hover:underline">Login</a>
            </p>
        </form>
    </div>
</div>
@endsection