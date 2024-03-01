import { createBrowserRouter } from "react-router-dom";
import Root from "../screen/Root";
import Home from "../screen/Home";
import Calc from "../screen/Calc";
import Dnd from "../screen/Dnd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "calc",
        element: <Calc />,
      },
      {
        path: "dnd",
        element: <Dnd />,
      },
    ],
  },
]);

export default router;
