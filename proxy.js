var url = require('url'),
    http = require('http'),
    acceptor = http.createServer().listen(process.argv[2] || 80),
    servers = require('./servers.json'),
    block = require('./block.json'),
    debug = process.env.debug;

console.log(servers.servers);
process.on('uncaughtException', console.log);

acceptor.on('request', function(r, s) {
    for(i in block){
        for(v in block[i]){
            var rx = RegExp(block[i][v], 'i');
            console.log(r[i][v], rx)
            if(r[i][v].match(rx)){
                if(debug) console.log('BLOCKED', r[i][v], rx);
                return s.end();
            }
        }
    }
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
