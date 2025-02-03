'use client';

import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<
    { message: string; sender: string }[]
  >([
    {
      message: 'สวัสดีค่ะ! ฉันสามารถช่วยอะไรคุณได้บ้าง?',
      sender: 'ChatGPT',
    },
  ]);
  const [typing, setTyping] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSend = async (message: string) => {
    const newMessage = { message, sender: 'user', direction: 'outgoing' };
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (
    chatMessages: { message: string; sender: string }[]
  ) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: 'system',
      content: 'คุณคือผู้ช่วยที่เป็นมิตรและช่วยเหลือผู้ใช้',
    };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        apiRequestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const chatGPTResponse = response.data.choices[0].message.content;
      const newMessage = { message: chatGPTResponse, sender: 'ChatGPT' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setTyping(false);
    }
  };

  // ฟังก์ชันปิดโมดัลเมื่อคลิกนอกพื้นที่
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === 'modal-overlay') {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {/* ปุ่มเปิดหน้าต่างแชท */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white p-4 md:p-6 rounded-full hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition-all shadow-md dark:shadow-lg dark:shadow-green-700"
        aria-label="Open Chatbot"
      >
        <FaRobot size={24} />
      </button>

      {/* หน้าต่างแชท */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={handleOutsideClick}
        >
          <div
            className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0 transform transition-transform duration-500 scale-100"
            onClick={(e) => e.stopPropagation()} // ป้องกันการคลิกภายในโมดัลไม่ให้ปิด
          >
            <div className="flex flex-col h-[500px] ">
              {/* ส่วนหัวของแชท */}
              <ConversationHeader className="rounded-t-lg bg-green-500 text-white">
                <Avatar
                  src="https://i.pravatar.cc/150?img=12"
                  name="ChatGPT"
                  status="available"
                />
                <ConversationHeader.Content userName="ChatGPT" info="Online" />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white mr-4"
                >
                  ✕
                </button>
              </ConversationHeader>

              <div className="flex-1">
                <MainContainer>
                  <ChatContainer>
                    <MessageList
                      scrollBehavior="smooth"
                      typingIndicator={
                        typing ? (
                          <TypingIndicator content="Chatbot กำลังพิมพ์..." />
                        ) : null
                      }
                    >
                      {messages.map((message, index) => (
                        <Message
                          key={index}
                          model={{
                            message: message.message,
                            sender: message.sender,
                            direction:
                              message.sender === 'user'
                                ? 'outgoing'
                                : 'incoming',
                            position: 'single',
                          }}
                          avatarSpacer={true}
                        >
                          <Avatar
                            src={
                              message.sender === 'ChatGPT'
                                ? 'https://i.pravatar.cc/150?img=12'
                                : 'https://i.pravatar.cc/150?img=5'
                            }
                            name={message.sender}
                          />
                        </Message>
                      ))}
                    </MessageList>
                    <MessageInput
                      placeholder="พิมพ์ข้อความ..."
                      onSend={handleSend}
                      attachButton={false}
                      className="rounded-none border-t border-gray-300 focus:border-green-500"
                    />
                  </ChatContainer>
                </MainContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
