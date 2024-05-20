<?php

use App\Models\Proposal;
use App\Models\Result;
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
        Schema::create('mentors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('order')->unsigned();
            $table->string('description')->nullable();
            $table->foreignIdFor(Proposal::class)->nullable()->constraint()->references("id")->on("proposals");
            $table->foreignIdFor(Result::class)->nullable()->constraint()->references("id")->on("results");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentors');
    }
};
