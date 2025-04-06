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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->foreignId('sport_house_id')->constrained()->onDelete('cascade');
            $table->foreignId('age_group_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('category')->comment('Track, Field, Swimming, etc.');
            $table->string('type')->comment('Individual, Team, Relay');
            $table->string('venue');
            $table->string('place');
            $table->text('description')->nullable();
            $table->string('status')->default('upcoming');
            $table->integer('max_participants')->nullable();
            $table->integer('points')->default(0);
            $table->datetime('start_time');
            $table->datetime('end_time');
            $table->timestamps();

            // Ensure unique event names per tenant and age group
            $table->unique(['tenant_id', 'name', 'age_group_id'], 'events_tenant_id_name_age_group_id_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
