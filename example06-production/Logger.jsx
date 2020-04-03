import React from 'react';
import { Row, Col, List } from 'antd';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/list/style/css';

export default class Logger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggerList: [],
            mapList: [],
        };

        this.sse = new EventSource('/stream');
        this.sse.addEventListener('message', (e) => {
            try {
                const { error, stack } = JSON.parse(e.data);
                this.setState({
                    loggerList: [...this.state.loggerList, error],
                    mapList: [...this.state.mapList, JSON.stringify(stack, null, 4)],
                });
            } catch (e) {

            }
        });
    }

    render() {
        const { loggerList, mapList } = this.state;

        return (
            <>
            <Row>
                <Col span={12}>
                    <b>logger</b>
                    <List
                        dataSource={loggerList}
                        renderItem={item => <List.Item style={{ whiteSpace: 'pre', overflowX: 'scroll' }}>{item}</List.Item>}
                    />
                </Col>
                <Col span={12}>
                    <b>logger source map result</b>
                    <List
                        dataSource={mapList}
                        renderItem={item => <List.Item style={{ whiteSpace: 'pre', overflowX: 'scroll' }}>{item}</List.Item>}
                    />
                </Col>
            </Row>
            </>
        );
    }
}
