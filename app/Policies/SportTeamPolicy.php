<?php

namespace App\Policies;

use App\Models\SportTeam;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SportTeamPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, SportTeam $sportTeam): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') || $user->hasRole('coach');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, SportTeam $sportTeam): bool
    {
        return $user->hasRole('admin') ||
            ($user->hasRole('coach') && $sportTeam->sport_house_id === $user->sportHouse->id);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, SportTeam $sportTeam): bool
    {
        return $user->hasRole('admin') ||
            ($user->hasRole('coach') && $sportTeam->sport_house_id === $user->sportHouse->id);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, SportTeam $sportTeam): bool
    {
        return $user->hasRole('admin');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, SportTeam $sportTeam): bool
    {
        return $user->hasRole('admin');
    }
}
