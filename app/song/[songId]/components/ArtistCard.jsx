import React from 'react'
import { useGetArtistDetailsQuery } from '../../../redux/services/jioSavaanapi'
import Link from 'next/link'

const ArtistCard = ({ artist }) => {
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
  } = useGetArtistDetailsQuery(artist.id)



  return (
    <Link
      href={{
        pathname: `/artist/${artistData?.data?.id}`,// the data
      }}
    >
      <div className='mr-4 mt-10'>
        <img
        className='rounded-full lg:w-[300px] lg:h-[300px]'
        src={artistData?.data?.image[2].link}
        />
      </div>
      <div>
        <p className='text-white text-center mt-4'>{artistData?.data?.name}</p>
      </div>
    </Link>
  )
}

export default ArtistCard
