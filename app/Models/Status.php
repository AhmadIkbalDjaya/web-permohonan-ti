<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Status extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function descriptions(): HasMany
    {
        return $this->HasMany(StatusDescription::class, "status_id");
    }

    public function propsals(): HasMany
    {
        return $this->hasMany(Proposal::class);
    }
    public function results(): HasMany
    {
        return $this->hasMany(Result::class);
    }
    public function comprehensives(): HasMany
    {
        return $this->hasMany(Comprehensive::class);
    }
    public function ppls(): HasMany
    {
        return $this->hasMany(PPL::class);
    }
}
