import React, { useRef } from "react";
import { Message } from "@/types/custom";

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>; // onSUbmit関数は親コンポーネントで提供され、ユーザーがメッセージを送信すると呼び出される
};

const InputForm = ({ onSubmit }: InputFormProps) => {
  // input要素への参照を作成
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // input要素から直接値を取得
    const inputValue = inputRef.current?.value;

    if (inputValue) {
      // 親コンポーネントから提供されたonSubmit関数を介して送信されたメッセージを処理
      onSubmit({
        role: "user",
        content: inputValue,
      });
      inputRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-4 border-gray-200"
    >
      <textarea
        ref={inputRef}
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 resize-none w-full"
        placeholder="メッセージを入力..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded"
      >
        送信
      </button>
    </form>
  );
};

export default InputForm;