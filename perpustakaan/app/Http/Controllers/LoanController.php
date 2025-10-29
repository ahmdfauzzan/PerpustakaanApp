<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Book;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    public function index()
    {
        $loans = Loan::with(['member', 'book'])->get();
        return response()->json($loans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'member_id' => 'required|exists:members,id',
            'book_id' => 'required|exists:books,id',
            'loan_date' => 'required|date'
        ]);

        $book = Book::find($validated['book_id']);
        if ($book->stock <= 0) {
            return response()->json(['message' => 'Stock buku habis'], 400);
        }

        $book->decrement('stock');

        $loan = Loan::create($validated);
        return response()->json(['message' => 'Peminjaman berhasil', 'data' => $loan], 201);
    }

    public function returnBook($id, Request $request)
    {
        $loan = Loan::findOrFail($id);
        $loan->update(['return_date' => now()]);

        $loan->book->increment('stock');

        return response()->json(['message' => 'Buku dikembalikan', 'data' => $loan]);
    }
}