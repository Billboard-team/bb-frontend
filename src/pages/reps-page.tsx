import { Grid, Stack, StackSeparator } from "@chakra-ui/react";
import MemberGrid from "@/components/member-grid";
import RepCard from "@/components/rep-card";
import { CosponsorCardProp } from "@/components/type";
import { useEffect, useState } from "react";

const RepsPage = () => {

  const [members, setMembers] = useState<CosponsorCardProp[]>([]);
  
  const fetchCongressMembers = () => {
    //setloading
    //seterror
  
    fetch("http://localhost:8000/api/congress/121")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Congress Reps:", data);

        if (!data.congress_members || !Array.isArray(data.congress_members)) {
          throw new Error("Invalid response format");
        }

        setMembers(data.congress_members);
      })
      .catch((err) => {
        console.error("Error fetching congress members:", err);
      })
  };

  useEffect(() => {
    fetchCongressMembers();
  }, [])
  
  return (
      <MemberGrid items={members}>
        
      </MemberGrid>
  );
};

export default RepsPage;