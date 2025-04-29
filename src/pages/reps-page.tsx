import { Grid, Stack, StackSeparator } from "@chakra-ui/react";
import MemberGrid from "@/components/member-grid";
import RepCard from "@/components/rep-card";
import { CosponsorCardProp } from "@/components/type";
import { useEffect, useState } from "react";

const RepsPage = () => {

  const [members, setMembers] = useState<CosponsorCardProp[]>([]);
  const retrieveMembersURL = "http://localhost:8000/api/members/121"
  
  const fetchCongressMembers = () => {
    //setloading
    //seterror
  
    fetch(retrieveMembersURL)
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
      <MemberGrid items={mockMembers}>
        
      </MemberGrid>
  );
};

const mockMembers: CosponsorCardProp[] = [
  {
    bill_id: "hr123",
    bioguide_id: "A000360",
    full_name: "John Adams",
    party: "Democrat",
    state: "Massachusetts",
    district: 7,
    url: "https://www.congress.gov/member/john-adams/A000360",
    image_url: "https://via.placeholder.com/150x200?text=John+Adams",
  },
  {
    bill_id: "s456",
    bioguide_id: "B001234",
    full_name: "Susan Baker",
    party: "Republican",
    state: "Texas",
    district: 5,
    url: "https://www.congress.gov/member/susan-baker/B001234",
    image_url: "https://via.placeholder.com/150x200?text=Susan+Baker",
  },
  {
    bill_id: "hr789",
    bioguide_id: "C002567",
    full_name: "Mike Chen",
    party: "Independent",
    state: "California",
    district: 12,
    url: "https://www.congress.gov/member/mike-chen/C002567",
    image_url: "https://via.placeholder.com/150x200?text=Mike+Chen",
  },
  {
    bill_id: "s321",
    bioguide_id: "D003678",
    full_name: "Rachel Diaz",
    party: "Democrat",
    state: "Florida",
    district: null,
    url: "https://www.congress.gov/member/rachel-diaz/D003678",
    image_url: "https://via.placeholder.com/150x200?text=Rachel+Diaz",
  },
];
export default RepsPage;