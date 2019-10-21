import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
class ChatBox extends Component {

  state={
    socket:this.props.socket,
    messageList: [],

}
  componentDidMount() {
    this.props.socket.on('chatrom', (data) => {
      console.log(data.nom);
      if (data.nom === this.props.utilisateur) {
        this.setState({
          messageList: [...this.state.messageList, data.message]
        })
      }
      else {
        data.message.author="them";
        this.setState({
          messageList: [...this.state.messageList, data.message]
        })
      }
    });

  }

  _onMessageWasSent(message) {
    this.props.socket.emit('chat', {
      message: message,
      nom: this.props.utilisateur,
      room: this.props.room
    });



  }

  _sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
    }
  }






  render() {
    return (<div>
      <Launcher
        agentProfile={{
          teamName: this.props.vs_palyer,
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        messageList={this.state.messageList}
        showEmoji
      />
    </div>)
  }
} export default ChatBox;




