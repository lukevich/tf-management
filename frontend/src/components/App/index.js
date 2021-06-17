import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import * as toastr from 'toastr';
import { useResize } from 'hooks';
import ScreenContext from 'contexts/screen';

import AppRouter from '../AppRouter';

toastr.options.positionClass = 'toastr-position';

const App = () => {
    const { screen } = useResize();

    return (
        <ScreenContext.Provider value={{ screen }}>
            <Router>
                <AppRouter />
            </Router>
        </ScreenContext.Provider>
    );
};

export default App;
