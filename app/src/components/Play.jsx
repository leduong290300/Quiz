import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "../sounds/src_sounds_play.mp3";
import correct from "../sounds/src_sounds_correct.mp3";
import wrong from "../sounds/src_sounds_wrong.mp3";

export default function Play({ questionData, setQuestion, question, setStop }) {
  const [changeQuestion, setChangeQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer__item");
  const [letPlay] = useSound(play);
  const [answerCorrect] = useSound(correct);
  const [anserWrong] = useSound(wrong);

  useEffect(() => {
    setChangeQuestion(questionData[question - 1]);
  }, [questionData, question]);

  useEffect(() => {
    letPlay();
  }, [letPlay]);
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleSelectAnswer = (answer) => {
    setSelectAnswer(answer);
    setClassName("answer__item active");
    delay(3000, () =>
      setClassName(
        answer.correct ? "answer__item correct" : "answer__item wrong",
      ),
    );
    delay(5000, () => {
      if (answer.correct) {
        answerCorrect();
        delay(1000, () => {
          setQuestion((prev) => prev + 1);
          setSelectAnswer(null);
        });
      } else {
        anserWrong();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="play">
      <div className="question">{changeQuestion?.question}</div>
      <div className="answers_list">
        {changeQuestion?.answers.map((answer) => (
          <div
            className={selectAnswer === answer ? className : "answer__item"}
            key={answer.text}
            onClick={() => handleSelectAnswer(answer)}
          >
            {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}
