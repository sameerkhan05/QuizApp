import React, { useEffect, useState } from "react";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../hooks/setResult";

function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const { trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const result = useSelector((state) => state.result.result);

  const questions = useSelector(
    (state) => state.questions?.queue?.[state.questions?.trace]
  );

  useEffect(() => {
    if (result[trace] !== undefined) {
      setChecked(result[trace]);
    } else {
      setChecked(undefined);
    }
  }, [trace]);

  useEffect(() => {
    if (checked !== undefined) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked, trace, dispatch]);

  const onSelect = (idx) => {
    if (checked !== idx) {
      setChecked(idx);
      onChecked(idx);
    }
  };

  return (
    <div className="flex flex-col items-start justify-center w-full space-y-6 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl mb-4 text-white font-semibold">{questions?.question}</h2>
      <ul className="space-y-4 w-full" key={questions?.id}>
        {questions?.options?.map((q, idx) => (
          <li className="flex items-center" key={idx}>
            <input
              type="radio"
              value={q}
              name="options"
              id={`q${idx}-option`}
              onChange={() => onSelect(idx)}
              checked={checked === idx}
              className="hidden"
            />
            <label
              className={`flex items-center cursor-pointer border-2 border-gray-600 rounded-lg p-3 transition duration-200 ease-in-out w-full
                          ${checked === idx ? "bg-purple-600 border-transparent text-white" : "bg-gray-700 text-gray-200 hover:bg-gray-600"}`}
              htmlFor={`q${idx}-option`}
            >
              <span
                className={`w-5 h-5 border-2 border-gray-600 rounded-full flex items-center justify-center mr-3 transition duration-200 ease-in-out 
                            ${checked === idx ? "bg-purple-600" : ""}`}
              >
                {checked === idx && (
                  <span className="w-3 h-3 bg-white rounded-full"></span>
                )}
              </span>
              <span className="text-lg w-full">{q}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;
