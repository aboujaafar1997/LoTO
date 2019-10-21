import React, { Component } from 'react';
class Modal extends Component {

  render() {



    return (

      <center>
        <div class="card" style={{ width: '30rem' }}>
          <h5 class="card-header info-color white-text text-center py-4">
            <strong>Lanch game: write your name </strong>
          </h5>
          <br></br>
          <div class="card-body px-lg-5 pt-0">

            <div class="text-center" style={{ color: '#757575' }} >

              <div class="md-form">
                <input ref="cpDev2" id="materialLoginFormEmail" class="form-control" />
              </div>
              <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" onClick={(e) =>this.sendname(e) }>GO</button>

            </div>
          </div>
        </div>
      </center>




    );
  }
  sendname = async (e) => {
    let data={name:this.refs.cpDev2.value}
    e.preventDefault();
    this.props.namechange(this.refs.cpDev2.value);
    await fetch("http://localhost:4000/add?nom=join:"+this.refs.cpDev2.value, {
      method: 'GET',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Origin':'http://localhost:4000',
        'Accept':'application/json'
      })
    })
  
  // const response = await fetch('https://jsonplaceholder.typicode.com/users');
  // const users = await response.json();

}

}

export default Modal;
