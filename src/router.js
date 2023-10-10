import { createBrowserRouter, } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage/mainPage";
import FavoritePage from "./pages/FavoritePage/favoritePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            {
                path: "favorite",
                element: <FavoritePage />,
            },
        ]
    },
])

export default router;