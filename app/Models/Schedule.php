<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Schedule extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function proposal(): HasOne
    {
        return $this->hasOne(Proposal::class);
    }
    public function result(): HasOne
    {
        return $this->hasOne(Result::class);
    }
}
