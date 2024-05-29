<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PPL extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "ppls";

    public function students() {
        return $this->belongsToMany(Student::class, "ppl_students", "student_id", "ppl_id");
    }

    public function mentor(): BelongsTo {
        return $this->BelongsTo(Mentor::class);
    }
}
