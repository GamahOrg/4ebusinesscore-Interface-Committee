import React, { useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

const ChatBot = () => {
  const intl = useIntl();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputText.trim() !== "") {
      const newUserMessage = {
        type: "user",
        content: inputText,
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputText("");
      setIsLoading(true);

      // Define predefined responses with localized keys
      const helloKey = intl.formatMessage({ id: "hello" });
      const assist = intl.formatMessage({ id: "Hello!HowcanIassistyoutoday?" });
      const Name = intl.formatMessage({ id: "whatIsYourName" });
      const ChatPotName = intl.formatMessage({ id: "I’myourHelpfulChatbot" });
      const ageQes = intl.formatMessage({ id: "HowOldAreYou" });
      const ageAnswer = intl.formatMessage({ id: "ageAnswer" });
      const defaulteAnswer = intl.formatMessage({
        id: "I'mSorry,Ididn'tUnderstandThat",
      });

      const predefinedResponses = {
        [helloKey]: assist,
        [Name]: ChatPotName,
        [ageQes]: ageAnswer,
      };

      const normalizedInput = inputText.trim().toLowerCase();
      const response = predefinedResponses[normalizedInput] || defaulteAnswer;

      setTimeout(() => {
        const newAIMessage = {
          type: "ai",
          content: response,
        };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div
        className="d-flex theme-gradient justify-content-center align-items-center bg-primary rounded-circle circle-dev"
        onClick={() => setShowChat(!showChat)}
      >
        <i
          className={`fas ${
            showChat ? "fa-times" : "fa-robot"
          } text-white fs-3`}
        ></i>
      </div>

      <div
        className={`rounded w-25 transition render-chat ${
          showChat ? "open" : "closed"
        }`}
        style={{
          opacity: showChat ? 1 : 0,
          transform: showChat ? "translateY(0)" : "translateY(20px)",
          pointerEvents: showChat ? "auto" : "none",
          boxShadow: "0 3px 6px #ccc",
        }}
      >
        <div className="bg-dark pt-2 px-5 chatGpt rounded">
          <div className="d-flex">
            <div className="d-flex justify-content-center align-items-center bg-primary rounded-circle rounded-circle2">
              <i className="fas fa-robot text-white fa-2x"></i>
            </div>
            <div>
              <div className="mx-3 mb-0">
                <span className="text-primary">
                  {intl.formatMessage({ id: "Welcome!" })}
                </span>
              </div>
              <div className="mx-3 font-weight-bold mb-0">
                <p className="text-white fs-5">
                  {intl.formatMessage({ id: "HowCanIHelpYou?" })}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light-white pt-3 pb-1 px-5 border chat-messages-container">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.type === "user" && (
                <div className="d-flex position-relative mb-3">
                  <div className="d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-one-chatGpt">
                    <i className="fas fa-user text-primary"></i>
                  </div>
                  <div className="bg-light-primary w-55 rounded pt-2 ps-3 pe-6 mx-9 pb-0 style-border-text-develop-chatjpt message-content">
                    <p className="text-gray-800 fs-6 fw-bold">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
              {message.type === "ai" && (
                <div className="d-flex justify-content-end mx-6 pt-3 mb-3">
                  <div className="bg-white w-75 rounded pt-3 ps-3 pe-6 mx-1 style-border-text-develop-chatjpt content-chat">
                    <div className="text-black fs-6">
                      <p className="mb-0 mx-3">{message.content}</p>
                    </div>
                  </div>
                  <div className="position-relative">
                    <div className="bg-primary d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-two-chatGpt">
                      <i className="fas fa-robot text-white"></i>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {isLoading && (
            <div className="d-flex justify-content-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="d-flex align-items-center px-3 py-1 bg-light rounded-bottom w-100">
          <div className="d-flex justify-content-center align-items-center con">
            <i className="fas fa-broom fs-3"></i>
          </div>
          <div className="flex-grow-1 mx-2">
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: "WhatISOnYourMind",
              })}
              onKeyDown={handleInputKeyDown}
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <div className="d-flex justify-content-center align-items-center con">
            <button className="btn p-0" onClick={handleSubmit}>
              <i className="fas fa-paper-plane fs-3 text-primary rotate-icon-chatgpt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
