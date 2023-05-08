"use client";

import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Chat from "@/components/Chat";
import InputForm from "@/components/InputForm";
import { Message } from "@/types/custom";
import ThreeDotsLoader from "@/components/ThreeDotsLoader";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const [chats, setChats] = useState<Message[]>([
    {
      role: "system",
      content: "あなたは優秀なチャットボットアシスタントです。質問には正確に答えてください。",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { status } = useSession();

  const handleSubmit = async (message: Message) => {
    try {
      setIsSubmitting(true);
      setChats((prev) => [...prev, message]);

      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: [...chats, message].map((d) => ({
            role: d.role,
            content: d.content,
          })),
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      // Azureはresultにセットされないため、dataそのものを渡す
      setChats((prev) => [...prev, data.data as Message]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (status === "unauthenticated") {
    return (
      <>
        <div className="mt-5 p-4 md:col-span-2 md:mt-0">
          <div className="max-w-md">
            <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
              サインインされていません。
            </p>
            <p className="mb-8">
              OpenAIを利用するにはサインインを行ってください。
            </p>
          </div>
        </div>
      </>
    )
  }
  return (
    
    <div className="flex flex-col bg-gray-80">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5 grow">
        <AnimatePresence>
          {chats.slice(1, chats.length).map((chat, index) => {
            return <Chat role={chat.role} content={chat.content} key={index} />;
          })}
        </AnimatePresence>
        {isSubmitting && (
          <Flex alignSelf="flex-start" px="2rem" py="0.5rem">
            <ThreeDotsLoader />
          </Flex>
        )}
      </div>
      <div className="bottom-0 w-full sticky">
        <InputForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;
