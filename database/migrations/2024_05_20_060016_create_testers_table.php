<?php

use App\Models\Comprehensive;
use App\Models\Lecturer;
use App\Models\Proposal;
use App\Models\Result;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('testers', function (Blueprint $table) {
            $table->id();
            // $table->string('name')->nullable();
            $table->foreignIdFor(Lecturer::class)->nullable()->constrained()->references("id")->on("lecturers")->onDelete("set null")->onUpdate("cascade");
            $table->integer('order')->unsigned();
            $table->string('description')->nullable();
            $table->foreignIdFor(Proposal::class)->nullable()->constraint()->references("id")->on("proposals");
            $table->foreignIdFor(Result::class)->nullable()->constraint()->references("id")->on("results");
            $table->foreignIdFor(Comprehensive::class)->nullable()->constraint()->references("id")->on("comprehensives");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testers');
    }
};
