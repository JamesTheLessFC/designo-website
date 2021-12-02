import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  count: 0,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setCount(state, action) {
      state.count = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload.map((message) => ({
        ...message,
        open: false,
        selected: false,
      }));
    },
    selectAllMessages(state) {
      state.messages = state.messages.map((message) => ({
        ...message,
        selected: true,
      }));
    },
    toggleSelected(state, action) {
      state.messages = state.messages.map((message) => {
        if (message.id === action.payload) {
          return { ...message, selected: !message.selected };
        } else {
          return message;
        }
      });
    },
    toggleOpen(state, action) {
      state.messages = state.messages.map((message) => {
        if (message.id === action.payload) {
          return { ...message, open: !message.open };
        } else {
          return message;
        }
      });
    },
    markMessageAsRead(state, action) {
      state.messages = state.messages.map((message) => {
        if (message.id === action.payload) {
          return { ...message, read: true };
        } else {
          return message;
        }
      });
    },
    markMessagesAsRead(state, action) {
      state.messages = state.messages.map((message) => {
        if (action.payload.includes(message.id)) {
          return { ...message, read: true };
        } else {
          return message;
        }
      });
    },
    markMessagesAsUnread(state, action) {
      state.messages = state.messages.map((message) => {
        if (action.payload.includes(message.id)) {
          return { ...message, read: false };
        } else {
          return message;
        }
      });
    },
    markMessagesAsImportant(state, action) {
      state.messages = state.messages.map((message) => {
        if (action.payload.includes(message.id)) {
          return { ...message, important: true };
        } else {
          return message;
        }
      });
    },
    markMessagesAsNotImportant(state, action) {
      state.messages = state.messages.map((message) => {
        if (action.payload.includes(message.id)) {
          return { ...message, important: false };
        } else {
          return message;
        }
      });
    },
  },
});

export const {
  setCount,
  setMessages,
  selectAllMessages,
  toggleSelected,
  toggleOpen,
  markMessageAsRead,
  markMessagesAsRead,
  markMessagesAsUnread,
  markMessagesAsImportant,
  markMessagesAsNotImportant,
} = messagesSlice.actions;
export const selectMessages = (state) => state.messages;
export default messagesSlice.reducer;
