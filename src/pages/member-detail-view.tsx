import { Box, Grid, Stack, StackSeparator, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cosponsor } from "@/components/type";
import DetailMemberCard from "@/components/member-card-detailed";

const MemberDetailView = () => {
  const { id } = useParams<{ id: string }>();  
  const [cosponsor, setCosponsor] = useState<Cosponsor | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    //make request for cosponsor information *including* their cosponsored legislation
    const url = `http://localhost:8000/api/members/${id}`
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cosponsor) {
          console.log(data)
          setCosponsor(data.cosponsor);
        } else {
          setCosponsor(null);
        }
      })
      .catch(error => {
        console.error("Error fetching representative details:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!cosponsor) return <Text fontSize="xl" color="red.500">Member not found</Text>;

  return (
    <Stack separator={<StackSeparator />} gapY={2}>
      <Box mb={6}>
        <Grid autoRows="auto" templateColumns="repeat(1, minmax(350px, 1fr))" gap={6}>
          <DetailMemberCard member={cosponsor}></DetailMemberCard>
        </Grid>
        
      </Box>
    </Stack>
  );
};


export default MemberDetailView;
