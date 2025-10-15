import "./Ticket.css";
import logoIcon from "/images/logo-mark.svg";
import ticketBg from "/images/pattern-ticket.svg";

export default function Ticket({
  data,
  onBack,
}: {
  data: { name: string; email: string; github: string; avatar: string };
  onBack: () => void;
}) {
  return (
    <section className="ticket-section">
      <header>
        <h1>
          Congrats, <span className="name-highlight">{data.name}</span> Your
          ticket is ready!
        </h1>
        <p>
          We've emailed your ticket to{" "}
          <span className="email-highlight">{data.email}</span> and will send
          updates in the run up to the event.
        </p>
      </header>

      <article className="ticket-card">
        <img src={ticketBg} alt="Coding Conf Ticket" className="ticket-bg" />
        <div className="ticket-content">
          <div className="ticket-top">
            <img
              className="ticket-logo"
              src={logoIcon}
              alt="Coding Conf logo"
            />
            <div className="ticket-event">
              <h2 className="event-title">Coding Conf</h2>
              <p className="event-details">Jan 31, 2025 / BANGKOK, TH</p>
            </div>
          </div>

          <div className="ticket-participant">
            <img
              className="ticket-avatar"
              src={data.avatar}
              alt={`${data.name} avatar`}
            />
            <div className="ticket-info">
              <h3>{data.name}</h3>
              <p>@{data.github}</p>
            </div>
          </div>
        </div>
      </article>
      <button onClick={onBack} className="edit-btn">
        Edit Info
      </button>
    </section>
  );
}
