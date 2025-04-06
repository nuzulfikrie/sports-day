<?php
namespace App\Policies;

use App\Models\User;
use App\Models\SportHouse;
use Illuminate\Auth\Access\HandlesAuthorization;

class SportHousePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'sport-house:read');
    }

    public function view(User $user, SportHouse $sportHouse): bool
    {
        return $user->currentTeam->id === $sportHouse->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'sport-house:read');
    }

    public function create(User $user): bool
    {
        return $user->hasTeamPermission($user->currentTeam, 'sport-house:create');
    }

    public function update(User $user, SportHouse $sportHouse): bool
    {
        return $user->currentTeam->id === $sportHouse->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'sport-house:update');
    }

    public function delete(User $user, SportHouse $sportHouse): bool
    {
        return $user->currentTeam->id === $sportHouse->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'sport-house:delete');
    }

    public function assignStudent(User $user, SportHouse $sportHouse): bool
    {
        return $user->currentTeam->id === $sportHouse->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'sport-house:update');
    }

    public function viewStudents(User $user, SportHouse $sportHouse): bool
    {
        return $user->currentTeam->id === $sportHouse->tenant_id &&
            $user->hasTeamPermission($user->currentTeam, 'sport-house:read');
    }
}