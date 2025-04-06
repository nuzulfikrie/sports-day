<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sport_house_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->integer('age');
            $table->string('student_id')->unique();
            $table->string('class');
            $table->enum('gender', ['male', 'female'])->comment('Student gender');
            $table->integer('height')->nullable()->comment('Height in centimeters');
            $table->integer('weight')->nullable()->comment('Weight in kilograms');
            $table->enum('blood_type', ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])->nullable();
            $table->text('allergies')->nullable()->comment('Any medical allergies');
            $table->string('emergency_contact')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->enum('emergency_contact_relationship', ['Father', 'Mother', 'Guardian', 'Other'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
