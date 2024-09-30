import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/**Routes */
import Hero from "./components/Hero";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import HomePage from "./components/Home";
import ArticlesPage from "./components/ArticlesPage";
import ResultsPage from "./components/ResultPage";
import { CheckUserExist } from "./helper/helper";


const router = createBrowserRouter([
  {
    path: "/test",
    element: <Hero/>,
  },
  {
    path: "/quiz", //chages making here 
    element: <CheckUserExist><Quiz/></CheckUserExist> ,
  },
  {
    path: "/result",
    element: <Result/>,
  },
  {
    path: "/article",
    element: <ArticlesPage/>,
  },
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/result-page",
    element: <ResultsPage/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
