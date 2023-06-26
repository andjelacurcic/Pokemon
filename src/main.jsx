import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Pokemons, { loader as postsLoader } from "./routes/Pokemons.jsx";
import PokemonDetails,{loader as postDetailsLoader} from "./routes/PokemonDetails.jsx";
import "./index.css";
import RootLayout from "./routes/RootLayout.jsx";
import HomePage from "./routes/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
       path:"/",
       element:<HomePage />,
       children: [
        { path: "/:id",element: <PokemonDetails />,loader: postDetailsLoader },
  
      ],
      },
      { 
        path: "/posts",
        element: <Pokemons />,
        loader: postsLoader,
        
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
