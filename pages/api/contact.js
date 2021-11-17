import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Failed to send Email" });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(
        `mongodb+srv://robin:robin@cluster0.3hqne.mongodb.net/my-site?retryWrites=true&w=majority`
      );
    } catch (error) {
      res.status(500).json({ message: "Cannot Connetct to the database" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      client.close();
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Success send emails", message: newMessage });
  }
}

export default handler;
