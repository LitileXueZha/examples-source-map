const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('dist'));
app.use(morgan('dev'));
app.listen(9009, () => {
    console.log('系统启动成功:   http://localhost:9009');
    console.log('日志记录请访问: http://localhot:9009/logger/\n');
});

app.use('/logger', (req, res) => {
    res.send('<script>const sse = new EventSource("/stream")</script>');
});

app.use('/stream', (req, res) => {
    res.append('Content-Type', 'text/event-stream');
    setInterval(() => {
        res.write("event: connecttime\n");
        res.write("data: " + (new Date()) + "\n\n");
    }, 1500);
});
