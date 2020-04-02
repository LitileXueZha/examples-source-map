import React, { useEffect } from 'react';
import { join } from 'lodash-es';

import './index.less';
import StackInput from './StackInput.jsx';

export default function App() {
    useEffect(() => {
        console.log('App load');

        document.body.addEventListener('click', async () => {
            const namespace = 'example05';
            const project = 'webpack-dev';
            const msg = join([namespace, project], '-');

            console.warn(msga);
        });
    }, []);

    return (
        <div className="container">
            Examples Source Map
            <StackInput />
        </div>
    );
}
