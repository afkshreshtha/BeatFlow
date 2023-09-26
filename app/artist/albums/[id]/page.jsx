'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { useGetArtistDetailsQuery } from '../../../redux/services/jioSavaanapi'
import useArtistSong from '../../../hooks/useArtistSong'
import AlbumDetailsCard from './components/AlbumDetailsCard'
import { useSelector } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'

const AlbumDetails = () => {
  const { id } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const [page, setPage] = useState(1)
  const { data: artistData } = useGetArtistDetailsQuery(id)
  const number = Number(artistData?.data?.fanCount)
  const formattedNumber = number.toLocaleString('en-IN')
  const { songs, hasMore, loading, error, totalResults } = useArtistSong(
    page,
    id,
    'albums',
  )
  const observer = useRef()
  const router = useRouter()
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )
  return (
    <>
      <div className="bg-[#bbbbb4] flex justify-center items-center h-50">
        <img
          src={artistData?.data?.image[2].link || '/images.png'}
          alt="Artist Image"
          className="w-[200px] h-[200px] rounded-full"
        />
      </div>
      <p className="text-white text-center text-[24px] font-semibold">
        {artistData?.data?.name}
      </p>
      <p className="text-white text-center text-[24px] font-semibold">
        {artistData?.data?.dominantType} . {formattedNumber} Listeners
      </p>
      <div class="flex justify-between items-center bg-gray-800 p-6">
        <div class="text-white">
          <h2
            className="cursor-pointer hover:underline "
            onClick={() => router.push(`/artist/${id}`)}
          >
            Songs
          </h2>
        </div>
        <div class="text-white text-center">
          <h2
            className="cursor-pointer hover:underline text-red-200 "
            onClick={() => router.push(`/artist/albums/${id}`)}
          >
            Albums
          </h2>
        </div>
        <div class="text-white">
          <h2
            className="cursor-pointer hover:underline"
            onClick={() => router.push(`/artist/recommended/${id}`)}
          >
            Recommended
          </h2>
        </div>
      </div>
      <div className=" mt-6 flex flex-col">
        <div className=" flex flex-wrap sm:justify-start justify-center gap-10 xl:gap-4 md:gap-4  mb-20">
          {loading && <ClipLoader color="#fff" />}
          {songs.map((song, index) => {
            if (songs.length === index + 1) {
              return (
                <div key={song.id} ref={lastBookElementRef}>
                  <AlbumDetailsCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={song}
                    i={index}
                  />
                </div>
              )
            } else
              return (
                <AlbumDetailsCard
                  key={song.id}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={song}
                  i={index}
                />
              )
          })}
        </div>
      </div>
    </>
  )
}

export default AlbumDetails
