import React from 'react'
import { useState } from 'react'
import ChatBox from '../Components/ChatBox'
import { ChatState } from '../Context/ChatProvider'
import "../Styles/CSS/recipeChat.css"
import { recipeModel } from '../utils/geminiModels'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import CheffyLogo from "../assets/CheffyLogo.png"

const RecipeChat = () => {
  const { recipeMessages,setRecipeMessages } = ChatState()
  const [newMessage, setNewMessage] = useState("")

  const chat=async (message)=>{
    const chatInstance = recipeModel.startChat({ history: recipeMessages });
    const result = await chatInstance.sendMessage(message);
    setRecipeMessages((prevMessages) => [
      ...prevMessages,
      { role: "model", parts: [{ text: result.response.text() }] }
    ]);
  }

  const handleSubmit = async () => {
    if (newMessage.trim()) {
      const userMessage = { role: "user", parts: [{ text: newMessage }] };
      setRecipeMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage('');
      await chat(newMessage);
    }
  }


  return (
    <div className='recipeChat'>
      <div className='recipeTitleBar'>
        <img src={CheffyLogo} alt="" className='cheffyLogo'/>
      </div>
      <div className='recipeChatContainer'>
        <div className='recipeChatBox'>
          <ChatBox messages={recipeMessages} greetText={`Let's turn those ingredients into a feast! 🍲✨`}/>
        </div>
        <div className="senderContainer">
          <div className="inputContainer">
            <textarea 
              placeholder={`Tell us those ingredients... and let's whip up a culinary masterpiece! 🍳👩‍🍳👨‍🍳`}
              value={newMessage} 
              onChange={(e) => { setNewMessage(e.target.value) }} 
              className='recipeInput' 
            />
          </div>
          <div className="buttonContainer">
            <button type="submit" onClick={handleSubmit} className='recipeSubmitButton'>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeChat