<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function proposal()
    {
        return $this->hasOne(Proposal::class);
    }
    public function result()
    {
        return $this->hasOne(Result::class);
    }
    public function comprehensive()
    {
        return $this->hasOne(Comprehensive::class);
    }
    public function ppls() {
        return $this->belongsToMany(PPL::class, "ppl_students", "student_id", "ppl_id");
    }
}
