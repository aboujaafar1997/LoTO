import React, { Component } from 'react';


class RoomTable extends Component {
    state = {
        socket: this.props.socket,
        role:0,
        data1: this.props.list,
        data2: this.props.list
    }

    render() {
        var i = 1
        let list2 = this.state.data2.map((list) => {
            return <tr key={i}>
                <th scope="row" >{i++}</th>
                <td>{list.room}</td>
                <td>{list.contry}</td>
                <td>{list.pool}/2</td>
                <td><button className="btn btn-outline-danger my-2 my-sm-0" onClick={(e) => this.props.room(list.room, i - 1,'ok',list.pool)}>Join</button></td>
            </tr>
        });
        return (
            <div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Room name</label>
                        <input ref="cpDev1" type="text" class="form-control" placeholder="my_room" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputPassword4">Contry</label>
                        <input ref="cpDev2" type="text" class="form-control" placeholder="morroco" />
                    </div>
                    <br />
                    <button type="button" class="btn btn-dark btn-lg btn-block" onClick={(e) => this.createroom()}>Create</button>
                </div>
                <br />
                <br />
                <div class="form-group col-md-8">
                    </div>
                <div class="form-group col-md-4">
                        <input  type="text" class="form-control" placeholder="search" onChange={(e)=>this.recherche(e)} />
                    </div>
                <table class="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">RoomName</th>
                            <th scope="col">Contry</th>
                            <th scope="col">pool</th>
                            <th scope="col">Join</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list2}
                    </tbody>
                </table>

            </div>
        );
    }
    recherche=(e)=>{ 
        this.setState({
          data2: this.state.data1.filter((data) => data.room.toUpperCase().startsWith(e.target.value.toUpperCase())===true)
        });
      }
    createroom = () => {
        console.log("new room by name : " + this.refs.cpDev1.value)
        this.state.socket.emit('addRoom', {
            "room": this.refs.cpDev1.value,
            "contry": this.refs.cpDev2.value,
            "pool": 1

        });
            this.state.socket.on("nbr", (data) => {
            this.props.room(this.refs.cpDev1.value,'non', data - 1,0);
            this.props.role_changer("admin")
        });


    }

} export default RoomTable;