const a = 1;
const b = {};

window.addEventListener('load', function load() {
    console.log('load');

    document.body.addEventListener('click', () => {
        console.warn('click');
    });
});
