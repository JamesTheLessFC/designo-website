import MessageList from "../../components/MessageList";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useGetMessagesQuery } from "../../services/messages";
import { useDispatch } from "react-redux";
import { setMessages, setCount } from "../../features/messages/messagesSlice";
import AdminHeader from "../../components/AdminHeader";
import styles from "../../styles/page.module.scss";
import { useSession } from "next-auth/react";
import { withRouter } from "next/router";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import BackLink from "../../components/BackLink";

export async function getServerSideProps({ query }) {
  const pageString = query.page;
  return {
    props: { page: Number(pageString), sortBy: query.sortBy },
  };
}

function MessagesPage({ page, sortBy, router }) {
  const { data, isError, isFetching } = useGetMessagesQuery({
    sortBy,
    page,
  });
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin");
    }
  }, [router, status]);

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data.messages));
      dispatch(setCount(data.count));
    }
  }, [data, dispatch]);

  return (
    <div className={styles.root}>
      <Navbar />
      <AdminHeader title="Message Inbox" icon={faEnvelope} />
      <BackLink link={"/admin"} />
      <MessageList loading={isFetching} error={isError} />
      <Footer page="admin" />
    </div>
  );
}

export default withRouter(MessagesPage);
