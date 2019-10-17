import React, {Component} from 'react';
import './App.css';
var mqtt = require('mqtt');

const ip = '172.22.0.2';
const options={
  clientId:"app1",
  username:"application",
  password:"mosquitto"
};
var client = mqtt.connect('mqtt://'+ip+':9001/ws', options);

class App extends Component {

  state={
    connected: false,
    loading: true,
    lampOn: false,
  };

  componentDidMount(){
    client.on('connect', this.onConnect.bind(this));

    client.on("error",this.onConnectionLost.bind(this));

    let lamp = this.state.lampOn ? "True" : "False";

    client.publish('semaforo', lamp);
  };

  onConnect() {
    this.setState({connected: true, loading: false});
  }

  onConnectionLost(){
    console.log('deu ruim');
    this.setState({loading: false, connected: false});
  }

  changeStatus (e) {
    let newValue = !this.state.lampOn;
    this.setState({lampOn: newValue});
    let lamp = newValue ? "True" : "False";
    client.publish("semaforo", lamp);
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
          <p>Change the value below:</p>
          {
            this.state.connected ?
                (
                    <div>
                      <div>
                        <label className="switch">
                          <input type="checkbox" onChange={ () => this.changeStatus()} value={this.state.lampOn}/>
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                ) : null
          }
        </div>
    );
  }


}

export default App;
