import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import React from "react";
import { EventPage, eventLoader } from "./pages/EventPage";
import { EventsPage, eventsLoader } from "./pages/EventsPage";
import {
  actionHandleSubmit,
  EventForm,
  eventFormLoader,
} from "./components/EventForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const api_url =
  "https://my-json-server.typicode.com/Brenda-web/events-db.json";

//"http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        action: actionHandleSubmit,
      },
      {
        path: "/event/new",
        element: <EventForm />,
        loader: eventFormLoader,
        action: actionHandleSubmit,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
