import MessageList from "../../components/MessageList";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export async function getServerSideProps({ query }) {
  const pageString = query.page;
  return {
    props: { page: Number(pageString) },
  };
}

export default function MessagesPage({ page }) {
  const [messages, setMessages] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`/api/messages?page=${page}`, {
      method: "GET",
    });
    const jsonResponse = await response.json();
    setMessages(jsonResponse.messages);
    setCount(jsonResponse.count);
  };

  return (
    <div>
      <Navbar />
      <MessageList messages={messages} count={count} />
      <Footer page="admin" />
    </div>
  );
}
