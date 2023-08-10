import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL, formatDateDDMMMYYYY, formatTimeHHMM } from "../../Constants";

class TodoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: "",
      todoList: [],
      newTodo: "",
    };
    this.chatBoxRef = React.createRef();
    this.ws = new WebSocket("ws://20.151.210.84:8080/chat"); // Chat WebSocket URL
  }

  closeWebSocket = () => {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      console.log("Closing WebSocket connection");
      this.ws.close();
    }
  };

  componentDidMount() {
    this.ws.addEventListener("open", this.handleWebSocketOpen);
    this.ws.addEventListener("message", this.handleMessageReceived);
    this.fetchChatMessages();
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.ws.removeEventListener("open", this.handleWebSocketOpen);
    this.ws.removeEventListener("message", this.handleMessageReceived);
    this.closeWebSocket();

  }

  handleWebSocketOpen = () => {
    console.log("WebSocket connection established");
  };

  sendWebSocketMessage = (message) => {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
    this.scrollToBottom();
  };
   handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.sendChatMessage();
    }
  };
  

  handleMessageReceived = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received message:", data);
    if (data.contentType === "txt" || data.contentType === "img") {
      const message = {
        senderId: data.senderId, // Replace with the sender's ID or a unique identifier
        senderName: data.senderName, // Replace with the sender's name or ID
        content: data.content,
        contentType: data.contentType,
        date: data.date,
      };
      this.setState((prevState) => ({
        messages: [ message, ...prevState.messages],
      }));
      this.scrollToBottom();
    }
  };

  fetchChatMessages = async (page = 0) => {
    try {
      const response = await axios.get(
        `http://20.151.210.84:8080/api/chat/messages?page=${page}`
      );
      const messages = response.data;
      console.log("Fetched chat messages:", messages);
      this.setState({ messages }, () => {
        this.scrollToBottom();
      });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  sendChatMessage = async () => {
    const { newMessage } = this.state;

    if (newMessage.trim() !== "") {

      const message = {
        senderId: 1, // Replace with the sender's ID or a unique identifier
        senderName: "Admin", // Replace with the sender's name or ID
        content: newMessage,
        contentType: "txt",
        date: new Date().toISOString(),
      };

      try {
        // Send the message using a POST request
        await axios.post("http://20.151.210.84:8080/api/chat", message);

        // Update the state to display the message in the chat
        this.setState(
          (prevState) => ({
            messages: [
              ...prevState.messages,
              {
                id: Date.now(),
                text: newMessage,
                sender: "Admin",
              },
            ],
            newMessage: "",
          }),
          () => {
            this.scrollToBottom();
            // this.fetchChatMessages();
          }
        );
      } catch (error) {
        console.error("Error sending chat message:", error);
      }
    }
    else {
      window.alert("Please enter a message");
    }
  };

  handleChatMessageChange = (event) => {
    this.setState({ newMessage: event.target.value });
  };

  addTodo = async () => {
    const { newTodo } = this.state;
    try {
      const response = await axios.post(
        "http://20.151.210.84:8080/api/todo",
        { text: newTodo, completed: false }
      );
      const todoItem = response.data;
      this.setState((prevState) => ({
        todoList: [...prevState.todoList, todoItem],
        newTodo: "",
      }));
    } catch (error) {
      console.error("Error adding todo item:", error);
    }
  };

  handleTodoChange = async (index) => {
    const { todoList } = this.state;
    const updatedTodoList = [...todoList];
    updatedTodoList[index].completed = !updatedTodoList[index].completed;
    this.setState({ todoList: updatedTodoList });

    // Send the updated todo to the server
    try {
      await axios.put(
        `http://20.151.210.84:8080/api/todo/${updatedTodoList[index].id}`,
        { ...updatedTodoList[index] }
      );
    } catch (error) {
      console.error("Error updating todo item:", error);
    }
  };

  handleTodoInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  scrollToBottom = () => {
    if (this.chatBoxRef.current) {
      this.chatBoxRef.current.scrollTop = this.chatBoxRef.current.scrollHeight;
    }
  };

  render() {
    const { messages, newMessage, todoList, newTodo } = this.state;

    return (
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title box-title">To Do List</h4>
              <div className="card-content">
                <div className="todo-list">
                  <div className="tdl-holder">
                    <div className="tdl-content">
                      <ul>
                        {todoList.map((todo, index) => (
                          <li key={index}>
                            <label>
                              <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.handleTodoChange(index)}
                              />
                              <i className="check-box"></i>
                              <span>{todo.text}</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="add-items d-flex">
                <input
                  type="text"
                  className="form-control todo-list-input"
                  placeholder="What do you need to do today?"
                  value={newTodo}
                  onChange={this.handleTodoInputChange}
                />
                <button
                  className="add btn btn-primary font-weight-bold todo-list-add-btn"
                  onClick={this.addTodo}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card card-primary direct-chat direct-chat-success">
            <div className="card-header">
              <h4 className="card-title">Live Chat</h4>
            </div>
            <div className="card-body" >
              <div ref={this.chatBoxRef} className="direct-chat-messages">
                {messages.slice(0).reverse().map((message) => {
                  const formattedTime = formatDateDDMMMYYYY(message.date);
                  const formattedDate = formatTimeHHMM(message.date);
                  return (
                    message.content !== "" && (
                      <div
                        className={
                          message.senderName === "Admin"
                            ? "direct-chat-msg right"
                            : "direct-chat-msg"
                        }
                        key={message.id}
                      >
                        <div className="direct-chat-infos clearfix">
                          <span className="direct-chat-name float-right">
                            {message.senderName}
                          </span>
                          <span className="direct-chat-timestamp float-left">
                            {formattedDate} {formattedTime}
                          </span>
                        </div>
                        <img
                          className="direct-chat-img"
                          src={
                            message.senderName === "Admin"
                              ? "/docs/3.0/assets/img/user3-128x128.jpg"
                              : "/docs/3.0/assets/img/user1-128x128.jpg"
                          }
                          alt={message.senderName}
                        />
                        <div className="direct-chat-text">
                          {message.contentType === "txt" ? (
                            // Render the text content if contentType is "txt"
                            message.content
                          ) : message.contentType === "img" ? (
                            // Render the image if contentType is "img"
                            <img src={`${API_BASE_URL}/${message.content}`} alt="Received data"
                              style={{ width: '150px', height: 'auto' }} />
                          ) : null}
                        </div>

                      </div>
                    )
                  )
                })}
              </div>
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input type="text" name="message" placeholder="Type Message ..." className="form-control" value={newMessage} onChange={this.handleChatMessageChange}
                onKeyDown={this.handleKeyDown}
                >
                </input>
                <label htmlFor="imageInput">
                  <i className="fas fa-paperclip"></i>
                </label>
                <input
                  type="file"
                  name="image"
                  id="imageInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                // onChange={handleImageSelect}
                />
                <span className="input-group-append">
                  <button type="button" className="btn btn-primary" onClick={this.sendChatMessage} >Send</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TodoChat;
