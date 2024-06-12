<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StatusDescription extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public function status(): BelongsTo
    {
        return $this->BelongsTo(Status::class);
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
