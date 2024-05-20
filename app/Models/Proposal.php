<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function student()
    {
        return $this->hasOne(Student::class);
    }

    public function schedule()
    {
        return $this->hasOne(Schedule::class);
    }
    public function testers(){
        return $this->hasMany(Tester::class);
    }
    public function mentors() {
        return $this->hasMany(Mentor::class);
    }
    public function files() {
        return $this->hasMany(File::class);
    }
}
