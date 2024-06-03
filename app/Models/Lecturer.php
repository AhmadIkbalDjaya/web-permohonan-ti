<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lecturer extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function propsals_hod(): HasMany
    {
        return $this->hasMany(Proposal::class, "hod_id");
    }
    public function propsals_chairman(): HasMany
    {
        return $this->hasMany(Proposal::class, "chairman_id");
    }
    public function propsals_secretary(): HasMany
    {
        return $this->hasMany(Proposal::class, "secretary_id");
    }
    public function propsals_executor(): HasMany
    {
        return $this->hasMany(Proposal::class, "executor_id");
    }
    public function result_hod(): HasMany
    {
        return $this->hasMany(Result::class, "hod_id");
    }
    public function result_chairman(): HasMany
    {
        return $this->hasMany(Result::class, "chairman_id");
    }
    public function result_secretary(): HasMany
    {
        return $this->hasMany(Result::class, "secretary_id");
    }
    public function result_executor(): HasMany
    {
        return $this->hasMany(Result::class, "executor_id");
    }
    public function comprehensive_hod(): HasMany
    {
        return $this->hasMany(Comprehensive::class, "hod_id");
    }
    public function comprehensive_chairman(): HasMany
    {
        return $this->hasMany(Comprehensive::class, "chairman_id");
    }
    public function comprehensive_secretary(): HasMany
    {
        return $this->hasMany(Comprehensive::class, "secretary_id");
    }
    public function ppl_hod(): HasMany
    {
        return $this->hasMany(PPL::class, "hod_id");
    }
    public function ppl_mentor(): HasMany
    {
        return $this->hasMany(PPL::class, "mentor_id");
    }
}
