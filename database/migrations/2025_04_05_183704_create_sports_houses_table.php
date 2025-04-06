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
        Schema::create('sport_houses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('color');
            $table->string('description')->nullable();
            $table->string('motto')->nullable();
            $table->string('logo');
            $table->integer('total_points')->default(0);
            $table->integer('total_gold')->default(0);
            $table->integer('total_silver')->default(0);
            $table->integer('total_bronze')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sport_houses');
    }
};
