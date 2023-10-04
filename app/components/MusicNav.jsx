'use client'
import MusicPlayer from './MusicPlayer'
import { useSelector } from 'react-redux'

const MusicNav = () => {
  const { activeSong } = useSelector((state) => state.player)
  return <div>{activeSong?.name && <MusicPlayer />}</div>
}

export default MusicNav
