import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}


export function earnPoints_Number(result = [], answers = [], point = 0) {
  if (
    !Array.isArray(result) ||
    !Array.isArray(answers) ||
    typeof point !== "number"
  ) {
    console.error("Invalid inputs:", { result, answers, point });
    return 0; 
  }

  console.log("Result Array:", result);
  console.log("Answers Array:", answers);

  const earnedPoints = result
    .map((element, i) => {
      const isCorrect = answers[i] === element; 
      console.log(`Comparing: ${answers[i]} === ${element} => ${isCorrect}`);
      return isCorrect;
    })
    .filter(Boolean) 
    .map(() => point) 
    .reduce((prev, curr) => prev + curr, 0); 

  console.log("Total Earned Points:", earnedPoints); 
  return earnedPoints; 
}


/** check user auth  */

export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}



/** get server data */
export async function getServerData(url, callback){
    const data = await (await axios.get(url))?.data;
    return callback ? callback(data) : data;
}


// /** post server data */
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
    return callback ? callback(data) : data;
}
