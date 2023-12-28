import MusicNav from "./components/MusicNav";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title:
    "Tunewave: Your Ultimate Music Hub for Pop Hits, Indie Gems, and Timeless Classics! 🎶 #MusicMagic",
  description: `Welcome to Tunewave: your go-to music hub! Discover pop hits, indie gems, and timeless classics in one place. 🎶 #MusicMagic`,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="QibisYWcAxZwed8-_w-2OVseaL58KAxSe7Jb2A6wXLQ"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8166123895280023"
          crossorigin="anonymous"
        ></script>
        <meta
          name="google-adsense-account"
          content="ca-pub-8166123895280023"
        ></meta>
        <meta name="msvalidate.01" content="2AAB175FE4725024647F5D62047BC113" />
      </head>
      <body>
        <h1>
          <div className="relative flex">
            <div className="fixed top-0 left-0 h-full">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col md:pl-64">
              <Searchbar />
              <div className="flex-1  px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
                <div className="flex-1">
                  <Providers>
                    {children}
                    <div className="fixed bottom-0 left-0 w-full h-30  bg-gray-500">
                      <MusicNav />
                      <div className="md:hidden">
                        <MobileNav />
                      </div>
                    </div>
                    <ToastContainer />
                  </Providers>
                </div>
              </div>
            </div>
          </div>
        </h1>
      </body>
    </html>
  );
}
