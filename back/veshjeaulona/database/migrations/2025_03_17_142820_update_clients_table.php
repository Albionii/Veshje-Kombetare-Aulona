<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('clients', function (Blueprint $table) {
            // Remove the 'dimensionet' column if it exists
            $table->dropColumn('dimensionet');
            
            // Add the new fields
            $table->string('krahet')->nullable();
            $table->string('gjoksi')->nullable();
            $table->string('beli')->nullable();
            $table->string('kollani')->nullable();
            $table->string('kukat')->nullable();
            $table->string('gjatesia_kemishes')->nullable();
            $table->string('gjatesia_fistonit')->nullable();
            $table->string('gjatesia_menges')->nullable();
            $table->string('numri_kembes')->nullable();
            $table->string('gjatesia_kembes')->nullable();
            $table->string('pulpi')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('clients', function (Blueprint $table) {
            // In case of rollback, drop the new fields and re-add 'dimensionet'
            $table->dropColumn([
                'krahet',
                'gjoksi',
                'beli',
                'kollani',
                'kukat',
                'gjatesia_kemishes',
                'gjatesia_fistonit',
                'gjatesia_menges',
                'numri_kembes',
                'gjatesia_kembes',
                'pulpi',
            ]);
            
            $table->string('dimensionet')->nullable(); // Re-add 'dimensionet'
        });
    }
};
