import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {IoMdHeart, IoMdHeartEmpty} from "react-icons/io"
import { Toaster, toaster } from "@/components/ui/toaster";
import { useParams } from "react-router-dom";

function LikeButton() {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [liked, setLiked] = useState(false)
  const { id } = useParams<{ id: string }>();  

  useEffect(() => {
    checkLikeStatus()
  }, [])


  const checkLikeStatus = async () =>  {
    const url = `http://localhost:8000/api/bills/${id}/check-liked/`
    const token = await getAccessTokenSilently();
    const res = await fetch(url, {
      headers: {'authorization': `bearer ${token}`}
    })

    setLiked(res.ok)
  }

  const handleToggleLike = async () => {
    const subpath = liked ? "unlike-bill" : "like-bill"
    const token = await getAccessTokenSilently();
    const url = `http://localhost:8000/api/bills/${id}/${subpath}/`

    try {
      const res = await fetch(url, {
        method: 'put',
        headers: {'authorization': `bearer ${token}`}
      })

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setLiked(!liked)
    }
    catch(err) {
      toaster.create({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to like comment',
        type: 'error',
        duration: 3000,
        meta: { closable: true },
      });
    } 
  }

  return (
  <>
      <IconButton 
        width="1"
        disabled={!isAuthenticated}
        onClick={handleToggleLike}>
        {
          liked ? <IoMdHeart/> : <IoMdHeartEmpty/>
        }
      </IconButton>
      <Toaster/>
  </>
  )
}

export default LikeButton
