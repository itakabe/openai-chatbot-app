"use client";
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSession } from "next-auth/react";
import CodeBlock from "@/components/CodeBlock";
import { Message } from "@/types/custom";

export default function Form() {
  const [chats, setChats] = useState<Message[]>([
    {
      role: "system",
      content: "あなたは優秀なチャットボットアシスタントです。質問には正確に答えてください。",
    },
  ]);
  const [model, setModel] = useState("chat");
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const handleClick = async () => {
    setLoading(true);
    const response = await fetch(`/api/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setResult(data.data);
    setLoading(false);
  };

  if (status === "loading") {
    return (
      <>
        <div className="mt-5 p-4 md:col-span-2 md:mt-0">
          <div className="max-w-md">
            <p className="mb-8">
              読み込み中...
            </p>
          </div>
        </div>
      </>
    )
  }

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
    <>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 p-4 md:col-span-2 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div>
                <label htmlFor="Input" className="block text-sm font-medium leading-6 text-gray-900">
                  質問文
                </label>
                <div className="mt-2">
                  <textarea
                    rows={3}
                    className="mt-1 px-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    placeholder="ここに質問を入れてください"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900">
                  モデルを選ぶ
                </label>
                <select
                  className="mt-2 block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option value="chat">gpt-35-turbo</option>
                  <option value="davinci">text-davinci-003</option>
                </select>
              </div>

            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <button
                onClick={handleClick}
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                質問する
              </button>
              {loading && <div className="loading"></div>}
            </div>

          </div>
        </div>

        <div className="mt-4 mr-4 shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <h2 className="text-base font-semibold leading-6 text-gray-900">質問の答え</h2>
            <p className="mt-1 text-sm text-gray-600"><ReactMarkdown components={{
              code: CodeBlock
            }}>{result}</ReactMarkdown></p>
          </div>
        </div>
      </div>
    </>

  );
}