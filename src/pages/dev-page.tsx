import { SkeletonText } from "@/components/ui/skeleton";
import { Button, Card, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuCodeXml, LuFile } from "react-icons/lu";

const sample = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const id = 54

interface SummaryProps {
  summary: string,
  token_count: number
}

interface SourcesProps {
  date: string,
  pdf_url: string, 
  xml_url: string,
  type: string,
}

function Dev() {
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [summary, setSummary] = useState<SummaryProps| null>(null)
  const [source, setSource] = useState<SourcesProps| null>(null)
 
  useEffect(() => {
    //Fetch AI summary
    const fetchSummarized = async () => {
      const res = await fetch(`http://localhost:8000/api/bills/${id}/text/summarized`)
      if (!res.ok) {
        if (res.status == 404) {
          setNotFound(true)
        }
      }
      else {
        const data = await res.json()
        setSummary(data)
      }
    }

    //Fetch text sources
    const fetchSources = async () => {
      const res = await fetch(`http://localhost:8000/api/bills/${id}/text/sources`)
      if (!res.ok) {
        if (res.status == 404) {
          setNotFound(true)
        }
      }
      const data = await res.json()
      setSource({date: data.date, pdf_url: data.formats[1].url, xml_url: data.formats[2].url, type: data.type})
    }


    fetchSummarized()
    fetchSources()
  }, [id]);

  return (
    <Card.Root onClick={() => setLoading(false)}>
      <Card.Header justifyContent="space-between">
        <HStack>
          <Card.Title>AI Summary</Card.Title>
          <Card.Description opacity={0.7}>Generated summaries can have mistakes. Check important info.</Card.Description>
        </HStack>
      </Card.Header>
      <Card.Body>
        {loading ? <SkeletonText noOfLines={3}/> : 
          notFound ? <Card.Description color="red.400">Text Currently Unavailable</Card.Description> : <Card.Description>{summary?.summary}</Card.Description>
        }
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button disabled={loading || notFound} variant="solid">
          View PDF <LuFile/></Button>
        <Button disabled={loading || notFound} variant="solid">View XML <LuCodeXml/></Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default Dev
