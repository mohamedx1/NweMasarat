import React, { useState, useRef, useEffect } from "react";
import style from "./chat.module.css";
import BootChatAvatat from "../../../common/bootChatAvatar/BootChatAvatat";
import MainButton from "../../../common/buttons/Mainbutn";
import { ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import BootResponse from "./BootResponse";
import { getMainChat } from "../../../../store/mainChat/mainChatSlice";
import getRestoreChat from "./../../../../store/restoreMainChatt/act/actChatting";

type Message = { id?: string; lesson?: string; student_answer?: string };

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const [allChat, setAllChat] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { token } = useAppSelector((state) => state.login);
  const { content, message, isLoading, error } = useAppSelector(
    (state) => state.chatting
  );

  const {
    error: restoreError,
    messages: initialMessages,
    isLoading: restoreLoading,
  } = useAppSelector((state) => state.restoreMessages);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChat]);

  useEffect(() => {
    dispatch(getRestoreChat(token));
  }, [token]);

  useEffect(() => {
    if (initialMessages.length === 0) {
      dispatch(getMainChat(token));
    }
  }, [initialMessages]);

  // Update currentMessage with the first item in content and add it to allChat
  useEffect(() => {
    if (content && content.length > 0) {
      setAllChat((prevMessages: any) => [...prevMessages, content[0]]);
    }
  }, [content]);

  // Handle sending a new message
  const messageIndex = useRef(0);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // Track `i` with `useRef` so it persists across renders

    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      student_answer: "true",
    };

    // Update last message in `allChat` if it exists
    if (content.length !== 0) {
      setAllChat((prevChat: Message[]) => {
        if (prevChat.length > 0) {
          const updatedChat = [...prevChat];
          updatedChat[updatedChat.length - 1] = {
            ...updatedChat[updatedChat.length - 1],
            ...newMessage,
          };
          return updatedChat;
        } else {
          return [
            {
              ...newMessage,
              id: "some-default-id",
              lesson: "default-lesson-id",
            } as Message,
          ];
        }
      });
    }

    setInputMessage("");

    // Append the next `content` item based on `messageIndex`
    if (content && content.length > messageIndex.current) {
      setAllChat((prevMessages: Message[]) => [
        ...prevMessages,
        content[messageIndex.current],
      ]);
      messageIndex.current += 1; // Increment `i` persistently
    }
  };

  return (
    <div className={`flex flex-col rounded-lg shadow-md h-screen`}>
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${style.noScrollbar} ${style.chatComponent}`}
      >
        <div className='flex gap-2 w-full mt-4'>
          <div className='bg-secondary-300 w-14 p-1 rounded-full h-12 flex items-center justify-center'>
            <BootChatAvatat emotion={0} />
          </div>
          <div className='flex justify-between mt-4 w-4/5'>
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-l bg-transparent text-gray-800 `}
            >
              {message}
            </div>
          </div>
        </div>

        {allChat.length > 0 &&
          allChat.map((msg: any) => (
            <div key={msg.id} className={`flex w-full`}>
              <div>{msg?.question_text}</div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className='p-4 m-4 rounded-2xl bg-gray-50 flex flex-col gap-4'
        onSubmit={handleSendMessage}
      >
        <div>أكتب اجابتك أو سؤالك وسيقوم المساعد الآلي بالإجابة عنه ...</div>
        <div className='flex gap-2 rounded-lg overflow-hidden'>
          <input
            type='text'
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className='flex-1 rounded-md px-4 py-2 text-sm focus:outline-none'
            placeholder='أكتب اجابتك أو سؤالك وسيقوم المساعد الآلي بالإجابة عنه...'
          />
          <MainButton
            pading={"p-2"}
            bg={"bg-primary-300"}
            hvr={"hover:bg-primary-200"}
            text={"text-white"}
          >
            <ArrowUp />
          </MainButton>
        </div>
      </form>
    </div>
  );
}
