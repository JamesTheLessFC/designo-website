import Message from "./Message";
import styles from "../styles/MessageList.module.scss";
import MessageListFooter from "./MessageListFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faEllipsisV,
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
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
import { useRouter } from "next/router";

export default function MessageList({ loading, error }) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const dispatch = useDispatch();
  const { messages } = useSelector(selectMessages);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [showSortMenu, setSortMenu] = useState(false);
  const router = useRouter();
  const sortBy = router.query.sortBy;

  const [updateMessages, { isLoading: isUpdating, error: updateError }] =
    useUpdateMessagesMutation();
  const [deleteMessages, { isLoading: isDeleting, error: deleteError }] =
    useDeleteMessagesMutation();

  const toggleSortMenu = (e) => {
    e.stopPropagation();
    setSortMenu((prevState) => !prevState);
  };

  const selectAll = (e) => {
    e.stopPropagation();
    dispatch(selectAllMessages());
  };

  const sortMessages = (e, value) => {
    e.stopPropagation();
    router.push(`/admin/messages?sortBy=${value}&page=1`);
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
    setActiveButton("delete");
    const response = await deleteMessages(selectedIds);
  };

  const updateSelectedMessages = async (field, value) => {
    const requestBody = {
      messageIds: selectedIds,
      updates: {
        [field]: value,
      },
    };
    const response = await updateMessages(requestBody);
    if (response.messageIds) {
      // db was successfully updated
      const createAction =
        field === "read" && value
          ? markMessagesAsRead
          : field === "read"
          ? markMessagesAsUnread
          : field === "important" && value
          ? markMessagesAsImportant
          : markMessagesAsNotImportant;
      dispatch(createAction(response.messageIds));
    }
  };

  const markSelectedAsRead = async (e) => {
    e.stopPropagation();
    setActiveButton("read");
    await updateSelectedMessages("read", true);
  };

  const markSelectedAsUnread = async (e) => {
    e.stopPropagation();
    setActiveButton("unread");
    await updateSelectedMessages("read", false);
  };

  const markSelectedAsImportant = async (e) => {
    e.stopPropagation();
    setActiveButton("important");
    await updateSelectedMessages("important", true);
  };

  const markSelectedAsNotImportant = async (e) => {
    e.stopPropagation();
    setActiveButton("unimportant");
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
          <button className={styles.sort_by_button} onClick={toggleSortMenu}>
            <span>Sort By</span>
            <FontAwesomeIcon
              icon={showSortMenu ? faChevronUp : faChevronDown}
              className={styles.icon}
            />
          </button>
          <div
            className={`${styles.sort_by_actions} ${
              showSortMenu ? "" : styles.sort_by_actions_hidden
            }`}
          >
            <button onClick={(e) => sortMessages(e, "date")}>
              <span>Date</span>
              {sortBy === "date" && (
                <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              )}
            </button>
            <button onClick={(e) => sortMessages(e, "name")}>
              <span>Name</span>
              {sortBy === "name" && (
                <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              )}
            </button>
            <button onClick={(e) => sortMessages(e, "email")}>
              <span>Email</span>
              {sortBy === "email" && (
                <FontAwesomeIcon icon={faCheck} className={styles.icon} />
              )}
            </button>
          </div>
          <button onClick={selectAll} disabled={isDeleting || isUpdating}>
            Select All
          </button>
          <button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0 || isDeleting || isUpdating}
          >
            {activeButton === "delete" && isDeleting ? (
              <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
            ) : activeButton === "delete" && deleteError ? (
              <span>
                {"Delete "}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className={styles.icon}
                />
              </span>
            ) : (
              "Delete"
            )}
          </button>
          <button
            onClick={markSelectedAsImportant}
            disabled={selectedIds.length === 0 || isDeleting || isUpdating}
          >
            {activeButton === "important" && isUpdating ? (
              <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
            ) : activeButton === "important" && updateError ? (
              <span>
                {"Highlight "}
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faExclamationCircle}
                />
              </span>
            ) : (
              "Highlight"
            )}
          </button>
          <button
            onClick={markSelectedAsNotImportant}
            disabled={selectedIds.length === 0 || isDeleting || isUpdating}
          >
            {activeButton === "unimportant" && isUpdating ? (
              <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
            ) : activeButton === "unimportant" && updateError ? (
              <span>
                {"Remove Highlight "}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className={styles.icon}
                />
              </span>
            ) : (
              "Remove Highlight"
            )}
          </button>
          <button
            onClick={markSelectedAsRead}
            disabled={selectedIds.length === 0 || isDeleting || isUpdating}
          >
            {activeButton === "read" && isUpdating ? (
              <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
            ) : activeButton === "read" && updateError ? (
              <span>
                {"Mark as Read "}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className={styles.icon}
                />
              </span>
            ) : (
              "Mark as Read"
            )}
          </button>
          <button
            onClick={markSelectedAsUnread}
            disabled={selectedIds.length === 0 || isDeleting || isUpdating}
          >
            {activeButton === "unread" && isUpdating ? (
              <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
            ) : activeButton === "unread" && updateError ? (
              <span>
                {"Mark as Unread "}
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  classNam={styles.icon}
                />
              </span>
            ) : (
              "Mark as Unread"
            )}
          </button>
        </div>
      )}
      {loading ? (
        <div className={styles.loading_message}>
          <FontAwesomeIcon icon={faSpinner} className={styles.icon} pulse />
        </div>
      ) : error ? (
        <div className={styles.error_message}>
          <FontAwesomeIcon icon={faExclamationCircle} className={styles.icon} />
          <p>Oops! Something went wrong.</p>
        </div>
      ) : messages.length === 0 ? (
        <div className={styles.empty_message}>
          <p>No messages found.</p>
        </div>
      ) : (
        <ul>
          {messages.map((message) => (
            <Message key={message.id} data={message} />
          ))}
        </ul>
      )}
      <MessageListFooter />
    </div>
  );
}
