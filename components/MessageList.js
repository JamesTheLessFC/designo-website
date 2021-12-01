import Message from "./Message";
import styles from "../styles/MessageList.module.scss";
import MessageListFooter from "./MessageListFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function MessageList({ messages, count }) {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const selectMessage = (id) => {
    setSelectedIds((prevState) => {
      return [...prevState, id];
    });
  };

  const deselectMessage = (id) => {
    setSelectedIds((prevState) => {
      return prevState.filter((selectedId) => id !== selectedId);
    });
  };

  const selectAll = (e) => {
    e.stopPropagation();
    const arr = [];
    messages.forEach((message) => {
      arr.push(message.id);
    });
    setSelectedIds(arr);
  };

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
    const idsToDelete = selectedIds.join(",");
    const response = await fetch(`/api/messages?ids=${idsToDelete}`, {
      method: "DELETE",
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse.message);
  };

  const updateSelected = async (e, field, value) => {
    e.stopPropagation();
    const reqBody = {
      idsToUpdate: selectedIds,
      updates: {
        [field]: value,
      },
    };
    const response = await fetch(`/api/messages`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse.message);
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
          <button onClick={deleteSelected}>Delete</button>
          <button onClick={(e) => updateSelected(e, "important", true)}>
            Highlight
          </button>
          <button onClick={(e) => updateSelected(e, "important", false)}>
            Remove Highlight
          </button>
          <button onClick={(e) => updateSelected(e, "read", true)}>
            Mark as Read
          </button>
          <button onClick={(e) => updateSelected(e, "read", false)}>
            Mark as Unread
          </button>
        </div>
      )}
      <ul>
        {messages.map((message) => (
          <Message
            key={message.id}
            data={message}
            selectMessage={selectMessage}
            deselectMessage={deselectMessage}
            selected={selectedIds.includes(message.id)}
          />
        ))}
      </ul>
      <MessageListFooter count={count} />
    </div>
  );
}
