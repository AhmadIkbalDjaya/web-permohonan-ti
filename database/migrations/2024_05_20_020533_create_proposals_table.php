<?php

use App\Models\Schedule;
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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Student::class)->constrained()->references("id")->on("students");
            $table->string('essay_title');
            $table->string('applicant_sign');
            $table->foreignIdFor(Schedule::class)->nullable()->constrained()->references("id")->on("schedules");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
