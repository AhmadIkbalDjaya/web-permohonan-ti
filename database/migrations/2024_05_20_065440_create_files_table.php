<?php

use App\Models\Comprehensive;
use App\Models\PPL;
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
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('file');
            $table->string('name');
            $table->foreignIdFor(Proposal::class)->nullable()->constraint()->references("id")->on("proposals");
            $table->foreignIdFor(Result::class)->nullable()->constraint()->references("id")->on("results");
            $table->foreignIdFor(Comprehensive::class)->nullable()->constraint()->references("id")->on("comprehensives");
            $table->foreignIdFor(PPL::class, "ppl_id")->nullable()->constraint()->references("id")->on("ppls");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
