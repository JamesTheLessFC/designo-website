import Message from "./Message";
import styles from "../styles/MessageList.module.scss";
import MessageListFooter from "./MessageListFooter";

export default function MessageList({ messages, count }) {
  return (
    <div className={styles.root}>
      <div className={styles.list_header}>
        <p className={styles.date}>Date</p>
        <p className={styles.name}>Name</p>
        <p className={styles.email}>Email</p>
        <p className={styles.phone}>Phone</p>
        <p className={styles.message}>Message</p>
      </div>
      <ul>
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </ul>
      <MessageListFooter count={count} />
    </div>
  );
}
