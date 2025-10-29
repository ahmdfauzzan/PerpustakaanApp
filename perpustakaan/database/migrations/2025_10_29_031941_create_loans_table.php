<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


return new class extends Migration
{
    public function up()
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained('members')->onDelete('cascade');
            $table->foreignId('book_id')->constrained('books')->onDelete('cascade');
            $table->date('loan_date');
            $table->date('return_date')->nullable();
            $table->boolean('is_returned')->default(false);
            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('loans');
    }
};