import React from 'react'
import { useGetArtistDetailsQuery } from '../../../redux/services/jioSavaanapi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ArtistCard = ({ artist }) => {
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
  } = useGetArtistDetailsQuery(artist.id)
  const router = useRouter()
  // console.log(artistData?.data?.image[2]?.link)
  return (
    <>
      <div className="mr-4 mt-10">
        <img
          src={artistData?.data?.image[2]?.link}
          alt=""
          className=" rounded-full "
          style={{display:'block'}}
        />
      </div>
      <div>
        <p className="legend cursor-pointer" onClick={()=>router.push(`/artist/${artist?.id}`)}>{artistData?.data?.name}</p>
      </div>
    </>
  )
}

export default ArtistCard
