import { BsArrowReturnRight } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Card, Heading, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import { FollowingCardProp } from "./type";
import BillGrid from "./bill-grid";

const url = "http://localhost:8000/api/following-feed"

const FollowingFeed = () => {
  const [cards, setCards] = useState<FollowingCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const fetchFollowingFeed = async () => {
    const token = await getAccessTokenSilently()
    const res = await fetch(url, {
      headers: {'authorization': `bearer ${token}`}
    })
    if (!res.ok) {
      setError("Failed to load your following")
    }
    const data = await res.json()
    setCards(data.followings)
  }

  useEffect(() => {
    setLoading(true)
    fetchFollowingFeed()
    setLoading(false)
  }, [])
  
  return (
    <Box>
      <Heading py={3}>Your Following</Heading>

      {loading && <>
        <Skeleton m={3} height="200px"/>
        <Skeleton m={3} height="200px"/>
        <Skeleton m={3} height="200px"/>
      </> }
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && cards.map((card) => {
          return <Card.Root colorPalette="teal" variant="subtle">
            <Card.Header>
              <Card.Description fontStyle="italic">{card.username} {card.interaction}</Card.Description>
              <Card.Description><BsArrowReturnRight/></Card.Description>
            </Card.Header>
            <Card.Body><BillGrid items={card.bills}/></Card.Body>
            <Card.Footer></Card.Footer>
          </Card.Root>
        })
      }
    </Box>
  )
}

export default FollowingFeed
