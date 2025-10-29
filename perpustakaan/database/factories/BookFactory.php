<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'publisher' => $this->faker->company(),
            'dimensions' => $this->faker->numberBetween(10, 20) . 'x' . $this->faker->numberBetween(15, 25),
            'stock' => $this->faker->numberBetween(1, 20),
        ];
    }
}