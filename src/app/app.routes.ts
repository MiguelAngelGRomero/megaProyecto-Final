import { Routes } from '@angular/router';
import { ConfiguracionComponent } from '@modules/Configuracion/configuracion.component';
import { FavoritosComponent } from '@modules/favoritos/favoritos.component';
import { InicioComponent } from '@modules/inicio/inicio.component';
import { LoginComponent } from '@modules/login/login.component';
import { PeliculasComponent } from '@modules/peliculas/peliculas.component';
import { SeriesComponent } from '@modules/series/series.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'inicio',
        component: InicioComponent
    },
    {
        path: 'favoritos',
        component: FavoritosComponent
    },
    {
        path: 'series',
        component: SeriesComponent
    },
    {
        path: 'peliculas',
        component: PeliculasComponent
    },
    {
        path: 'configuracion',
        component: ConfiguracionComponent
    }
    
];
