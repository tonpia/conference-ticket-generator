import "./App.css";
import Form from "./components/Form.tsx";
import logoIcon from "/images/logo-full.svg";

import { useState } from "react";
import Ticket from "./components/Ticket.tsx";

function App() {
  const [ticketData, setTicketData] = useState<null | {
    name: string;
    email: string;
    github: string;
    avatar: string; //BASE64 for image
  }>(null);

  function handleFormSubmit(data: {
    name: string;
    email: string;
    github: string;
    avatar: File | null;
  }) {
    if (!data.avatar) return;
    const imageURL = URL.createObjectURL(data.avatar);

    setTicketData({
      ...data,
      avatar: imageURL,
    });
  }

  return (
    <>
      <div className="container">
        <img className="full-logo-icon" src={logoIcon}></img>

        {ticketData ? (
          <Ticket data={ticketData} onBack={() => setTicketData(null)} />
        ) : (
          <Form onSubmit={handleFormSubmit} />
        )}
      </div>
    </>
  );
}

export default App;
