"use client";
import headerNavLinks from '@/data/headerNavLinks'
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
    const { data: session, status } = useSession();
    return (
        <header className="text-center">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Azure OpenAI Chatbot App</span>
                    </a>
                    {status === "authenticated" && (
                        <div className="flex items-center justify-between">
                            <p className="">
                                ユーザ: {session!.user!.email}
                            </p>
                            <a href="#" className="mx-2 text-sm text-blue-600 dark:text-blue-500 hover:underline" onClick={() => signOut()}>サインアウト</a>
                        </div>
                    )}
                    {status === "unauthenticated" && (
                        <div className="flex items-center justify-between">
                            <p className=""></p>
                            <a href="#" className="mx-2 text-sm text-blue-600 dark:text-blue-500 hover:underline" onClick={() => signIn("azure-ad")}>サインイン</a>
                        </div>
                    )}

                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                            {headerNavLinks.map((link) => (
                                <li key={link.title}>
                                    <Link href={link.href} prefetch={false} className="text-gray-900 dark:text-white hover:underline" aria-current="page">{link.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    );
};

export default Header;