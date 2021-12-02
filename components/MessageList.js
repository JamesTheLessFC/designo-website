import Message from "./Message";
import styles from "../styles/MessageList.module.scss";
import MessageListFooter from "./MessageListFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import {
  useDeleteMessagesMutation,
  useUpdateMessagesMutation,
} from "../services/messages";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessages,
  selectAllMessages,
  markMessagesAsRead,
  markMessagesAsImportant,
  markMessagesAsNotImportant,
  markMessagesAsUnread,
} from "../features/messages/messagesSlice";

export default function MessageList() {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const dispatch = useDispatch();
  const { messages } = useSelector(selectMessages);
  const [selectedIds, setSelectedIds] = useState([]);

  const [updateMessages, { isLoading: isUpdating, error: updateError }] =
    useUpdateMessagesMutation();
  const [deleteMessages, { isLoading: isDeleting, error: deleteError }] =
    useDeleteMessagesMutation();

  const selectAll = (e) => {
    e.stopPropagation();
    dispatch(selectAllMessages());
  };

  useEffect(() => {
    setSelectedIds(
      messages
        .filter((message) => message.selected)
        .map((message) => message.id)
    );
  }, [messages]);

  useEffect(() => {
    if (showActionsMenu) {
      const handleOutsideClick = () => {
        setShowActionsMenu(false);
      };
      setTimeout(() => {
        window.addEventListener("click", handleOutsideClick);
      });
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [showActionsMenu]);

  const toggleActionsMenu = (e) => {
    e.stopPropagation();
    setShowActionsMenu((prevState) => !prevState);
  };

  const deleteSelected = async (e) => {
    e.stopPropagation();
    const response = await deleteMessages(getSelectedIds());
  };

  const updateSelectedMessages = async (field, value) => {
    const requestBody = {
      messageIds: selectedIds,
      updates: {
        [field]: value,
      },
    };
    await updateMessages(requestBody);
    const createAction =
      field === "read" && value
        ? markMessagesAsRead
        : field === "read"
        ? markMessagesAsUnread
        : field === "important" && value
        ? markMessagesAsImportant
        : markMessagesAsNotImportant;
    dispatch(createAction(selectedIds));
  };

  const markSelectedAsRead = async (e) => {
    e.stopPropagation();
    await updateSelectedMessages("read", true);
  };

  const markSelectedAsUnread = async (e) => {
    e.stopPropagation();
    await updateSelectedMessages("read", false);
  };

  const markSelectedAsImportant = async (e) => {
    e.stopPropagation();
    await updateSelectedMessages("important", true);
  };

  const markSelectedAsNotImportant = async (e) => {
    e.stopPropagation();
    await updateSelectedMessages("important", false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.list_header}>
        <p className={styles.date}>Date</p>
        <p className={styles.name}>Name</p>
        <p className={styles.email}>Email</p>
        <p className={styles.phone}>Phone</p>
        <p className={styles.message}>Message</p>
        <button onClick={toggleActionsMenu}>
          <FontAwesomeIcon icon={faEllipsisV} className={styles.icon} />
        </button>
      </div>
      {showActionsMenu && (
        <div className={styles.actions_container}>
          <button onClick={selectAll}>Select All</button>
          <button onClick={deleteSelected} disabled={selectedIds.length === 0}>
            Delete
          </button>
          <button
            onClick={markSelectedAsImportant}
            disabled={selectedIds.length === 0}
          >
            Highlight
          </button>
          <button
            onClick={markSelectedAsNotImportant}
            disabled={selectedIds.length === 0}
          >
            Remove Highlight
          </button>
          <button
            onClick={markSelectedAsRead}
            disabled={selectedIds.length === 0}
          >
            Mark as Read
          </button>
          <button
            onClick={markSelectedAsUnread}
            disabled={selectedIds.length === 0}
          >
            Mark as Unread
          </button>
        </div>
      )}
      <ul>
        {messages.map((message) => (
          <Message key={message.id} data={message} />
        ))}
      </ul>
      <MessageListFooter />
    </div>
  );
}
