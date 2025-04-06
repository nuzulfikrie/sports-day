<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('age_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name'); // e.g., "Tahun 1", "Tahun 2", etc.
            $table->integer('min_age');
            $table->integer('max_age');
            $table->text('description')->nullable();
            $table->integer('max_participants_per_event')->default(4)->comment('Maximum number of participants allowed per event for this age group');
            $table->integer('max_events_per_student')->default(3)->comment('Maximum number of events a student in this age group can participate in');
            $table->timestamps();

            // Ensure unique age groups per tenant
            $table->unique(['tenant_id', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('age_groups');
    }
};
