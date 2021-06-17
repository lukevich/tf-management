import { routes } from './routes';

export const link = {
    toStack: (id) => routes.stackShow.replace(/:id/, id),
};
