#!/usr/bin/python
import time
import socket
import paho.mqtt.client as paho
from sense import PiSenseHat

myHostname = 'iot405b'

localBroker = "iot405b"     # Local MQTT broker
localPort   = 1883          # Local MQTT port
localUser   = "pi"          # Local MQTT user
localPass = "raspberry"     # Local MQTT password
localTopic = "iot/sensor"   # Local MQTT topic to monitor
localTimeOut = 120          # Local MQTT session timeout

# The callback for when a CONNACK message is received from the broker.
def on_connect(client, userdata, flags, rc):
    print("CONNACK received with code %d." % (rc))

# The callback for when a PUBLISH message is received from the broker.
def on_message(client, userdata, msg):
    print ("on_message: " + string.split(msg.payload))

# display one row of blue LEDs (just for fun)
def displayLine(row):
    blue = (0, 0, 255)
    for i in range(0,8):
        x = i % 8
        y = (i / 8) + row
        # print("set pixel x:%d y:%d" % (x,y))
        pi_sense.set_pixel(x,y,blue)
        time.sleep(0.02)

# Create a sense-hat object
pi_sense = PiSenseHat()
print('PI SenseHat Object Created')

# Get hostname
## Get my machine hostname
# import pdb; pdb.set_trace()
if socket.gethostname().find('.') >= 0:
    hostname=socket.gethostname()
else:
    hostname=socket.gethostbyaddr(socket.gethostname())[0]

# Setup to Publish Sensor Data
mqttc = paho.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.username_pw_set(localUser, localPass)

mqttc.connect(localBroker, localPort, localTimeOut)

# initialize message dictionary
msg = {'topic':localTopic, 'payload':"", 'qos':0, 'retain':False }

pi_sense.clear_display()
# loop
print('Getting Sensor Data')
for i in range(1,3):
    print("SensorSet[%d]" % (i))
    displayLine(i-1)
    sensors = pi_sense.getAllSensors()

    sensors['host'] = hostname
    msg['payload'] = str(sensors)
    print("msg["+str(i)+"]:"+msg['payload'])

    mqttc.publish(localTopic, msg['payload'], 1)
    # mqttc.publish('iot/test', msg['payload'], 1)
    time.sleep(2.0)

print('End of MQTT Messages')
quit()
