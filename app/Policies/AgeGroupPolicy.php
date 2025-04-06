<?php

namespace App\Policies;

use App\Models\AgeGroup;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class AgeGroupPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'age-group:read');
    }

    public function view(User $user, AgeGroup $ageGroup): bool
    {
        return $user->currentTeam->id === $ageGroup->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'age-group:read');
    }

    public function create(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'age-group:create');
    }

    public function update(User $user, AgeGroup $ageGroup): bool
    {
        return $user->currentTeam->id === $ageGroup->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'age-group:update');
    }

    public function delete(User $user, AgeGroup $ageGroup): bool
    {
        return $user->currentTeam->id === $ageGroup->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'age-group:delete');
    }

    public function assignStudent(User $user, AgeGroup $ageGroup): bool
    {
        return $user->currentTeam->id === $ageGroup->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'age-group:update');
    }
} 