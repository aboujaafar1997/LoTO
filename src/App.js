import React, { Component } from 'react';
import Modal from './modal';
import RoomTable from './room/RoomTable';
import ChatBox from './ChatBox/ChatBox';
import Game from './Game/Principale';
import openSocket from 'socket.io-client'
const $ = window.$;
const fs = require('fs');
// const socket = openSocket("http://desktop-4k5e3lr:4000");
const socket = openSocket("127.0.0.1:4000");
class App extends Component {
  state = {
    utilisateur: "",
    socketid: "",
    roomList: [],
    room: "",
    nembre: "",
    date_heur: "",
    vs_palyer: "",
    fatalerr: 0,
    role: "",
    mynbr: [],
    vsnbr: []
  }
  componentDidMount() {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      socket.emit("romoveRoom", this.state.room);
      (e || window.event).returnValue = confirmationMessage; //Gecko + I
      return confirmationMessage;                            //Webkit, Safari, Chrome
    });
    socket.emit("getroomList", {});
    socket.on("roomList", (data) => {
      this.setState({ roomList: data })
    });
    socket.on('getvsnember', (data) => {
      if (data.nbrvs.length > 0 && data.utilisateur !== this.state.utilisateur) {
        this.setState({ vsnbr: data.nbrvs });
      }
    });

  }
  componentWillUnmount() {
    $(window).on("beforeunload", function () {
      socket.emit("romoveRoom", this.state.room);
    });
    socket.on("roomList", (data) => {
      this.setState({ roomList: data })
    });

  }
  render() {

    return (
      <div className="container">
        <div class="speaker"></div> <span>Music</span>

        <audio id="player">
          <source src="http://localhost:3000/music.mp3" type="audio/mp3" />
        </audio>
        <audio className="audio-element">
          <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
        </audio>
        <center><h1>React Game</h1></center>
        <br></br>
        <h4>Room name : <strong>{this.state.room}</strong></h4>
        <br></br>
        {this.state.utilisateur === "" && this.state.room === "" ? <Modal socket={socket} namechange={this.namechange} /> : <div></div>}
        {this.state.utilisateur !== "" && this.state.room === "" ? <RoomTable role_changer={this.role_changer} role={this.state.role} socket={socket} room={this.room} list={this.state.roomList} /> : <div></div>}
        {this.state.utilisateur !== "" && this.state.room !== "" ? <div><Game vsnbr={this.state.vsnbr} mynbr={this.state.mynbr} setnbr={this.setnbr} role={this.state.role} room={this.state.room} vs_palyer={this.state.vs_palyer} utilisateur={this.state.utilisateur} players={this.playerjoin} socket={socket} /><ChatBox vs_palyer={this.state.vs_palyer} room={this.state.room} socket={socket} utilisateur={this.state.utilisateur} /></div> : <div></div>}
      </div>
    );
  }
  namechange = (name,e) => {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play();
    if (name !== "") {
      this.setState({
        utilisateur: name
      });
    }
    else {
      alert("oops name incorect !")
    }
  }
  room = (name, i, ok0, pool) => {
    if (pool < 2) {
      var data = { room: name, table: i, change: ok0, name: this.state.utilisateur }
      socket.emit('joinroom', data);
      this.setState({
        room: name,
        nembre: i,
        role: -1
      })
    } else {
      alert("server full ! max size is 2 ");
    }
    socket.on("players", (data) => {
      var test = data.players.map((list) => {
        if (this.state.utilisateur !== list) {
          this.playerjoin(list);
          alert("game started enjoy ! the vs is type his number ...");
        }
        if (this.state.utilisateur === list) {
          this.setState({ fatalerr: this.state.fatalerr + 1 });
          this.fatal();
        }
        return 0;
      });
    });
  }
  playerjoin = (player) => {
    if (this.state.fatalerr === 2) {
      this.fatal();
    }
    else {
      this.setState({
        vs_palyer: player
      });
      setTimeout(() => {
        var data2 = { room: this.state.room, nbrvs: this.state.mynbr, utilisateur: this.state.utilisateur }
        socket.emit('vsnember', data2);
      }, 2000);

    }
  }
  fatal = () => {
    if (this.state.fatalerr === 2) {
      alert("fatal err");
      window.location.reload(false);
      window.location.reload();
    }
  }
  role_changer = (role) => {

    role === "admin" ? this.setState({ role: 1 }) : this.setState({ role: -1 })
  }

  setnbr = (data) => {
    this.setState({ mynbr: data })
    var data2 = { room: this.state.room, nbrvs: data, utilisateur: this.state.utilisateur }
    socket.emit('vsnember', data2);
  }
}



export default App;
