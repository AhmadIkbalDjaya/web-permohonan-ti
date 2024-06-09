<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Mentor extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }
    public function result(): BelongsTo
    {
        return $this->belongsTo(Result::class);
    }
    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);
    }
}
