<?php

use App\Models\Lecturer;
use App\Models\Status;
use App\Models\StatusDescription;
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
        Schema::create('ppls', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->foreignIdFor(Status::class)->default(1)->constrained()->references("id")->on("statuses")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(StatusDescription::class)->nullable()->constrained()->references("id")->on("status_descriptions")->onDelete("cascade")->onUpdate("cascade");

            $table->string('letter_number_mentor')->nullable();
            $table->string('letter_number_introduction')->nullable();
            $table->date('letter_date')->nullable();
            $table->string('addressed_to')->nullable();            
            $table->foreignIdFor(Lecturer::class, "hod_id")->nullable()->default(1)->constrained()->references("id")->on("lecturers")->onDelete("cascade")->onUpdate("cascade");
            $table->foreignIdFor(Lecturer::class, "mentor_id")->nullable()->constrained()->references("id")->on("lecturers")->onDelete("set null")->onUpdate("set null");
            
            $table->date('start_date');
            $table->date('end_date');
            $table->string('location');
            $table->string('location_address');
            $table->string('applicant_sign');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p_p_l_s');
    }
};
