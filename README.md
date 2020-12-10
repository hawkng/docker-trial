### This is a quick reference for testing docker using GCP 

#### (A) Setup VM Instance 
1. Create Compute Engine Instance (CentOS 8) on [GCP](https://cloud.google.com/compute/docs/instances/create-start-instance)

2. Follow the [guide](https://linuxize.com/post/how-to-install-node-js-on-centos-7/) to install NodeJs
   - Add NodeSource yum repository
     The current LTS version of Node.js is version 10.x. If you want to install version 8 just change setup_10.x with setup_8.x in the command below.
     Run the following curl command to add the NodeSource yum repository to your system:

     `curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -`
     
   - Install Node.js and npm
     Once the NodeSource repository is enabled, install Node.js and npm by typing:
     
     `sudo yum install nodejs`
     
3. Create a sample app
   - Install [express js] (https://expressjs.com/en/starter/installing.html)
   ```
   $ mkdir hello-world
   $ cd hello-world
   $ npm init
     * Entry Point --> specify app.js
   $ npm install express --save  
   ```  
  - Edit package.json, `scripts` section
  
    "scripts": {  
      `"start": "node app.js",`       
          "test": "echo \"Error: no test specified\" && exit 1"  
      },

4. Start the app with `$npm start`, enter CTRL+C to stop
   ```
   > hello-world@1.0.0 start /home/weikeng/nodeApp/hello-world
   > node app.js

   Example app listening at http://localhost:8080
   ```
   

