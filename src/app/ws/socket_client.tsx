'use client'

import { useEffect, useRef, useState } from "react";


function SocketClient({id}:{id:string}) {
  const [users,setUsers] = useState<string[]>([])
  const wsRef = useRef<WebSocket>(null);
  const [message,setMessage] = useState('hello')

  useEffect(()=>{
    wsRef.current  = new WebSocket(`ws://localhost:8080/ws?id=${id}`)

    wsRef.current.onopen = ()=>{
      console.log('web socket connected');      
    }
    wsRef.current.onmessage = e =>{
      
      try {
        const res = JSON.parse(e.data);
      if(Array.isArray(res)){
        var list = res as string[];
        list = list.filter(e => e != id);
        
        setUsers(list);
      }
      } catch (error) {
        console.log(e.data);
        
       console.log(error);
        
      }
      
    }

    return ()=>{
      wsRef.current?.close();
    }
  },[])

return ( <div className="row">
    <div className="user-list">
      {users.map(u =>(
        <div className="item" key={u}>{u}</div>
      ))}
    </div>
      <div className="chat-area">
        {/* message */}
        <div className="message-list">
          message list
        </div>
        <div className="send ">
          <textarea defaultValue={message} onChange={e => setMessage(e.target.value)} name="" id=""></textarea>
          <button onClick={e =>{
            wsRef.current?.send(JSON.stringify({'id':users[0],'message':message}))
          }} >Send</button>
        </div>
      </div>
  </div> );
}

export default SocketClient;