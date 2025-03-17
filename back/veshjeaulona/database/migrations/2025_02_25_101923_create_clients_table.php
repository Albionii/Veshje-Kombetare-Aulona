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
      Schema::create('clients', function (Blueprint $table) {
          $table->id(); // Auto-incrementing ID field (primary key)
          $table->string('last_name')->nullable(); // Last Name
          $table->string('first_name')->nullable(); // First Name
          $table->string('numri_telefonit')->nullable(); // Phone number
          $table->string('modeli_veshjes')->nullable(); // Clothing model
          $table->decimal('cmimi', 8, 2)->nullable(); // Price (up to 999,999.99)
          $table->decimal('kapare', 8, 2)->nullable(); // Deposit
          $table->date('data_porosise')->nullable(); // Order Date
          $table->date('data_marrjes')->nullable(); // Pickup Date
          $table->string('dimensionet')->nullable(); // Dimensions
          $table->json('foto_paths')->nullable(); // Photo paths (as JSON array)
          $table->text('shenim')->nullable(); // Notes (nullable)

          $table->timestamps(); // Created_at and Updated_at timestamps
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
