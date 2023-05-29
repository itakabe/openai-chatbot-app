import React, { useEffect, useState } from 'react';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Cosmos } from '@/components/Cosmos'
import { format, fromUnixTime } from 'date-fns';
const cosmos = new Cosmos();

export default async function history() {

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
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
    // 全件取得
    const data = await cosmos.readAll();
    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        履歴一覧
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">ユーザにてチャットでやり取りしたデータの一覧となります。実装テスト中</p>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>日時</th>
                            <th>ユーザ</th>
                            <th>質問</th>
                            <th>回答</th>
                            <th>トークン数</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((data) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={data.id}>
                                <td>{JSON.stringify(format(new Date(fromUnixTime(data.created)), 'yyyy/MM/dd HH:mm:ss'))}</td>
                                <td>{JSON.stringify(data.user?.name) || "Unknown"}</td>
                                <td>{JSON.stringify(data.post?.messages[data.post.messages.length - 1].content)}</td>
                                <td>{JSON.stringify(data.choices[data.choices.length - 1].message.content)}</td>
                                <td>{JSON.stringify(data.usage.total_tokens)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>

    );
}