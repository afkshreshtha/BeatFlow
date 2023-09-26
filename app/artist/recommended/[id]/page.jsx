'use client'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useGetArtistDetailsQuery } from '../../../redux/services/jioSavaanapi'

import AlbumDetailsCard from './components/AlbumDetailsCard'
import { useSelector } from 'react-redux'

import axios from 'axios'

const AlbumDetails = () => {
  const router = useRouter()
  const { id } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const [songs, setSongs] = useState([])
  const activeSongId = activeSong?.id
  const { data: artistData } = useGetArtistDetailsQuery(id)
  const number = Number(artistData?.data?.fanCount)
  const formattedNumber = number.toLocaleString('en-IN')
  const fetchData = async () => {
    const data = await axios.get(
      `https://saavn.me/artists/${id}/recommendations/${activeSong.id}`,
    )
    setSongs(data?.data)
  }

  useEffect(() => {
    fetchData()
  }, [id,activeSongId])
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
            className="cursor-pointer hover:underline "
            onClick={() => router.push(`/artist/albums/${id}`)}
          >
            Albums
          </h2>
        </div>
        <div class="text-white">
          <h2
            className="cursor-pointer hover:underline text-red-200 "
            onClick={() => router.push(`/artist/recommended/${id}`)}
          >
            Recommended
          </h2>
        </div>
      </div>
      <div className=" mt-6 flex flex-col">
        <div className=" flex flex-wrap sm:justify-start justify-center gap-10 xl:gap-4 md:gap-4  mb-20">
          {songs?.data?.map((song, index) => (
            <AlbumDetailsCard
              key={song.id}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={song}
              i={index}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default AlbumDetails
