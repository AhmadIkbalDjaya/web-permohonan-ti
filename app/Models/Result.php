<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Result extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($proposal) {
            $dateNow = Carbon::now();
            $year = date("y", strtotime($dateNow));
            $month = date("m", strtotime($dateNow));
            $count = static::whereYear('created_at', date("Y", strtotime($dateNow)))
                ->whereMonth("created_at", $month)
                ->count() + 1;
            $proposal->code = sprintf("#HSL-%s%s%03d", $year, $month, $count);
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
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
    public function testers()
    {
        return $this->hasMany(Tester::class);
    }
    public function mentors()
    {
        return $this->hasMany(Mentor::class);
    }
    public function files()
    {
        return $this->hasMany(File::class);
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
    public function executor(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, "executor_id");
    }
}
