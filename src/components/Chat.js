import React, { Component } from "react";
import "../chat.css";
import io from "socket.io-client";
import { connect } from "react-redux";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // {content: 'some message', self: true}
      typedMessage: "",
      changeChatSize: false,
    };
    //console.log(props);
    this.socket = io.connect("http://54.237.158.65:5000");
    this.userEmail = this.props.user.email;
    console.log(this.userEmail);
    if (this.userEmail != "") {
      this.setUpConnections();
    }
  }

  setUpConnections = () => {
    const socketConnection = this.socket;
    const self = this;
    socketConnection.on("connect", function () {
      console.log("Connection established");

      socketConnection.emit("join_room", {
        user_email: this.userEmail,
        chatroom: "codeial",
      });

      socketConnection.on("user_joined", function (data) {
        console.log("New User Joined", data);
      });
    });

    socketConnection.on("receive_message", function (data) {
      console.log(data);
      const { messages } = self.state;
      const messageObject = {};
      messageObject.content = data.message;
      if (data.user_email === self.userEmail) {
        messageObject.self = true;
      }
      self.setState({
        messages: [...messages, messageObject],
        typedMessage: "",
      });
    });
  };

  handleSubmit = () => {
    const { typedMessage } = this.state;
    console.log(typedMessage, this.userEmail);
    if (typedMessage && this.userEmail) {
      this.socket.emit("send_message", {
        message: typedMessage,
        user_email: this.userEmail,
        chatroom: "codeial",
      });
    }
  };

  toggleMinimize = () => {
    let chatContainer = document.getElementsByClassName("chat-container")[0];
    const { changeChatSize } = this.state;

    if (!changeChatSize) {
      chatContainer.style.height = "3rem";
    } else {
      chatContainer.style = chatContainerStyle;
    }
    this.setState({
      changeChatSize: !changeChatSize,
    });
  };
  render() {
    const { typedMessage, messages } = this.state;

    return (
      <div className="chat-container">
        <div className="chat-header">
          Chat
          <img
            src="https://image.flaticon.com/icons/svg/659/659892.svg"
            alt=""
            height={17}
            width={45}
            color="white"
            className="minus"
            onClick={this.toggleMinimize}
          />
        </div>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              className={
                message.self
                  ? "chat-bubble self-chat"
                  : "chat-bubble other-chat"
              }
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={typedMessage}
            onChange={(e) => this.setState({ typedMessage: e.target.value })}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    );
  }
}

function mapStateToprops(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToprops)(Chat);

const chatContainerStyle = {
  position: "fixed",
  height: "400px",
  width: "300px",
  bottom: 0,
  right: "10px",
};
