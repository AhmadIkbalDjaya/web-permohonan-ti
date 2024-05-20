<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PPL extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "ppls";

    public function students() {
        return $this->belongsToMany(Student::class, "ppl_students", "student_id", "ppl_id");
    }
}
