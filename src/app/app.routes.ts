import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginPage } from './views/login/login.page';
import { authGuard } from './guards/auth.guard';

// 1. Rutas 
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginPage//pagina principal

    },
   
   {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>import('./views/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard]
        },


      {
        path: 'pilotos',
        loadComponent: () => import('./views/pilotos/pilotos.component').then(m => m.PilotosComponent), canActivate: [authGuard]
        },

        
        {
        path: 'clientes',
        loadComponent: () => import('./views/clientes/clientes.component').then(m => m.ClientesComponent), canActivate: [authGuard]
        },


        {
        path: 'recibos',
        loadComponent: () => import('./views/recibos/recibos.component').then(m => m.RecibosComponent), canActivate: [authGuard]
        }



    ]
  }  
];
