proxy-node
==========

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
