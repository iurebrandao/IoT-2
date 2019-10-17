import React, {Component} from 'react';
import lampOn from './light_on.jpg';
import lampOff from './lamp_off.png';
import './App.css';
var mqtt = require('mqtt');
let client;

class App extends Component {

  state={
    connected: false,
    loading: true,
    lampOn: false
  };



  componentDidMount(){
    let options={
      clientId:"actuator",
      username:"actuator",
      password:"mosquitto"
    };

    let ip = '172.22.0.2';
    client  = mqtt.connect('mqtt://'+ip+':9001/ws', options);

    client.on('connect', this.onConnect.bind(this));

    client.on("error",this.onConnectionLost.bind(this));

    client.on('message', this.onMessage.bind(this));

    // client.end()
  };

  onConnect() {
    this.setState({connected: true, loading: false});
    // client.subscribe('semaforo');
    client.subscribe('semaforo');
  }

  onConnectionLost(){
    console.log('deu ruim');
    this.setState({loading: false, connected: false});
  }

  onMessage (topic, message) {
    console.log(topic, message.toString());
    let lampOn = message.toString();
    if (lampOn === 'True'){
      lampOn = true;
    }
    else{
      lampOn = false;
    }
    this.setState({lampOn});
  }

  render() {
    return (
        <div className="App">

            {
              this.state.loading ?
                  (<p>loading...</p>) :
                  (
                      <p>
                        {this.state.connected ? ('Connected to broker!'): ('It was not able to connect')}
                      </p>
                  )
            }
            <br/>
            <br/>
            <br/>
            <br/>
            {
              this.state.connected ?
                  (
                      <img src={this.state.lampOn ? (lampOn):(lampOff)} />
                  ) : null
            }
        </div>
    );
  }


}

export default App;
