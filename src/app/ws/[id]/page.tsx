import SocketClient from "../socket_client";

async function WsPage({params}:{params:Promise<{id:string}>}) {
  const id = (await params).id;
  console.log(id);
  
  return ( <div>
    <SocketClient id={id} />
  </div> );
}

export default WsPage;