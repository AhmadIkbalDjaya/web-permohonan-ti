<?php

use App\Models\Lecturer;
use App\Models\Schedule;
use App\Models\Status;
use App\Models\StatusDescription;
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
        Schema::create('results', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignIdFor(Status::class)->default(1)->constrained()->references("id")->on("statuses")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(StatusDescription::class)->nullable()->constrained()->references("id")->on("status_descriptions")->onDelete("cascade")->onUpdate("cascade");

            $table->string('letter_number')->nullable();
            $table->date('letter_date')->nullable();
            $table->foreignIdFor(Lecturer::class, "hod_id")->nullable()->default(1)->constrained()->references("id")->on("lecturers")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(Lecturer::class, "chairman_id")->nullable()->constrained()->references("id")->on("lecturers")->onDelete("set null")->onUpdate("cascade");
            $table->foreignIdFor(Lecturer::class, "secretary_id")->nullable()->constrained()->references("id")->on("lecturers")->onDelete("set null")->onUpdate("cascade");
            $table->foreignIdFor(Lecturer::class, "executor_id")->nullable()->constrained()->references("id")->on("lecturers")->onDelete("set null")->onUpdate("cascade");
            
            $table->foreignIdFor(Student::class)->constrained()->references("id")->on("students");
            $table->string('essay_title');
            $table->string('applicant_sign');
            $table->foreignIdFor(Schedule::class)->constrained()->references("id")->on("schedules");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};
