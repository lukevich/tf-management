import { Stacks, Stack, NotFoundPage } from 'pages';
import { routes } from './routes';

export default [
    { path: routes.index, component: Stacks, exact: true },
    { path: routes.stackShow, component: Stack, exact: true },
    { path: '*', component: NotFoundPage },
];
