import { Routes } from '@angular/router';
import { ConfiguracionComponent } from '@modules/Configuracion/configuracion.component';
import { FavoritosComponent } from '@modules/favoritos/favoritos.component';
import { InicioComponent } from '@modules/inicio/inicio.component';
import { LoginComponent } from '@modules/login/login.component';
import { PeliculasComponent } from '@modules/peliculas/peliculas.component';
import { SeriesComponent } from '@modules/series/series.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
        import('./modules/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'inicio',
        loadComponent: () =>
        import('./modules/inicio/inicio.component').then(m => m.InicioComponent),
    },
    {
        path: 'favoritos',
        loadComponent: () =>
        import('./modules/favoritos/favoritos.component').then(m => m.FavoritosComponent),
    },
    {
        path: 'series',
        loadComponent: () =>
        import('./modules/series/series.component').then(m => m.SeriesComponent),
    },
    {
        path: 'peliculas',
        loadComponent: () =>
        import('./modules/peliculas/peliculas.component').then(m => m.PeliculasComponent),
    },
    {
        path: 'configuracion',
        loadComponent: () =>
        import('./modules/Configuracion/configuracion.component').then(m => m.ConfiguracionComponent),
    },
];
