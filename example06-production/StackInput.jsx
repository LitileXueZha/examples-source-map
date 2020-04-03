import React, { useEffect } from 'react';
import { Input } from 'antd';
import 'antd/es/input/style/css';
import { debounce } from 'lodash-es';

export default function StackInput() {
    // const onChange = debounce((e) => {
    //     console.log(e.target.value);
    // }, 1500);
    const onChange = (e) => {
        console.log(e.target.value);
    };
    const onPressEnter = (e) => {
        throw new SyntaxError(`输错了>>${e.target.value}<<`);
    };

    useEffect(() => {
        Promise.resolve().then(() => console.log(xxx));
    }, []);

    return (
        <Input onChange={onChange} className="input" placeholder="请输入" prefix="¥" onPressEnter={onPressEnter} />
    );
}
