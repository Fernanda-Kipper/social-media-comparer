import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '/comparer/:channelA/:channelB',
        resolve: {
            comparer: 'comparerResolver'
        },
        loadComponent: () => import('./components/comparer/comparer.component').then(m => m.ComparerComponent)
    }
];
