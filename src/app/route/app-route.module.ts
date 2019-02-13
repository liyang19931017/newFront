import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './../pages/home/home.component';
import { Exception404Component } from './../exception/404.component';
import { LoginComponent } from './../pages/login/login.component';
import { RetrievePasswordComponent } from './../pages/retrieve-password/retrieve-password.component';
import { RegisterComponent } from './../pages/register/register.component';
import { AdminLoginComponent } from './../pages/admin-login/admin-login.component';
import { AdminComponent } from './../pages/admin/admin.component';
export const routes: Routes = [
    {
        path:"",
        redirectTo:'/login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
    },
    {
        path:'adminLogin',
        component:AdminLoginComponent
    },
    {
        path:'register',
        component:RegisterComponent,
    },
    {
        path:'retrievePassword',
        component:RetrievePasswordComponent,
    },
    //设置home组件的路由
    {
        path:'home',
        component:HomeComponent,
        children: [
            {path:'homepage',loadChildren:'./../pages/home-pages/home.module#HomeModule'}
        ]
    },
    //设置home组件的路由
    {
        path:'admin',
        component:AdminComponent,
        children: [
            {path:'adminpage',loadChildren:'./../pages/admin-pages/admin-pages.module#AdminPagesModule'}
        ]
    },
    {
        path:'**',
        component:Exception404Component
    }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouteModule { }