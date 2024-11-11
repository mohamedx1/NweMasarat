import React, { useState, useRef, useEffect } from "react";
import style from "./chat.module.css";
import BootChatAvatat from "../../../common/bootChatAvatar/BootChatAvatat";
import MainButton from "../../../common/buttons/Mainbutn";
import { ArrowUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getMainChat } from "../../../../store/mainChat/mainChatSlice";
import getRestoreChat from "../../../../store/restoreMainChatt/act/actChatting";
import VideoCapture from "./../../../common/camerCopmponent/CameraComponent";
import Modal from "../../../common/modal/Modal";
import { toggleModal } from "../../../../store/modalCollaps/ModalCollapseSlice";
import { changeAcess } from "../../../../store/camerAcess/CamerAcsess";
import { aiChatt } from "../../../../store/chattWithAi/chattAiSlice";

type Message = { id?: string; lesson?: string; student_answer?: string };

export default function ChatComponent() {
  const dispatch = useAppDispatch();
  const [allChat, setAllChat] = useState<any>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { camerIsAcsessable } = useAppSelector((state) => state.cameraAcsess);
  const { ModalIsOpend } = useAppSelector((state) => state.togegleModal);
  const token = localStorage.getItem("token");
  const { content, message, isLoading, error } = useAppSelector(
    (state) => state.chatting
  );
  // const { aiResponse } = useAppSelector((state) => state.aiResonse);

  const {
    error: restoreError,
    messages: initialMessages,
    isLoading: restoreLoading,
  } = useAppSelector((state) => state.restoreMessages);

  //-------------------------------------------------------ModalUseEffect------------------------
  const userResponse = {
    question: "اشرح قانون نيوتن الثاني",
  };

  useEffect(() => {
    dispatch(aiChatt({ userResponse, token }));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(toggleModal());
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChat]);

  useEffect(() => {
    dispatch(getRestoreChat(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (initialMessages.length === 0) {
      dispatch(getMainChat(token));
    }
  }, [initialMessages, dispatch, token]);

  useEffect(() => {
    if (content && content.length > 0) {
      setAllChat((prevMessages: any) => [...prevMessages, content[0]]);
    }
  }, [content]);

  const messageIndex = useRef(0);
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim() === "") return;

    const newMessage: Message = {
      student_answer: "true",
    };

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
              student_answer: "the value will take from user",
            } as Message,
          ];
        }
      });
    }

    setInputMessage("");

    if (content && content.length > messageIndex.current) {
      setAllChat((prevMessages: Message[]) => [
        ...prevMessages,
        content[messageIndex.current],
      ]);
      messageIndex.current += 1;
    }
  };

  return (
    <div className={`flex flex-col rounded-lg shadow-md h-screen`}>
      {ModalIsOpend ? (
        <Modal>
          <div className='flex flex-col gap-2 items-center p-6 bg-white w-fit shadow-md'>
            <div className='w-16 bg-secondary-200 p-2 rounded-full'>
              <BootChatAvatat emotion={0} />
            </div>
            <h3 className='text-black text-text-xl font-extrabold'>
              السماح بالوصول للكاميرا؟
            </h3>
            <p className='text-gray-600'>
              لضمان رحلة تعلم افضل <br />
              اسمح لنا بتفعيل الكاميرة
            </p>
            <div className='flex justify-between gap-5'>
              <button
                onClick={() => {
                  dispatch(toggleModal());
                  dispatch(changeAcess(false));
                }}
                className='px-4 py-1 w-40 rounded-2xl border border-gray-500 hover:text-white hover:bg-primary-300 hover:border-none transition-all'
              >
                عدم السماح
              </button>
              <button
                onClick={() => {
                  dispatch(changeAcess(true));
                  dispatch(toggleModal());
                }}
                className='px-4 py-1 w-40 rounded-2xl text-white bg-primary-300 hover:text-black hover:bg-white hover:border hover:border-gray-500 transition-all'
              >
                سماح
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${style.noScrollbar} ${style.chatComponent}`}
      >
        <div className='flex gap-2 w-full mt-4'>
          <div className='bg-secondary-300 w-14 p-1 rounded-full h-12 flex items-center justify-center'>
            <BootChatAvatat emotion={0} />
          </div>
          <div className='flex justify-between mt-4 w-4/5'>
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-l bg-transparent text-gray-800`}
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
        className='p-4 m-4 rounded-2xl  bg-gray-50 flex flex-col gap-4'
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

      {camerIsAcsessable && <VideoCapture />}
    </div>
  );
}
