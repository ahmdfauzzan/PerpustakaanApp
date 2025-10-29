<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('publisher')->nullable();
            $table->string('dimensions')->nullable();
            $table->integer('stock')->default(0);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('books');
    }
};