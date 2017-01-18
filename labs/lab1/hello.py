from flask import Flask
import socket

## Get my machine hostname
if socket.gethostname().find('.') >= 0:
    hostname=socket.gethostname()
else:
    hostname=socket.gethostbyaddr(socket.gethostname())[0]

## Create the Flash Webserver app
app = Flask(__name__)

## Establish the default route
@app.route("/")
def hello():
    return "Hello IoT World from RPi3: " + hostname

## Run the website and make sure to make
##  it externally visible with 0.0.0.0:5000 (default port)
if __name__ == "__main__":
    app.run(host='0.0.0.0') 
