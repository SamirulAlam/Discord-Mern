import React, { useEffect, useState } from 'react';
import "./Chat.css";
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CradGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmoticonsIcon from '@material-ui/icons/EmojiEmotions'
import ChatHeader from './ChatHeader';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import {selectChannelId,selectChannelName} from './features/appSlice';
import firebase from "firebase"
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher('2d5c9b126c78e10f60ba', {
    cluster: 'ap2'
  });


function Chat() {

    const user = useSelector(selectUser);
    const channelId= useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([]);
    


    const getConversation=(channelId)=>{
        if(channelId){
            axios.get(`/get/conversation?id=${channelId}`)
            .then((res)=>{
                setMessages(res.data[0].conversation)
            })
        }
    }
    useEffect(()=>{
        getConversation(channelId) ;

        const channel = pusher.subscribe('conversation');
        channel.bind('newMessage', function(data) {
            getConversation(channelId)
        });
    },[channelId])

    const sendMessage =(e)=>{
        e.preventDefault();
        axios.post(`/new/message?id=${channelId}`,{
            message:input,
            timestamp:Date.now(),
            user:user
        })
        setInput("")
    }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {messages.map((message)=>(
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user}
                    />
                ))}
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form action="">
                    <input 
                        value={input} 
                        disabled={!channelId}
                        onChange={(e)=>setInput(e.target.value)} 
                        type="text" 
                        placeholder={`Message #${channelName}`}/>
                    <button 
                    disabled={!channelId}
                    onClick={sendMessage}
                    className="chat__inputButton" type="submit">Send</button>
                </form>
                <div className="chat__inputIcons">
                    <CradGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmoticonsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
