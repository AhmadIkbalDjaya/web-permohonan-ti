<?php

use App\Models\Mentor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ppls', function (Blueprint $table) {
            $table->foreignIdFor(Mentor::class)->after("applicant_sign")->nullable()->constrained()->references("id")->on("mentors")->onDelete("setnull")->onUpdate("setnull");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ppls', function (Blueprint $table) {
            //
        });
    }
};
