import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from './Components/Chat';


const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatting, setChatting] = useState(false);
  
  const joinRoom = () => {
    if(username !== "" && room !== ""){
    socket.emit("join_room", room );
    setChatting(true);
    }
  };
  return (
    <div className="App">
      {chatting === false ? (
        <div>
      <input
      type="text"
      placeholder="Username..."
      value={username}
      onChange={e => setUsername(e.target.value)}
      />
      <input 
      type="number"
      placeholder="Room Number"
      value={room}
      onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}> Send Message</button> 
      </div>
       ) : (
      <Chat username={username} room={room} socket={socket} />
      )}
    </div>
  );
}

export default App;
