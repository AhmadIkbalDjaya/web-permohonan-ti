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
        return $this->belongsTo(Proposal::class);
    }
    public function result()
    {
        return $this->belongsTo(Result::class);
    }
    public function comprehensive()
    {
        return $this->belongsTo(Comprehensive::class);
    }
    public function ppls() {
        return $this->belongsToMany(PPL::class, "ppl_students", "ppl_id", "student_id");
    }
}
