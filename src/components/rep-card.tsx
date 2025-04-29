import { Badge, Card, Button, Stack, For, Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { CosponsorCardProp } from "@/components/type";

export default function RepCard({item}: {item: CosponsorCardProp}) {

    const navigate = useNavigate();

    //maxlength
    //displayed text truncation if needed

    return (
        <Card.Root width="320px">
            <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src="" />
                <Avatar.Fallback name="x" />
            </Avatar.Root>
            <Card.Title mb="2"
                _hover={{textDecor: "underline", cursor: "pointer"}}
                onClick={() => navigate('/member/${}')}>
                {item.full_name}</Card.Title>
            <Card.Description>
                {item.party} - {item.state} - District {item.district}
            </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
            <Button>Add</Button>
            </Card.Footer>
        </Card.Root> 
        
    )
}


    
    



