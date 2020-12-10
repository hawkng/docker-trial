### This is a quick reference for testing docker using GCP 

#### (A) Setup VM Instance with NodeJs
1. Create Compute Engine Instance (CentOS 8) on [GCP](https://cloud.google.com/compute/docs/instances/create-start-instance)
   * Remember to open GCP firewall port TCP 8080, 8081

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
   
#### (B) Setup Docker
1. Follow the [guide](https://docs.docker.com/engine/install/centos/) to install docker on CentOS
   - Install the yum-utils package (which provides the yum-config-manager utility) and set up the stable repository.
     ```
     $ sudo yum install -y yum-utils
 
     $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
     ```

   - Install the latest version of Docker Engine and containerd, or go to the next step to install a specific version:
      `$sudo yum install docker-ce docker-ce-cli containerd.io 

2. Start Docker Service
   `$sudo systemctl start docker`

3. Test Docker
   `$sudo docker run hello-world` 
     
   sample output:
   ```
    Hello from Docker!
    This message shows that your installation appears to be working correctly.
    ...
   ```
#### (C) Create Docker Image ([Ref](https://stackify.com/docker-build-a-beginners-guide-to-building-docker-images/))
1. Go to your App directory `cd hello-world'

2. Create a new file `vi hello-world.html` 
   ```
   <!DOCTYPE html>
   <html>
     <head>
       <title>Hello World V1.0 </title>
     </head>
     <body style="max-width:800px;margin:100px auto;text-align:center;">
         <div style='color:blue'><h2>Hello World V1.0!</a></h2></div>
         <div><h3>Sample HTML File served by NodeJs + Express (Version 1.0)</a></h3></div>
     </body>
   </html>  
   ```
3. create new file `vi Dockerfile`
   ```
   # Filename: Dockerfile
   FROM node:10-alpine
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 8080
   CMD ["npm","start"]
   ```

4. Create docker image with tagname
   `$sudo docker build -t flahwk/sample-node-app:v1 .`
       
5. Check the images with `$sudo docker images`
   ```
   REPOSITORY               TAG         IMAGE ID       CREATED          SIZE
   flahwk/sample-node-app   v1          664aa203625f   59 minutes ago   87.7MB
   ```
6. Run the image in container
   `$sudo docker run -p 8080:8080 --name nodeApp1 flahwk/sample-node-app:v1`
   open your browser and test the App with `http://[VM1 IP]:8080`  
  
7. Check container `$sudo docker ps`
   Stop Container `$sudo docker stop nodeApp1`
   Start Container `$sudo docker start nodeApp1`
   Remove Container `$sudo docker rm nodeApp1`
   
8. Push image to docker hub 
   ```
   $sudo docker login
   $sudo docker push flahwk/sample-node-app:v1
   ```

#### (D) Load Docker image in another VM
1. Create another VM and install Docker as above

2. Pull docker image `$sudo docker pull flahwk/sample-node-app:v1`

3. Run the image in container
   `$sudo docker run -p 8080:8080 --name nodeApp1 flahwk/sample-node-app:v1`
   open your browser and test the App with `http://[VM2 IP]:8080` 

#### (E) Running mutliple docker containers with different images on the same VM
1. In the first VM, edit the html `vi hello-world.html` 
   ```
   <!DOCTYPE html>
   <html>
     <head>
       <title>Hello World V2.0 </title>
     </head>
     <body style="max-width:800px;margin:100px auto;text-align:center;">
         <div style='color:red'><h2>Hello World V2.0!</a></h2></div>
         <div><h3>Sample HTML File served by NodeJs + Express (Version 2.0)</a></h3></div>
     </body>
   </html>  
   ``` 
2. Create docker image with tagname
   `$sudo docker build -t flahwk/sample-node-app:v2 .`
       
3. Check the images with `$sudo docker images` and push to docker hub `$sudo docker push flahwk/sample-node-app:v2`
   ```
   REPOSITORY               TAG         IMAGE ID       CREATED          SIZE
   flahwk/sample-node-app   v2          664aa203625f   55 minutes ago   87.7MB
   ```
4. On the 2nd VM with another console (take note this second container is running on port **8081**)
   - Pull the new docker image `$sudo docker pull flahwk/sample-node-app:v2` 
   - Run the image in container  `$sudo docker run -p8081:8080 --name nodeApp1 flahwk/sample-node-app:v1`
   - Open your browser and test the App with `http://[VM2 IP]:8081`    
   
5. Run `$sudo docker ps` to list active containers in the 2nd VM   
