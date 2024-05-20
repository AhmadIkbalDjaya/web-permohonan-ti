<?php

use App\Models\PPL;
use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ppl_students', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Student::class)->constrained()->references("id")->on("students");
            $table->foreignIdFor(PPL::class)->constrained()->references("id")->on("ppls");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ppl_students');
    }
};
