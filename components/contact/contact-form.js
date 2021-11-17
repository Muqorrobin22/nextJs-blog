import classes from "./contact-form.module.css";
import { useEffect, useState } from "react";
import Notification from "../ui/notification";

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestData, setRequestData] = useState();
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestData === "success" || requestData === "error") {
      const timer = setTimeout(() => {
        setRequestData(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestData]);

  async function sendData(dataInput) {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(dataInput),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went Wrong");
    }
  }

  async function submitHandler(event) {
    event.preventDefault();

    setRequestData("pending");

    try {
      await sendData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestData("success");
      setEnteredEmail("");
      setEnteredMessage("");
      setEnteredName("");
    } catch (error) {
      setRequestData("error");
      setRequestError(error.message || "something went wrong");
    }
  }

  let notification;

  if (requestData === "pending") {
    notification = {
      message: "Sending Messages",
      status: "pending",
      title: "sending..",
    };
  }
  if (requestData === "success") {
    notification = {
      message: "Success Sending Messages",
      status: "success",
      title: "Success!",
    };
  }
  if (requestData === "error") {
    notification = {
      message: requestError,
      status: "error",
      title: "error",
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How Can I Help You</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
}

export default ContactForm;
