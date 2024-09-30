import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../helper/helper.jsx";
import * as Action from "../redux/question_reducer.js";

/** Fetch question hook to fetch API data and set value to store */
export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        const url = `${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/questions`;

        const data = await getServerData(url);

        console.log("Fetched data:", data);

        const [{ questions, answers }] = data;

        if (Array.isArray(questions) && questions.length > 0) {
          setGetData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: { questions, answers },
          }));

          dispatch(Action.startExamAction({ questions, answers }));
        } else {
          throw new Error("No Questions Available");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setGetData((prev) => ({
          ...prev,
          isLoading: false,
          serverError: error.message || "An error occurred",
        }));
      }
    })();
  }, [dispatch]);

  return [getData, setGetData];
};



/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.log(error);
  }
};



/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.log(error);
  }
};
