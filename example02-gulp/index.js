const a = 1;
const b = {};

window.addEventListener('load', function load() {
    console.log('load');

    new A();
});

class A {
    constructor() {
        this.a = 1;

        document.body.addEventListener('click', () => {
            console.warn('click');
        });
    }

    say() {
        alert(this.a);
    }
}
