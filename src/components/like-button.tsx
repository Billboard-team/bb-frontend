import { IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {IoMdHeart, IoMdHeartEmpty} from "react-icons/io"

function LikeButton({postId} : {postId: number}) {

  const [liked, setLiked] = useState(false)

  useEffect(() => {

  }, [])

  const handleToggleLike = () => {
    if (liked) {
      setLiked(false)
    }
    else {
      setLiked(true)
    }
  }

  return (
  <>
      <IconButton onClick={handleToggleLike}>
        {
          liked ? <IoMdHeart/> : <IoMdHeartEmpty/>
        }
      </IconButton>
  </>
  )
}

export default LikeButton
