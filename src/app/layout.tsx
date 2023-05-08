import "@/styles/globals.css";
import Header from './Header';
import Main from "./Main";
import SessionProvider from "../provider/SessionProvider";

export const metadata = {
    title: 'Azure OpenAI Chatbot App',
    description: 'ChatGPT APIを使ったチャットアプリです。',
    viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <SessionProvider>
            <html lang="ja">
                <head />
                <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                        <Header />
                        <Main>{children}</Main>
                    </div>
                </body>
            </html>
        </SessionProvider>
    );
}

