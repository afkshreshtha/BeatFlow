import MusicNav from './components/MusicNav'
import MobileNav from './components/MobileNav'
import Sidebar from './components/Sidebar'
import Searchbar from './components/Searchbar'
import './globals.css'
import { Providers } from './redux/provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'TuneWave',
  description: `Welcome to TuneWave, your ultimate music hub where you can discover a vast collection of music, songs, and talented artists. Explore the latest pop hits, uncover hidden indie gems, and relish timeless classics all in one place.

  With TuneWave, you have access to an extensive music library that caters to all genres and tastes. Whether you're searching for chart-toppers, soul-soothing melodies, or the freshest tracks, we've got you covered. Our user-friendly platform makes music discovery a breeze, helping you curate playlists, create your unique music journey, and share your favorite tunes with friends.
  
  Join our thriving community of music enthusiasts, where passion for music knows no bounds. TuneWave is where melodies meet moments, and every click brings you closer to your musical desires.
  
  Start your musical adventure today with TuneWave - Your Music Hub!`,
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="google-site-verification"
          content="QibisYWcAxZwed8-_w-2OVseaL58KAxSe7Jb2A6wXLQ"
        />
      </head>
      <body>
        <div className="relative flex">
          <div className="fixed top-0 left-0 h-full">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col md:pl-64">
            <Searchbar />
            <div className="flex-1 pb-40 px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
              <div className="flex-1 h-fit pb-40">
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
      </body>
    </html>
  )
}
