import MusicPlayer from "./components/MusicPlayer";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";
import "./globals.css";
import { Providers } from "./redux/provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useSelector } from "react-redux";
export const metadata = {
  title: "TuneWave",
  description: `
  TuneWave is your gateway to a world of music discovery and enjoyment. Explore an extensive library of music, from the latest hits to timeless classics. Whether you're in search of your favorite songs, discovering new artists, or curating playlists, TuneWave has you covered. Immerse yourself in a seamless music experience, and let the rhythm of TuneWave elevate your musical journey.
Discover, listen, and share your favorite tunes with TuneWave. Join our vibrant community of music enthusiasts and embark on a melodious adventure today.
  `,
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta
          name="google-site-verification"
          content="QibisYWcAxZwed8-_w-2OVseaL58KAxSe7Jb2A6wXLQ"
        />
      </head>

      <body>
        <div className="relative flex">
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col md:pl-64">
            {" "}
            {/* Add padding-left to avoid content overlap */}
            <Searchbar />
            <div className="flex-1 pb-40 px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit pb-40">
                <Providers>
                  {children}
                  <div className="fixed bottom-0 left-0 w-full h-30  bg-gray-500">
                    <Link href="songs/"></Link>
                    <MusicPlayer />
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
      </body>
    </html>
  );
}
