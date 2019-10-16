#!python3
import paho.mqtt.client as mqtt
import os
import signal
import sys
import sched
import time

s = sched.scheduler(time.time, time.sleep)

# Finalizar o script quando o usuário apertar "Ctrl+C"
def signal_handler(sig, frame):
    print('Finalizando o script...')
    client.loop_stop()
    client.disconnect()
    sys.exit(0)


# write cpg usage to log in every minute
def publish_cpu_usage(sc, client, semaforo):
    print('publicando semaforo')
    semaforo = not semaforo
    client.publish("semaforo", semaforo)
    s.enter(5, 1, publish_cpu_usage, (sc, client, semaforo))


if __name__ == "__main__":
    semaforo = False
    # definindo o cliente
    client_name = 'client'
    client = mqtt.Client(client_name)

    # definindo o acesso ao broker
    broker_address = "localhost"
    port = 1883
    timelive = 60

    client.username_pw_set(username="cliente", password="mosquito")
    client.connect(broker_address, port)

    client.loop_start()

    signal.signal(signal.SIGINT, signal_handler)

    s.enter(1, 1, publish_cpu_usage, (s, client, semaforo))
    s.run()














