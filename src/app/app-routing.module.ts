import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'marketing-website', pathMatch: 'full' },
  {
    path: 'marketing-website',
    loadChildren: () =>
      import('./marketing-website/marketing-website.module').then(
        (m) => m.MarketingWebsiteModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    AuthRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
