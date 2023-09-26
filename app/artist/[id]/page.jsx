'use client'
import { useParams, useRouter } from 'next/navigation'
import React, {  useCallback, useRef, useState } from 'react'
import { useGetArtistDetailsQuery } from '../../redux/services/jioSavaanapi'
import useArtistSong from '../../hooks/useArtistSong'
import ArtistSongCard from './components/ArtistSongCard'
import { useSelector } from 'react-redux'

const ArtistDetails = () => {

  const { id } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const [page, setPage] = useState(1)
  const { data: artistData } = useGetArtistDetailsQuery(id)
  const number = Number(artistData?.data?.fanCount)
  const formattedNumber = number.toLocaleString('en-IN')
  const { songs, hasMore, loading, error, totalResults } = useArtistSong(
    page,
    id,
    "songs"
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
          <h2 className='cursor-pointer hover:underline text-red-200' onClick={()=>router.push(`/artist/${id}`)}>Songs</h2>
        </div>
        <div class="text-white text-center">
          <h2 className='cursor-pointer hover:underline' onClick={()=>router.push(`/artist/albums/${id}`)}>Albums</h2>
        </div>
        <div class="text-white">
          <h2 className='cursor-pointer hover:underline' onClick={()=>router.push(`/artist/recommended/${id}`)}>Recommended</h2>
        </div>
      </div>
      <div>
        {songs?.map((song, index) => {
          
            return (
              <div key={index}>
                <div key={song.id} ref={lastBookElementRef} >
                  <ArtistSongCard
                    key={song.id}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={song}
                    i={index}
                  />
                </div>
              </div>
            )
          
        })}
      </div>
    </>
  )
}

export default ArtistDetails
