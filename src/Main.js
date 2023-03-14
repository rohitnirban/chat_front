import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from './appContext';
import './Main.css'

const Main = (props) => {


    const { socket } = useContext(AppContext);
    const { name } = props
    useEffect(() => {
        socket.emit('new-user', name);
    }, [name, socket]);

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState([]);

    const handleSumbit = (e) => {
        e.preventDefault();
        socket.emit('message', message);
        setShowMessage([...showMessage, { msg: message, isSent: true }]);
        setMessage('');
    };

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setShowMessage((prevMessages) => [...prevMessages, { msg, isSent: false }]);
        });
        // socket.on('message-sent', (msg) => {
        //     setShowMessage((prevMessages) => [...prevMessages, { msg, isSent: true }]);
        // });
        return () => {
            socket.off('chat message');
            // socket.off('message-sent');
        };
    }, [socket]);

    const messagesRef = useRef();
    useEffect(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [showMessage]);

    // const tick_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB60lEQVR4nO3YP6iNcRzH8eN/ShLDHQwGKZkMYrAoSroGpKQMJotsjGxWRoMMFhnZGAxume5kEMXAubmlJErIv5d+OeV4zu9czz3f43fP8HvXs72f53w+z/N7fr/z/DqdSqVSqVQqkwUO4zW6ODQutyjYjc/+0B2HWxRsxry/eRl1i4K1mG0E+4kTEbcoWIZbBrkccYuDS5lgd7A84hYFR/GjEewJ1kfcomAnPjaCvcXWiFsUTOFVI9hX7Iu4RcFqPMyM9TMRtzi4ngl2JeoWBRcywe5jZcQtCg7ieyPYM2yIuEXBdrxvBHuHbRG3KNiI541g37A/4hYFq/AgM9bPRtzi4Fom2I2oWxScywSbSWtDxF2Q9HWFud5xpBMEB3pju58X2BRx/0mvQP/LNfJ/+zS79GaZfj5gR8QdpcjIZdI8j6eNa6X1YDritiYNp8zjXVQZrMC9zFg/H3EXDY5nyqQ7dKrl+VczwW5G3aJlcDoT7BHWRNyiZbAXXxp++n6YirhFy2AL3jS8T9iVuWZrt2gZrMPjlls4rd3/QvqhIbPZSdw1yMXMAntsIbcY8mVy3E77TkPWpaHupJWZTTuAff5cW3eSysynvdgWC2zWXRIMTgBpN3xP1F0S/L7b3d4xPS63UqlUKpXOEvMLL0qUfU9KJFoAAAAASUVORK5CYII="

    return (
        <>
            <div className='container'>
                <ul ref={messagesRef} className="messages">
                    {showMessage.map((messageObj, index) => (
                        <li
                            key={index}
                            className={`message ${messageObj.isSent ? 'sent' : 'received'}`}
                        >
                            <p className='user'>{messageObj.msg.username}</p>
                            {messageObj.msg.text ? messageObj.msg.text : messageObj.msg}
                            {console.log(messageObj)}
                            <p className='time'>{messageObj.msg.time}</p>
                            {/* {messageObj.isSent ?
                                <img src={tick_img} className="tick_img"></img>
                                : ''} */}
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleSumbit} className="form">
                    <input type="text" placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} className="inputForm" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
};

export default Main;
