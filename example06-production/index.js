import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './App.jsx';

const $rootEl = document.getElementById('root');

ReactDOM.render(<App />, $rootEl);

// 错误上报
window.addEventListener('error', (e) => {
    fetch(API + '/logger', {
        method: 'POST',
        body: e.error ? e.error.stack : e,
    });
});
window.addEventListener('unhandledrejection', (e) => {
    if (String(e.reason) === 'TypeError: Failed to fetch') {
        return;
    }

    fetch(API + '/logger', {
        method: 'POST',
        body: e.reason.stack,
    });
});
