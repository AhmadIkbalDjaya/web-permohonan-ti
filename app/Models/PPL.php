<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PPL extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "ppls";
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
    public function status_description(): BelongsTo
    {
        return $this->belongsTo(StatusDescription::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, "ppl_students", "ppl_id", "student_id");
    }

    public function firstStudent(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, "ppl_students", "student_id", "ppl_id")->limit(1);
    }

    // public function mentor(): BelongsTo
    // {
    //     return $this->BelongsTo(Mentor::class);
    // }
    public function head_of_department(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "hod_id");
    }
    public function mentor() : BelongsTo {
        return $this->belongsTo(Lecturer::class, "mentor_id");
    }
}
