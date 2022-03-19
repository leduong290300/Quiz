import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Play from "./components/Play";
import Start from "./components/Start";
import Timer from "./components/Timer";
import questionValue from "./seed/question.json";
export default function App() {
  const [question, setQuestion] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [username, setUsername] = useState(null);

  const data = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250000" },
        { id: 14, amount: "$ 500000" },
        { id: 15, amount: "$ 1000000" },
      ].reverse(),
    [],
  );

  const questionData = questionValue.question;

  useEffect(() => {
    question > 1 &&
      setEarned(data.find((money) => money.id === question - 1).amount);
  }, [data, question]);

  return (
    <div className="app">
      {username ? (
        <>
          <div className="main">
            {stop ? (
              <>
                <h1 className="earned_text">Bạn kiếm được : {earned}</h1>
              </>
            ) : (
              <>
                <div className="top">
                  <div className="top__timer">
                    <Timer setStop={setStop} question={question} />
                  </div>
                </div>
                <div className="bottom">
                  <Play
                    questionData={questionData}
                    setStop={setStop}
                    setQuestion={setQuestion}
                    question={question}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="money">
              {data.map((amount) => (
                <li
                  className={
                    question === amount.id ? "money_list active" : "money_list"
                  }
                  key={amount.id}
                >
                  <span className="money_number">{amount.id}</span>
                  <span className="money_amount">{amount.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}
