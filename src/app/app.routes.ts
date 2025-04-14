import { Routes } from '@angular/router';
import { comparerResolver } from './resolvers/comparer/comparer.resolver';
import { ComparerComponent } from './components/comparer/comparer.component';

export const routes: Routes = [
    {
        path: 'comparer',
        children: [
            {
                path: '',
                component: ComparerComponent,
            },
            {
                path: ':channelA/:channelB',
                resolve: { data: comparerResolver },
                component: ComparerComponent,
            }
        ]
    }
];
