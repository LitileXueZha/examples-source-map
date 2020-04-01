import React from 'react';
import { Input } from 'antd';
import 'antd/es/input/style/css';
import { debounce } from 'lodash-es';

export default function StackInput() {
    // const onChange = debounce((e) => {
    //     console.log(e.target.value);
    // }, 1500);
    const onChange = (e) => {
        console.error(e.target.value);
    };

    return (
        <Input onChange={onChange} className="input" placeholder="请输入" prefix="￥" />
    );
}
