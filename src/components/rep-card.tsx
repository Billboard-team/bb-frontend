import { Badge, Card, Button, Stack, For, Avatar, IconButton, Toaster } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { CosponsorCardProp } from "@/components/type";
import { useAuth0 } from "@auth0/auth0-react";
import { toaster } from "@/components/ui/toaster";
import { LuCircleCheckBig, LuCirclePlus } from "react-icons/lu";

export default function RepCard({item}: {item: CosponsorCardProp}) {

    const { isAuthenticated, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [addClicked, setAddClicked] = useState(false)

    //maxlength
    //displayed text truncation if needed


    const handleAddRep = async () => {
        
        const url = `http://localhost:8000/api/users/${item.bioguide_id}/followrep/`
        
        try {
            const token = await getAccessTokenSilently();
            const res = await fetch(url, {
                method: 'POST',
                headers: {'Authorization': `Bearer ${token}`}
            })
            console.log("Response status:", res.status);

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

        }
        catch(err) {
            setAddClicked(false)
            //toaster isnt throwing anything, user must be signed in
            toaster.create({
                title: 'Error',
                description: err instanceof Error ? err.message : 'Failed to follow rep, are you signed in?',
                type: 'error',
                duration: 3000,
                meta: { closable: true },
            })
        }
    }
    
    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src={item.image_url} />
                <Avatar.Fallback name="x" />
            </Avatar.Root>
            <Card.Title onClick={() => navigate(`/member/${item.bioguide_id}`)} mb="2" _hover={{textDecor: "underline", cursor: "pointer"}}>

                {item.full_name}

                </Card.Title>
            <Card.Description>
            </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
            Follow / Unfollow 
            <IconButton 
                colorScheme={addClicked ? "green" : "gray"} 
                onClick={async () => {
                  setAddClicked(!addClicked);
                  try {
                    await handleAddRep();
                  } catch (err) {
                    setAddClicked(!addClicked);
                  }
                }
                }>
                {addClicked ? <LuCircleCheckBig/> : <LuCirclePlus/>}
                </IconButton>

            </Card.Footer>
        </Card.Root> 
        
    )


}




    
    



