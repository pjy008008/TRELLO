import { createBrowserRouter } from "react-router-dom";
import Root from "../screen/Root";
import Dnd from "../screen/Dnd";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dnd />,
      },
    ],
  },
]);

export default router;
