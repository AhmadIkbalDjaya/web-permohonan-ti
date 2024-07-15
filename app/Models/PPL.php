<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PPL extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "ppls";
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($proposal) {
            $dateNow = Carbon::now();
            $year = date("y", strtotime($dateNow));
            $month = date("m", strtotime($dateNow));
            $day = date("d", strtotime($dateNow));
            $hour = date("H", strtotime($dateNow));
            $minute = date("i", strtotime($dateNow));
            $second = date("s", strtotime($dateNow));
            // $count = static::whereYear('created_at', date("Y", strtotime($dateNow)))
            //     ->whereMonth("created_at", $month)
            //     ->count() + 1;
            $count = static::count() + 1;
            // $proposal->code = sprintf("#PPL-%s%s%03d", $year, $month, $count);
            $proposal->code = sprintf("#PPL-%s%s%s%s%s%s%03d", $year, $month, $day, $hour, $minute, $second, $count);
        });
    }
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
    public function head_of_department(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "hod_id");
    }
    public function mentor(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "mentor_id");
    }
    public function files(): HasMany
    {
        return $this->hasMany(File::class, "ppl_id");
    }
}
