import React, { useEffect } from 'react';
import { join } from 'lodash-es';

import './index.less';
import StackInput from './StackInput.jsx';
import Logger from './Logger.jsx';

export default function App() {
    useEffect(() => {
        console.log('App load');

        document.body.addEventListener('click', async () => {
            const namespace = 'example05';
            const project = 'webpack-dev';
            const msg = join([namespace, project], '-');

            console.warn(msg);
        });
    }, []);

    return (
        <div className="container">
            <div style={{ position: 'sticky', top: 10, background: '#fff', zIndex: 2 }}>
                Examples Source Map
                <StackInput />
                <p><a href="#">logger</a></p>
            </div>
            <Logger />
        </div>
    );
}
