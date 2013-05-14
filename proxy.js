var colors = require('colors'),
    url = require('url'),
    http = require('http'),
    acceptor = http.createServer().listen(process.argv[2] || 80),
    servers = require('./servers.json'),
    debug = !!(process.argv.length > 3 && process.argv[3]=='debug');

if(debug) console.log(servers.servers);
process.on('uncaughtException', console.log);

acceptor.on('request', function(r, s) {
    r.headers['x-forwarded-for'] = r.socket.remoteAddress;
    var host = r.headers.host.replace('www.','');
    if(debug){
         console.log('**************')
         console.log('HOST:'.green, host);
         console.log('URL:'.green, r.url);
         console.log('RemoteAddress:'.green, r.socket.remoteAddress);
         console.log('UA:'.green, r.headers['user-agent']);
         console.log('Resolves to:'.green, servers.servers[host])
    }
    if(servers.servers[host]){
        var options = url.parse('http://' + servers.servers[host] + r.url);
        options.headers = r.headers; options.method = r.method; options.agent = false;
        var connector = http.request(options, function(serverResponse) {
            s.writeHeader(serverResponse.statusCode, serverResponse.headers);
            serverResponse.pipe(s);
        })
        r.pipe(connector);
    } else {
        s.writeHead(404)
        s.end();
    }
})
