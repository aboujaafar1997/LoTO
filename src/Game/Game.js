import React, { Component } from 'react';
const $ = window.$;
class Game extends Component {
    state = {
        socket: this.props.socket,
        nbrdata_me: [],
        nbrdata_vs: [],
        crr_me: [],
        crr_vs: [],
        vsnbr: [],
        role: this.props.role,
    }
    style = {
        "color": "white",
        "fontSize": "20px"
    }

    componentDidMount() {
        this.event();
        $("[type='number']").keypress(function (evt) {
            evt.preventDefault();
        });
    }
    render() {
        var i = 1;
        var j = 1;
        let me = this.state.nbrdata_me.map((list) => {
            return (
                <h5 id={"m" + i++} className="card-title" >{list}</h5>);
        });
        let vs = this.state.nbrdata_vs.map((list) => {
            return (
                <h5 id={"v" + j++} className="card-title">{list}</h5>);
        });
        // let crr_me = this.state.nbrdata_me.map((list) => {
        //     return (
        //         <h4 className="card-title">{list}</h4>);
        // });
        // let crr_vs = this.state.nbrdata_vs.map((list) => {
        //     return (
        //         <h4 className="card-title">{list}</h4>);

        // });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-5">
                        <div className="card text-white bg-primary mb-3" style={{ minHeight: '30rem' }} >
                            <div className="card-header">{this.props.utilisateur}</div>
                            <div className="card-body" style={this.style}>
                                <center>{vs}</center>
                                {/* {crr_vs} */}
                            </div>
                        </div>

                    </div>

                    <div className="col-5">
                        <div className="card text-white bg-info mb-3" style={{ minHeight: '30rem' }} >
                            <div className="card-header">{this.props.vs_palyer}</div>
                            <div className="card-body" style={this.style}>
                                <center>
                                    {me}</center>
                                {/* {crr_me} */}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="container">
                    <audio className="audio-element">
                        <source src="https://api.coderrocketfuel.com/assets/pomodoro-times-up.mp3"></source>
                    </audio>
                    <div className="row">
                        <div className="col-2 col-sm-2 col-xm-2 "></div>
                        <div className="col-2 col-sm-2 col-xm-2 "><input ref='r1' min="1" max="9" class="form-control" type="number" id="example-number-input1" /></div>
                        <div className="col-2 col-sm-2 col-xm-2 "><input ref='r2' min="1" max="9" class="form-control" type="number" id="example-number-input2" /></div>
                        <div className="col-2 col-sm-2 col-xm-2 "><input ref='r3' min="1" max="9" class="form-control" type="number" id="example-number-input3" /></div>
                        <div className="col-2 col-sm-2 col-xm-2 "><input min="1" max="9" ref='r4' class="form-control" type="number" id="example-number-input4" /></div>
                    </div>
                    <br />
                    <br />
                    {this.props.vsnbr.length > 0 ? this.state.role === 1 ? <button type="button" class="btn btn-light btn-lg btn-block" onClick={(e) => { const audioEl = document.getElementsByClassName("audio-element")[0]; audioEl.play(); this.setnembre() }}>send</button> : <button type="button" disabled class="btn btn-light btn-lg btn-block" onClick={(e) => this.setnembre()}>send</button> : <div><div className="loader"></div>Loding...</div>}
                </div>
            </div>
        );
    }

    setnembre = () => {
        const re = /^[1-9\b]+$/;
        if ((this.refs.r1.value === '' || re.test(this.refs.r1.value)) || (this.refs.r2.value === '' || re.test(this.refs.r2.value)) || (this.refs.r3.value || '' || re.test(this.refs.r3.value))) {

            if (this.refs.r1.value === this.refs.r2.value || this.refs.r1.value === this.refs.r3.value || this.refs.r1.value === this.refs.r4.value || this.refs.r2.value === this.refs.r1.value || this.refs.r2.value === this.refs.r3.value || this.refs.r2.value === this.refs.r4.value || this.refs.r3.value === this.refs.r1.value || this.refs.r3.value === this.refs.r2.value || this.refs.r3.value === this.refs.r4.value) {
                alert("eror nembre ! unique expmle 1234");
            }
            else {

                var data = [];
                var datafull = { nbr: data, room: this.props.room, utilisateur: this.props.utilisateur }
                data.push(this.refs.r1.value);
                data.push(this.refs.r2.value);
                data.push(this.refs.r3.value);
                data.push(this.refs.r4.value);
                this.state.socket.emit('game', datafull);
                this.refs.r1.value = "";
                this.refs.r2.value = "";
                this.refs.r3.value = "";
                this.refs.r4.value = "";
            }

        }
        else
            alert("eror nembre ! unique exmple 1234");

    }

    event = () => {
        this.state.socket.on('setnumber', (data) => {
            if (data.utilisateur === this.props.utilisateur) {
                this.setState({
                    nbrdata_me: [...this.state.nbrdata_me, data.nbr],
                    role: this.state.role * -1
                });
                this.corecteur(data.nbr, this.props.vsnbr, data.utilisateur);

            }
            else {
                this.setState({
                    nbrdata_vs: [...this.state.nbrdata_vs, data.nbr],
                    role: this.state.role * -1
                });
                this.corecteur(data.nbr, this.props.mynbr, data.utilisateur);
            }
        });
    }

    corecteur = (tab, com, utilisateur) => {
        var crr = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (tab[i] === com[j]) {
                    if (i === j) {
                        crr[i] = "V"; break;
                    }
                    else { crr[i] = "R"; break; }
                }
                else {

                    if (j == 3) {
                        crr[i] = 'F';
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        if (utilisateur === this.props.utilisateur) {
            document.getElementById("m" + this.state.nbrdata_me.length).innerHTML += "<p>" + crr[0] + "" + crr[1] + "" + crr[2] + "" + crr[3] + "</p>"
        } else {
            document.getElementById("v" + this.state.nbrdata_vs.length).innerHTML += "<p>" + crr[0] + "" + crr[1] + "" + crr[2] + "" + crr[3] + "</p>"
        }

        if (crr[0] === "V" && crr[1] === "V" && crr[2] === "V" && crr[3] === "V") {
            document.body.innerHTML = "<center><h1 style='font-size:30rem; color:'green'>" + utilisateur + " Rbaahtii nice </h1></center>"
        }
    }

} export default Game;