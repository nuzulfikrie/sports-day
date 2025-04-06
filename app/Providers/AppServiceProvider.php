<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
// Import your models
use App\Models\User;
use App\Models\SportTeam;
use App\Models\AgeGroup;
use App\Models\Event;
use App\Models\Student;
use App\Models\SportHouse;
use App\Models\EventTeam;
use App\Models\Tenant;
use App\Models\Team;
use App\Models\TeamInvitation;

// Import your policies
use App\Policies\UserPolicy;
use App\Policies\SportTeamPolicy;
use App\Policies\AgeGroupPolicy;
use App\Policies\EventPolicy;
use App\Policies\StudentPolicy;
use App\Policies\SportHousePolicy;
use App\Policies\EventTeamPolicy;
use App\Policies\TenantPolicy;
use App\Policies\TeamPolicy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        SportTeam::class => SportTeamPolicy::class,
        AgeGroup::class => AgeGroupPolicy::class,
        Event::class => EventPolicy::class,
        Student::class => StudentPolicy::class,
        SportHouse::class => SportHousePolicy::class,
        EventTeam::class => EventTeamPolicy::class,
        Tenant::class => TenantPolicy::class,
        Team::class => TeamPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        $this->registerPolicies();
    }
}
