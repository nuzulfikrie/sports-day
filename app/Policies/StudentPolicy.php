<?php

namespace App\Policies;

use App\Models\Student;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class StudentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'student:read');
    }

    public function view(User $user, Student $student): bool
    {
        return $user->currentTeam->id === $student->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'student:read');
    }

    public function create(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'student:create');
    }

    public function update(User $user, Student $student): bool
    {
        return $user->currentTeam->id === $student->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'student:update');
    }

    public function delete(User $user, Student $student): bool
    {
        return $user->currentTeam->id === $student->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'student:delete');
    }

    public function assignAgeGroup(User $user, Student $student): bool
    {
        return $user->currentTeam->id === $student->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'student:update');
    }

    public function assignEvent(User $user, Student $student): bool
    {
        return $user->currentTeam->id === $student->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'student:update');
    }
} 