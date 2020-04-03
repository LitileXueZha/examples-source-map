const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const compression = require('compression');
const EventEmitter = require('events');
const { SourceMapConsumer } = require('source-map');
const app = express();
const appEvent = new EventEmitter();
const reg = /http:\/\/localhost:9009(.+\.js):(\d+):(\d+)/;
const customEvent = {
    func: () => {},
    on(func) { this.func = func },
    emit(data) { this.func(data) },
};
const rawSourceMap = {};
const rawDev = {};

app.use(compression());
// app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.text());
app.listen(9009, () => {
    console.log('系统启动成功: http://localhost:9009\n');
});

app.post('/logger', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    customEvent.emit(req.body);
    res.end();
});

app.get('/stream', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    res.write('event: init\n');
    res.write(`data: Initialize\n\n`);
    res.flush();

    customEvent.on((error) => {
        const result = reg.exec(error);

        if (!result) {
            // dev 下配置
            const [,filename, lineno, colno] = /webpack:\/\/\/(.+\.jsx?)\?:(\d+):(\d+)/.exec(error);

            if (!rawDev[filename]) {
                rawDev[filename] = fs.readFileSync(path.join(__dirname, filename)).toString();
            }
            const data = {
                error,
                logger: {
                    line: +lineno,
                    column: +colno,
                    content: rawDev[filename],
                },
            };
            
            res.write('event: message\n');
            res.write(`data: ${JSON.stringify(data)}\n\n`);
            res.flush();
            return;
        }

        const [,filename, lineno, colno] = result;
        const generatedPosition = {
            line: +lineno,
            column: +colno,
        };
        const mapName = path.join(__dirname, '../dist', filename + '.map');
        
        if (!rawSourceMap[mapName]) {
            rawSourceMap[mapName] = JSON.parse(fs.readFileSync(mapName));
        }

        SourceMapConsumer.with(rawSourceMap[mapName], null, (consumer) => {
            const { name, line, column, source } = consumer.originalPositionFor(generatedPosition);
            const content = consumer.sourceContentFor(source);
            const data = {
                error,
                logger: {
                    name,
                    line,
                    column,
                    content,
                },
            };
            
            res.write('event: message\n');
            res.write(`data: ${JSON.stringify(data)}\n\n`);
            res.flush();
        });
    });
});
