import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion"; 
import { useSelector, useDispatch } from "react-redux";
import { PushAnswer } from "../hooks/setResult";
import { Navigate, useNavigate } from "react-router-dom"; 

const Quiz = () => {
  const [check, setChecked] = useState(undefined);
  const [timer, setTimer] = useState(60);
  const { queue, trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
    console.log(trace);
    console.log(result);
  }, [trace, result]);

  useEffect(() => {
    if (timer === 0) {
    
      if (result.length < queue.length) {
        
        dispatch(PushAnswer(null)); 
      }
      return; 
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  // Next event handler
  function onNext() {
    console.log("Next");
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());
      if (result.length <= trace && check !== undefined) {
        dispatch(PushAnswer(check));
      } else {
        dispatch(PushAnswer(null));
      }
      setChecked(undefined);
    }
  }

  // Previous event handler
  function onPrev() {
    console.log("Previous");
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    setChecked(check);
  }

  // Submit quiz handler
  function onSubmit() {
    console.log("Submit");
    if (result.length < queue.length) {
      dispatch(PushAnswer(null)); 
    }
    navigate("/result"); 
  }

  /** Redirect to results page if all questions are answered or timer reaches zero */
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  if (timer === 0) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-6">
      <h1 className="text-5xl font-bold mb-8 text-purple-400">Quiz Wizz 💡</h1>
      
      {/* Timer code */}
      <div className="mb-4 text-lg flex justify-between w-full max-w-2xl">
        <div className="font-bold">Time left:</div>
        <div className={`flex items-center border rounded-lg p-2 ${timer <= 10 ? "border-red-500 bg-red-700" : "border-purple-500 bg-purple-800"}`}>
          <span className="text-white text-2xl">{timer}</span>
          <span className="ml-2 text-sm text-gray-300">seconds</span>
        </div>
      </div>

      <div className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-2xl mb-6">
        {/* Display questions */}
        <Questions onChecked={onChecked} />
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 text-lg font-semibold text-white bg-purple-600 rounded-full transition duration-300 ease-in-out transform hover:bg-purple-700 focus:outline-none"
            onClick={onPrev}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 text-lg font-semibold text-white bg-purple-600 rounded-full transition duration-300 ease-in-out transform hover:bg-purple-700 focus:outline-none"
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* Submit Test button */}
      <div className="mt-6 w-full max-w-2xl flex justify-end">
        <button
          className="px-6 py-2 text-lg font-semibold text-white bg-red-600 rounded-full transition duration-300 ease-in-out transform hover:bg-red-700 focus:outline-none"
          onClick={onSubmit}
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default Quiz;
