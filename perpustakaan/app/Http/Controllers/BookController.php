<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'publisher' => 'required',
            'dimensions' => 'required',
            'stock' => 'required|integer'
        ]);

        $book = Book::create($validated);
        return response()->json(['message' => 'Book created', 'data' => $book], 201);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'title' => 'required',
            'publisher' => 'required',
            'dimensions' => 'required',
            'stock' => 'required|integer'
        ]);

        $book->update($validated);
        return response()->json(['message' => 'Book updated', 'data' => $book]);
    }

    public function destroy(Book $book)
    {
        $book->delete();
        return response()->json(['message' => 'Book deleted']);
    }
}