import React, { Component } from 'react';
import Game from './Game';
import Nbr from './Nbr';

class Prinipale extends Component {
    state = {
        Nbr: [],
        socket: this.props.socket,
        vs_player: ""
    }
    componentDidMount() {

        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play();
    }

    render() {
        return (
            <div>
                <audio className="audio-element">
                    <source src="http://localhost:3000/music.mp3"></source>
                </audio>
                {this.state.Nbr.length === 4 ? <Game  mynbr={this.props.mynbr} vsnbr={this.props.vsnbr} role={this.props.role} room={this.props.room} vs_palyer={this.props.vs_palyer} utilisateur={this.props.utilisateur} players={this.props.players} socket={this.state.socket} /> : <Nbr socket={this.state.socket} setnbr={this.props.setnbr} setnbr0={this.setnbr0} />}
            </div>
        );

    }


    setnbr0 = (data) => {
        this.setState({ Nbr: data })

    }
} export default Prinipale;