#!/usr/bin/python
import time
import datetime
from sense import PiSenseHat
import paho.mqtt.client as paho
from flask import *

# create Pi SenseHat Object
pi_sense_hat = PiSenseHat()

# ============================== Functions ====================================
def get_sensor_values():
    return pi_sense_hat.getAllSensors()

# ============================== API Routes ===================================
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

# =========================== Endpoint: /myData ===============================
# read the sensor values by GET method from curl for example
# curl http://iot405b.local:5000/myData
# -----------------------------------------------------------------------------
@app.route('/myData')
def myData():
    def get_values():
        while True:
            # return the yield results on each loop, but never exits while loop
            data_obj = get_sensor_values()
            yield('data: {0}\n\n'.format(data_obj))
            time.sleep(0.25)
    return Response(get_values(), mimetype='text/event-stream')
# ============================== API Routes ===================================

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, threaded=True)
