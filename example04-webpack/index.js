import _ from 'lodash';

window.addEventListener('load', function load() {
    console.log('load');

    document.body.addEventListener('click', () => {
        const msg = _.join(['example04', 'webpack'], '-');

        console.warn(msg);
    });
});
