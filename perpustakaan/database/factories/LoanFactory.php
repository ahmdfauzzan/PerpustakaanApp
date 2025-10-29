<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Member;
use App\Models\Book;

class LoanFactory extends Factory
{
    public function definition(): array
    {
        return [
            'member_id' => Member::inRandomOrder()->first()->id ?? Member::factory(),
            'book_id' => Book::inRandomOrder()->first()->id ?? Book::factory(),
            'loan_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'return_date' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),
        ];
    }
}