import React, { Component } from "react";
import io from "socket.io-client";
import ChatCard from "./ChatCard";
import moment from "moment";
import { connect } from "react-redux";
import { getChats, afterPostMessage } from "../../actions/chat_actions";
import { logoutUser } from "../../actions/user_actions";

class Chat extends Component {
    state = {
        chatMessage: "",
        chatMessages: []
    };

    componentDidMount() {
        document.title = "John Ahn | Chat";
        this.props.dispatch(getChats());

        let server = "https://immense-garden-31720.herokuapp.com";

        const env = process.env.NODE_ENV;

        if (env === "development") {
            server = "http://localhost:5000";
        }

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        });

    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    submitChatMessage = event => {
        event.preventDefault();

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in to start chatting ^ ^')
        }

        let chatMessage = this.state.chatMessage;
        let userID = this.props.user.userData._id;
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();


        this.socket.emit("Input Chat Message", {
            chatMessage,
            userID,
            userName,
            userImage,
            nowTime
        });
        this.setState({ chatMessage: "" });
    };


    logoutHandler = () => {
        this.props.dispatch(logoutUser()).then(response => {
            if (response.payload.success) {
                this.props.history.push("/login");
            }
        });
    };

    handleSearchChange = event => {
        this.setState({
            chatMessage: event.target.value
        });
    };

    //this.props.user.userData._id === chat._id

    renderCards = () =>
        this.props.chats.chats
            ? this.props.chats.chats.map((chat) => (
                <ChatCard
                    key={chat._id}
                    {...chat}
                    user={chat.sender}
                />
            ))
            : null;

    render() {
        let disabled;
        if (!this.state.chatMessage.trim()) {
            disabled = "disabled";
        }

        return (
            <div className="container">
                <div className="card-panel">
                    <h4 className="center-align">Real Time Chat</h4>
                </div>
                <div style={{ maxHeight: "65vh", overflowY: "scroll" }}>
                    {this.props.chats ? (
                        <div>{this.renderCards()}</div>
                    ) : (
                            <div>
                                <h4 className="center-align red lighten-2">
                                    Be the first person to chat.
              </h4>
                            </div>
                        )}

                    <div
                        ref={el => {
                            this.messagesEnd = el;
                        }}
                        style={{ float: "left", clear: "both" }}
                    />
                </div>

                <div className="row">
                    <form
                        className="col s12"
                        onSubmit={event => this.submitChatMessage(event)}
                    >
                        <div className="input-field col s10">
                            <input
                                id="input_text"
                                type="text"
                                className="validate"
                                data-length="100"
                                value={this.state.chatMessage}
                                onChange={this.handleSearchChange}
                            />
                            <label htmlFor="input_text">Let's chat...</label>
                        </div>
                        <div className="input-field col s2">
                            <button
                                onSubmit={event => this.submitChatMessage(event)}
                                className={`btn waves-effect waves-light red accent-1 ${disabled}`}
                            >
                                Send
                  <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>


                {this.props.user.userData && !this.props.user.userData.isAuth
                    ?
                    <button href="/login">
                        Login
                    </button>
                    :
                    null}

                {this.props.user.userData && this.props.user.userData.isAuth
                    ?
                    <button onClick={() => this.logoutHandler()}>
                        LogOut
                    </button>
                    :
                    null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        chats: state.chats,
        user: state.user
    };
};

export default connect(mapStateToProps)(Chat);
