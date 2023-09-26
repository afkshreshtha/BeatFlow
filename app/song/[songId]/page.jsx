'use client'

import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useGetTopSongsDetailsQuery } from '../../redux/services/jioSavaanapi'
import Image from 'next/image'
import { useSongLyrics } from '../../hooks/useSongLyrics'
import PlayPause from '../../components/PlayPause'
import { playPause, setActiveSong } from '../../redux/Features/playerSlice'
import ArtistCard from './components/ArtistCard'

const SongDetails = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { songId } = useParams()
  const lyrics = useSongLyrics(songId)
  const { data } = useGetTopSongsDetailsQuery({
    songid: songId,
  })
  const decodeHTMLString = (str) => {
    const decodedString = str?.replace(/&quot;/g, '"')
    return decodedString
  }
  let str = data?.data[0].name
  str = decodeHTMLString(str)
  const song = data?.data[0]
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data }))
    dispatch(playPause(true))
  }

  function formatIndianNumber(number) {
    if (typeof number !== 'number') {
      return number // Return as is if it's not a number
    }

    const formattedNumber = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
      style: 'decimal',
    }).format(number)
    return formattedNumber
  }

  const numberWithCommas = formatIndianNumber(data?.data[0]?.playCount)
  const regex = /\d+/g
  // console.log(data?.data[0])
  return (
    <div className="">
      <div className=" flex bg-[#bbbbb4] justify-center md:justify-start relative ">
        <Image
          src={data?.data[0]?.image[2].link}
          alt="img"
          width={180}
          height={180}
          className="mt-5 ml-5"
        />
      </div>
      <div className="bg-[#bbbbb4] md:absolute top-20 truncate left-[490px]">
        <h1 className="text-white text-center font-medium text-[1.6rem]">
          {str}
        </h1>
        <div className="flex flex-wrap justify-center">
          <span className="text-white">by</span>
          <p className="text-white ml-2">{data?.data[0]?.primaryArtists}</p>
        </div>
        <div className="flex flex-wrap justify-center items-center text-white">
          <h1>Song . {numberWithCommas} plays</h1>
        </div>
        <div className="mb-4 ml-4">
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
      </div>
      <div className="bg-[#bbbb4] mt-5 p-5">
        <h2 className="text-white text-center font-medium text-[1.6rem]">
          Lyrics
        </h2>
        <div className="text-white mt-2 max-h-[300px] overflow-y-auto bg-[#333] p-4 rounded">
          {lyrics?.lyrics?.data?.lyrics
            ? lyrics?.lyrics?.data?.lyrics
            : 'No Lyrics Found'}
        </div>
      </div>
      <div className="flex flex-col mt-1">
        {data?.data?.[0].primaryArtistsId !== '' ? (
          <>
            <h1 className="text-white text-3xl mt-14 font-bold">Artists</h1>
            <div className="flex">
              {data?.data?.[0].primaryArtistsId &&
                data?.data?.[0].primaryArtistsId
                  .match(regex)
                  .map((artist) => (
                    <ArtistCard key={artist?.id} artist={{ id: artist }} />
                  ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

export default SongDetails
