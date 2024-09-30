import * as Action from '../redux/result_reducer';
import { getServerData, postServerData } from '../helper/helper'; 

/** 
 * Action to push the user's answer to the Redux state 
 */
export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.log("Error pushing answer:", error);
    }
};


/** 
 * Action to update the result in Redux state 
 */
export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log("Error updating result:", error);
    }
};

/** 
 * Custom hook to publish quiz results to the server
 */
export const usePublishResult = async (resultData) => {
    const { result, username } = resultData;

    if (result.length === 0 || !username) {
        throw new Error("Couldn't get Result");
    }

    const serverUrl = `${import.meta.env.VITE_APP_SERVER_HOSTNAME}/api/result`;
    console.log("Publishing result to URL:", serverUrl); // Debug URL
    
    await postServerData(serverUrl, resultData, data => data);
};