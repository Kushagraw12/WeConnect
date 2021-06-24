import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from "@material-ui/core";
import "./Chat.css";
import { AttachFile, SearchOutlined } from '@material-ui/icons';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import Button from '@material-ui/core/Button';
// import {useParams} from 'react-router-dom';
import db from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from "firebase";
// import { useStateValue } from '../StateProvider';

// BURGERS ORDER KRRE HUE HAI, UNKA WAIT KRRA, USKE BAAD HOPEFULLY!!!! 

function Chat() {
    const [input, setInput]=useState("");
    const [seed, setSeed] = useState('');
    // const { roomId } = useParams();
    const [roomName, setRoomName] =useState("");
    const userName1 = "Ansj";   
    const [messages, setMessages]= useState([]);

    function AddToFirebase(e) {
        e.preventDefault();
        console.log("CALLED ADDTOFIREBASE!");

        db.collection("rooms").doc(`hYPogJ5mDjZrLj5GD0cw`).collection("messages").add({
            time: firebase.firestore.FieldValue.serverTimestamp(),
            text: input,
            sender: userName1
        })
        .then(() => {
            console.log(`Message written inside Room Number:  successfully written!`);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setInput("");
    };


    /// GET MESSAGES FROM A ROOM
    const roomies = db.collection("rooms")
    const roomsRef = roomies.doc(`hYPogJ5mDjZrLj5GD0cw`)
    const messagesRef = roomsRef.collection("messages");
    const query = messagesRef.orderBy('time',"asc");
    const [messag] = useCollectionData(query, { idField: 'id' });
    const [rrrr] = useCollectionData(roomies, { idField: 'id' });


    useEffect(() => {
        roomsRef.get().then((snap) => {console.log("S:",snap.data());});
    }, [roomsRef])
    
    console.log(rrrr);
    console.log(messag);

    // let el = null;
    // if (messag) {
    //     el = <div className={styles.ell}>
    //             {messag.map((m) => {return(
    //                 <div className={styles.messageRoom}>
    //                     <div className={styles.chas}>
    //                     <div className={styles.messagesDiv}>
    //                         <div className={styles.messages}>
    //                             <p className={m.user === userName1 ? styles.sender : styles.reciever}>{m.txt}</p>
    //                             {/* <p className={styles.timesptamp}>{Date(m.time)}</p> */}
    //                         </div>
    //                     </div>
    //                     </div>
    //                 </div>
    //                 )})}
    //         </div>
    // }








    // // const [ { user }, dispatch ] =useStateValue();

    // // console.log("UUU", user);

    // const logOut = (e) => {
    //     e.preventDefault();
    //     localStorage.clear();
    //     window.location.href="/login";
    // }

    // useEffect( ()=> {
    //  if(roomId){
    //      db.collection("rooms").doc(roomId).onSnapshot( snapshot => (
    //          setRoomName(snapshot.data().title)
    //      ))
    //      db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp', 'asc').onSnapshot( snapshot =>(
    //          setMessages(snapshot.docs.map((doc) => doc.data())))
    //      );
    //  }
    //  console.log(messages)
    // //  console.log(db.collection('rooms').doc(roomId).collection("messages"));
    // }, [roomId]);

    // useEffect( () => {
    //     setSeed(Math.floor(Math.random() * 5000));
    //     }, [roomId]);

    // const sendMessage= (e) => {
    //     e.preventDefault();
    //     console.log("You typed >>>", input);
    //     db.collection('rooms').doc(roomId).collection('messages').add({
    //        message: input,
    //         name: user.displayName,
    //         timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //     });

    //     setInput("");
    // };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    
            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen{" "}
                {new Date(
                    messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
                    </p>
            </div>
                <div className="chat_headerRight">
                    <VideocamRoundedIcon />
                    <PhoneRoundedIcon />
                    {/* <Button onClick={logOut}>Logout</Button> */}
                </div>
            </div>
            <div className="chat_body">
                {/* {messages.map((message) => (
                 <p className={`chat_message ${message.name === user.displayName && `chat_receiver`}`}>
                    <span className="chat_name">{message.name}</span>{message.message}
                    <span className="chat_timestamp">{new Date(message.timestamp?.toDate
                    ()).toUTCString()}</span>
                </p>
                ))} */}
            
            </div>
            <div className="chat_footer">
              <form>
                  <input value={input} onChange={ (e) => setInput(e.target.value)} type="text" placeholder="Type a message" />
                  <Button onClick={AddToFirebase} type="submit" disabled={input.length<1}>Send</Button>
              </form>
            </div>
        </div>
    )
}

export default Chat;
