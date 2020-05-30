import React from 'react';
import { Row, Col, List } from 'antd';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/list/style/css';
import TracebackJS from 'traceback.js';

export default class Logger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggerList: [],
            mapList: [],
        };

        this.sse = new EventSource(API + '/stream');
        this.sse.addEventListener('message', (e) => {
            try {
                const { error, logger } = JSON.parse(e.data);
                this.setState({
                    loggerList: [...this.state.loggerList, error],
                    mapList: [...this.state.mapList, logger],
                });
            } catch (e) {

            }
        });
    }

    render() {
        const { loggerList, mapList } = this.state;

        return (
            <>
            <Row style={{ fontFamily: 'Consolas, Menlo' }}>
                <Col span={12}>
                    <b>logger</b>
                    <List
                        dataSource={loggerList}
                        renderItem={item => <List.Item style={{ whiteSpace: 'pre', overflowX: 'auto' }}>{item}</List.Item>}
                    />
                </Col>
                <Col span={12}>
                    <b>logger source map result</b>
                    <List
                        dataSource={mapList}
                        renderItem={item => (
                            <List.Item style={{ whiteSpace: 'pre', overflowX: 'auto' }}>
                                {item && (
                                    // <ol style={{ width: '100%' }} start={item.line - 4}>
                                    //     {item.content.split('\n').map((text, i) => {
                                    //         if (Math.abs(item.line - i) > 5) return null;
                                    //         const style = item.line === i + 1 ? { background: 'yellow' } : null;
                                    //         return <li style={style}>{text}</li>;
                                    //     })}
                                    // </ol>
                                    <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: TracebackJS.renderToString(item.content, { highlightRow: item.line }) }}></div>
                                )}
                            </List.Item>
                        )}
                    />
                </Col>
            </Row>
            </>
        );
    }
}
