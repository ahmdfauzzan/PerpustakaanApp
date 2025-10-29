<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Member extends Model
{
    use HasFactory;


    protected $fillable = ['no_member', 'name', 'birth_date'];


    public function loans()
    {
        return $this->hasMany(Loan::class);
    }
}
