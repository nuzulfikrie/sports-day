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
        Schema::create('sport_teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_house_id')->constrained()->cascadeOnDelete();
            $table->foreignId('age_group_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('event_team', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_team_id')->constrained()->cascadeOnDelete();
            $table->integer('score')->default(0);
            $table->timestamps();
        });

        Schema::create('sport_team_student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sport_team_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_team');
        Schema::dropIfExists('sport_teams');
        Schema::dropIfExists('sport_team_student');
    }
};
