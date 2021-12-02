import MessageList from "../../components/MessageList";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useGetMessagesQuery } from "../../services/messages";
import { useDispatch } from "react-redux";
import { setMessages, setCount } from "../../features/messages/messagesSlice";
import MessagesHeader from "../../components/MessagesHeader";
import styles from "../../styles/page.module.scss";

export async function getServerSideProps({ query }) {
  const pageString = query.page;
  return {
    props: { page: Number(pageString), sortBy: query.sortBy },
  };
}

export default function MessagesPage({ page, sortBy }) {
  const { data, isError, isFetching } = useGetMessagesQuery({
    sortBy,
    page,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data.messages));
      dispatch(setCount(data.count));
    }
  }, [data, dispatch]);

  return (
    <div className={styles.root}>
      <Navbar />
      <MessagesHeader />
      <MessageList loading={isFetching} error={isError} />
      <Footer page="admin" />
    </div>
  );
}
