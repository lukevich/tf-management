import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as toastr from 'toastr';

import { App } from 'components';
import { getParams } from './helpers/auth';
import { AUTH_LOCAL_STORAGE_NAME } from './settings/constants/auth';

import store from './store';
import { apiServer } from './settings/api-service';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'styles/global.notmodule.scss';

toastr.options.positionClass = 'toastr-position';

apiServer.get('/config.json').then((response) => {
    apiServer.interceptors.request.use((config) => {
        config.baseURL = response.data.api.data; // eslint-disable-line no-param-reassign
        return config;
    }, (error) => {
        toastr.error(error.message);
        return Promise.reject(error);
    });

    const { access_token: accessToken } = getParams();
    if (accessToken) {
        localStorage.setItem(AUTH_LOCAL_STORAGE_NAME, accessToken);
        window.location.href = '/';
    }

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
})
    .catch((err) => toastr.error(err.message));
