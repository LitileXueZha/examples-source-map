const foo: string = '1';
const bar: number = 2;

/** source map 类型 */
type SourceMap = {
    version: number,
    sources: string[],
    sourceRoot?: string,
};

/** 接口 A */
interface IA {
    /** 吃饭了没 */
    readonly eatting: boolean,
    say: () => void,
    whatThis?: any,
}

window.addEventListener('load', function load() {
    console.log('load');

    new FooBar();
});

/** JSDoc */
class FooBar implements IA {
    eatting = false;
    constructor() {
        document.body.addEventListener('click', function warnClick() {
            console.warn('click');
        });
    }

    say() {
        alert(this.eatting);
    }
}
