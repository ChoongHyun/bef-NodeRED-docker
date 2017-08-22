// http
var http = require('http');
// node.js http와 connect 컴포넌트 기반의 웹 프레임워크
var express = require('express');
// request
var request = require('request');
// Create an Express app
var app = express();
// node-red 를 위해 package.json에 depdency 추가
var RED = require('node-red');
// cross-orgin
var cors = require('cors');

// Add a simple route for static content served from 'public'
// app.use('/',express.static('public'));
// Create a server
var server = http.createServer(app);
// Create the settings object - see default settings.js file for other options
var settings = {
    // editor
    httpAdminRoot: '/dashboard',
    // 실행 된 node 하위 경로
    httpNodeRoot: '/node',
    // 해당 node-red의 settings.js를 이용 경로 설정 & 저장 경로
    // userDir:'/usr/src/node-red/',
    userDir:'/Users/choong/Downloads/',
    // custom node
    // nodesDir: '/usr/src/node-red/BEF-UI/custom/node/',
    nodesDir: '/Users/choong/git/bef-NodeRED-docker/BEF-UI/custom/node/',
    // admin auth
    adminAuth: require('./BEF-server/bef-admin-auth.js'),
    // category 순서
    paletteCategories: [
        'test', 'subflows', 'input', 'output', 'function',
        'social', 'mobile', 'storage','analysis', 'advanced'
    ],
    // editor theme
    editorTheme: {
        page: {
            title: 'exntu',
            // css
            // css: "/usr/src/node-red/BEF-UI/custom/css/bef-ui.css",
            css: "/Users/choong/git/bef-NodeRED-docker/BEF-UI/custom/css/bef-ui.css",
            // UI scripts
            // scripts: '/usr/src/node-red/BEF-UI/custom/js/bef-js.js',
            scripts: '/Users/choong/git/bef-NodeRED-docker/BEF-UI/custom/js/bef-js.js',
        },
        userMenu: false
    },
    // ui 실행 되는 node 하위 경로의 middleware 동작
    httpNodeMiddleware: function(req,res,next) {
        console.log('BEF - httpNodeMiddleware');
        next();
    },
    // 실행 되는 node cros Domain
    httpNodeCors: {
       origin: '*',
       methods: 'GET,PUT,POST,DELETE'
    },
    httpStatic: '/static',
    // logging
    logging: {
        // Only console logging is currently supported
        console: {
            // Level of logging to be recorded. Options are:
            // fatal - only those errors which make the application unusable should be recorded
            // error - record errors which are deemed fatal for a particular request + fatal errors
            // warn - record problems which are non fatal + errors + fatal errors
            // info - record information about the general running of the application + warn + error + fatal errors
            // debug - record information which is more verbose than info + info + warn + error + fatal errors
            // trace - record very detailed logging + debug + info + warn + error + fatal errors
            // off - turn off all logging (doesn't affect metrics or audit)
            level: 'debug',
            // Whether or not to include metric events in the log output
            metrics: false,
            // Whether or not to include audit events in the log output
            audit: false
        }
    }
};

// cross-orgin
app.use(cors());
//var whitelist = ['http://example1.com', 'http://example2.com']
//var corsOptions = {
//  origin: function (origin, callback) {
//    if (whitelist.indexOf(origin) !== -1) {
//      callback(null, true)
//    } else {
//      callback(new Error('Not allowed by CORS'))
//    }
//  }
//}

// Initialise the runtime with a server and settings
RED.init(server,settings);
// serve the http : admin
app.use(settings.httpAdminRoot,RED.httpAdmin);
// serve the http : nodes
app.use(settings.httpNodeRoot,RED.httpNode);
// port
server.listen(8080);
// Start the runtime
// node-red document 가면 RED runtime api 참고
RED.start().then(function(){
    console.log('BEF - RED.START');
});
/**
 * error handling
 */
// 404 page error 페이지로 넘기는 처리 방법
app.get('*', function(req,res){
    res.status(404);
    res.sendFile('/Users/choong/git/bef-NodeRED-docker/HTML/404page.html');
    // res.redirect('/error');
    // res.send('error');
    // res.end();
});
// 에러 페이지
app.get('/error', function(req,res){
    res.status(500);
    res.sendFile('/Users/choong/git/bef-NodeRED-docker/HTML/500page.html');
});
