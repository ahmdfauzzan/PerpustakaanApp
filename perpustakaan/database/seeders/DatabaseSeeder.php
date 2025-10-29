<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Member;
use App\Models\Book;
use App\Models\Loan;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Buat 10 anggota random
        Member::factory(10)->create();

        // Buat 8 buku random
        Book::factory(8)->create();

        // Buat 5 peminjaman random
        Loan::factory(5)->create();
    }
}