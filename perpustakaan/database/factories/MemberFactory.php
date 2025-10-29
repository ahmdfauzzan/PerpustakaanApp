<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            'no_member' => 'A' . $this->faker->unique()->numberBetween(100, 999),
            'name' => $this->faker->name(),
            'birth_date' => $this->faker->date('Y-m-d', '2005-01-01'),
        ];
    }
}