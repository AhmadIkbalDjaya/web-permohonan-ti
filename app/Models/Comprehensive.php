<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comprehensive extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }
    public function status_description(): BelongsTo
    {
        return $this->belongsTo(StatusDescription::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    public function testers()
    {
        return $this->hasMany(Tester::class);
    }
    public function head_of_department(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "hod_id");
    }

    public function chairman(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "chairman_id");
    }
    public function secretary(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "secretary_id");
    }
}
