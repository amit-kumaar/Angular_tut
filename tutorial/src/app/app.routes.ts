import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [

  // A route to the home page (component)
  { path: '',component: Home},
  // A route to the about us page (module)
//   {
//     path: 'about-us',
//     loadChildren: () =>
//       import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
//   },
];


