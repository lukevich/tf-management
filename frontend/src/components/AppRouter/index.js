import React from 'react';
import { Route, Switch } from 'react-router-dom';

import routesConfig from 'settings/navigation/config';

const AppRouter = () => (
    <Switch>
        {routesConfig.map((route) => (
            <Route key={route.path} {...route} />))}
    </Switch>
);

export default AppRouter;
