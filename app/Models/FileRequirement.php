<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileRequirement extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected static function boot()
    {
        parent::boot();
        static::saving(function ($file_requirement) {
            $file_requirement->slug = strtolower(str_replace(" ", "_", $file_requirement->name));
        });
    }
}
