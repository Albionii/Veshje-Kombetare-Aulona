<?php

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
      Schema::create('users', function (Blueprint $table) {
        $table->id(); // Auto-incrementing ID
        $table->string('username')->unique(); // Unique username
        $table->string('name')->nullable();
        $table->string('password'); // Password field
        $table->boolean('is_admin')->default(false); // Admin flag
        $table->timestamps(); // Created_at and updated_at timestamps
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
