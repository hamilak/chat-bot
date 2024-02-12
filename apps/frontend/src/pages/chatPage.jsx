import React, { useState } from 'react'

const chatPage = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([])
  const [isTyping, setIsTyping] = useState(false)

  const chat = async(e, message) => {
    e.preventDefault()

    if(!message){
      setIsTyping(true)
    }

    let msgs = chats
    msgs.push({ 
      role: "user", content: message 
    });
    setChats(msgs);

    setMessage("")
    alert(message)
  }

  return (
    <>
      <div>

      </div>
    </>
  )
}

export default chatPage