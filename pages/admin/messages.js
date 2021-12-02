import MessageList from "../../components/MessageList";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useGetMessagesQuery } from "../../services/messages";
import { useDispatch } from "react-redux";
import { setMessages, setCount } from "../../features/messages/messagesSlice";

export async function getServerSideProps({ query }) {
  const pageString = query.page;
  return {
    props: { page: Number(pageString) },
  };
}

export default function MessagesPage({ page }) {
  // const [messages, setMessages] = useState([]);
  // const [count, setCount] = useState(0);
  const { data, error, isFetching } = useGetMessagesQuery({
    page,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data.messages));
      dispatch(setCount(data.count));
    }
  }, [data, dispatch]);

  // if (isFetching) {
  //   return (
  //     <div>
  //       <Navbar />
  //       <MessageList messages={[]} count={0} />
  //       <Footer page="admin" />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Navbar />
      <MessageList />
      <Footer page="admin" />
    </div>
  );
}
