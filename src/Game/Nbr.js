import React, { Component } from 'react';
const $ = window.$;
class Nbr extends Component {

    state = {
        socket: this.props.socket,
    }
    componentDidMount() {
        $("[type='number']").keypress(function (evt) {
            evt.preventDefault();
        });
    }

    render() {
        return (
            <div className="container">
                <audio className="audio-element">
                    <source src="http://localhost:3000/music.mp3"></source>
                </audio>
                <div className="row">
                    <div className="col-2 col-sm-2 col-xm-2"></div>
                    <div className="col-2 col-sm-2 col-xm-2"><input min="1" max="9" ref='r1' class="form-control" type="number" id="example-number-input1" /></div>
                    <div className="col-2 col-sm-2 col-xm-2"><input ref='r2' min="1" max="9" class="form-control" type="number" id="example-number-input2" /></div>
                    <div className="col-2 col-sm-2 col-xm-2"><input ref='r3' min="1" max="9" class="form-control" type="number" id="example-number-input3" /></div>
                    <div className="col-2 col-sm-2 col-xm-2"><input ref='r4' min="1" max="9" class="form-control" type="number" id="example-number-input4" /></div>
                </div>
                <br />
                <br />
                <button type="button" class="btn btn-dark btn-lg btn-block" onClick={(e) => {this.checknembre() }}>Play</button>
            </div>
        );

    }

    checknembre = () => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.play();
        
        const re = /^[1-9\b]+$/;

        if ((this.refs.r1.value === '' || re.test(this.refs.r1.value)) || (this.refs.r2.value === '' || re.test(this.refs.r2.value)) || (this.refs.r3.value || '' || re.test(this.refs.r3.value))) {

            if (this.refs.r1.value === this.refs.r2.value || this.refs.r1.value === this.refs.r3.value || this.refs.r1.value === this.refs.r4.value || this.refs.r2.value === this.refs.r1.value || this.refs.r2.value === this.refs.r3.value || this.refs.r2.value === this.refs.r4.value || this.refs.r3.value === this.refs.r1.value || this.refs.r3.value === this.refs.r2.value || this.refs.r3.value === this.refs.r4.value) {
                alert("eror nembre ! unique exmple 1234");
            }
            else {
                var data = [];
                data.push(this.refs.r1.value);
                data.push(this.refs.r2.value);
                data.push(this.refs.r3.value);
                data.push(this.refs.r4.value);
                this.props.setnbr(data);
                this.props.setnbr0(data);

            }
        }
        else
            alert("eror nembre ! unique expmle 1234");

    }
}

export default Nbr;