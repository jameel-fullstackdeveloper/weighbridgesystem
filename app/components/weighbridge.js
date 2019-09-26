import React, { useState, useEffect  } from "react";
import socketIOClient from "socket.io-client";
import {useToasts } from 'react-toast-notifications'

const weglabel = {
  color : 'red',
};

const Weighbridge = () => {
  const [response, setResponse] = useState(false);
  const [endpoint, setEndpoint] = useState('http://172.16.1.205:8888');
  const { addToast } = useToasts()

  useEffect(() => {
    const socket = socketIOClient(endpoint);
    socket.on("data", message =>
        setResponse(message.data.slice(8, 14))
     );
    socket.on("disconnect", message =>
      setResponse(message.data)
    );
  }, []);

  return (
      <React.Fragment>
          { response ? response : <span style={weglabel}>Device not connected.</span> }
      </React.Fragment>
    
    );
}

export default Weighbridge;