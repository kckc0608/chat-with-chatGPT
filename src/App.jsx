import "./App.css";
import { MyMsg } from "./MyMsg";
import { useEffect } from "react";
import { useState } from "react";
import { ChatGPTMsg } from "./ChatGPTMsg";

function App() {
  const [chatArray, setChatArray] = useState([]);

  useEffect(() => {
    const chat_area = document.querySelector(".chat-area");
    chat_area.scrollTop = chat_area.scrollHeight;
  }, [chatArray]);

  async function onClickLoginButton(e) {
    const q_box = document.querySelector("#question_box");
    const getAnswer = async function (question) {
      const resp = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer API_KEY",
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: question,
          temperature: 0,
          max_tokens: 700,
        }),
      });
      const data = await resp.json();
      return data.choices[0].text;
    };

    const question = q_box.value;
    q_box.value = "";
    setChatArray((perv) => [...perv, question]);
    const answer = await getAnswer(question);
    setChatArray((prev) => [...prev, answer]);
  }

  return (
    <div className="main-container">
      <h2>ChatGPT API 연습</h2>
      <div className="chat-area">
        {chatArray.map((item, idx) =>
          idx % 2 === 1 ? (
            <ChatGPTMsg key={idx}>{item}</ChatGPTMsg>
          ) : (
            <MyMsg key={idx}>{item}</MyMsg>
          )
        )}
      </div>
      <div className="input-area">
        <textarea
          id="question_box"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onClickLoginButton();
            }
          }}
        ></textarea>
        <div
          id="login-button"
          onClick={(e) => {
            onClickLoginButton(e);
          }}
        >
          전송
        </div>
      </div>
    </div>
  );
}

export default App;
