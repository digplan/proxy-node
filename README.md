proxy-node
==========

Proxy incoming HTTP requests to multiple targets/ports based on the url.    
Use for hosting many web domains on the same server.    
Create a servers.json file in the same directory.    
````
{
    "servers":{
      "myweb1.com" : "127.0.0.1:3000"
      ,"myweb2.com" : "127.0.0.1:3001"
  }
}
````

Then, just start it up..    

$ node proxy          (proxy on port 80)    
$ node proxy 81       (on port 81)    
$ node proxy 81 debug (debug to console.log)    
