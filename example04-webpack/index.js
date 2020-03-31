import { join } from 'lodash-es';
import 'regenerator-runtime/runtime';

window.addEventListener('load', async function load() {
    console.log('load');

    document.body.addEventListener('click', async () => {
        const msg = join(['example04', 'webpack'], '-');

        console.warn(msg);
    });
});
