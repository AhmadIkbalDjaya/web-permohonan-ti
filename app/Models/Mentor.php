<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Mentor extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    public function proposal()
    {
        return $this->belongsTo(Proposal::class);
    }
    public function result()
    {
        return $this->belongsTo(Result::class);
    }

    public function ppl(): HasOne
    {
        return $this->HasOne(PPL::class);
    }
}
