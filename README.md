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

Block requests by *ANY* NodeJS http Request variable and Regex - simple!

block.json   
````
{
	"headers": {
		"user-agent": "chrome"  // regex value, case insensitive
	}
}
````

Then, just start it up..    

$ node proxy          	(proxy on port 80)    
$ node proxy 81       	(on port 81)    
$ debug=1 node proxy 81 (debug to console.log)    
