import { useEffect, useState } from 'react';
import {
  Dialog,
  Button,
  useDialog,
  CloseButton,
  Steps,
  ButtonGroup,
  Image,
} from '@chakra-ui/react';
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';

import Step1 from '@/assets/Billboard-Logo.png';
import Step2 from '@/assets/ob1.png';
import Step3 from '@/assets/ob2.png';

const OnboardingDialog = () => {
  const dialog = useDialog()
  const {
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const options: GetTokenSilentlyOptions = {
          authorizationParams: {
            audience: "https://billboard.local",
          },
        };

        const token = await getAccessTokenSilently(options);
        const res = await fetch("http://localhost:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();

        data.expertiseTags = data.expertiseTags || [];
        setUserProfile(data);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setProfileError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated && userProfile && !userProfile.name) {
      dialog.setOpen(true)
    }
  }, [isAuthenticated, userProfile, navigate]);

  return (
    <>
      <Dialog.RootProvider 
        value={dialog}
        placement="center"
        size="xl"
      >
        <Steps.Root defaultStep={0} count={steps.length}>      
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
              </Dialog.Header>
              <Dialog.Body>
                <Steps.List>
                  {steps.map((step, index) => (
                    <Steps.Item key={index} index={index} title={step.title}>
                      <Steps.Indicator />
                      <Steps.Title>{step.title}</Steps.Title>
                      <Steps.Separator />
                    </Steps.Item>
                  ))}
                </Steps.List>

                {steps.map((step, index) => (
                  <Steps.Content key={index} index={index} pt={4} autoFocus={false} textAlign="center">
                    <Image src={step.image} margin="auto"/>

                    <Steps.Description fontSize="lg" margin="4">{step.description}</Steps.Description>
                  </Steps.Content>
                ))}

              </Dialog.Body>
              <Dialog.Footer justifyItems="stretch">
                <ButtonGroup size="sm" variant="outline">
                  <Steps.PrevTrigger asChild>
                    <Button variant='subtle'>Prev</Button>
                  </Steps.PrevTrigger>
                  <Steps.NextTrigger asChild>
                    <Button variant="solid">Next</Button>
                  </Steps.NextTrigger>
                </ButtonGroup>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>

        </Steps.Root>
      </Dialog.RootProvider>
    </>
  );
};

const steps = [
  {
    title: "Welcome!",
    description: "We're excited to have you join us! Let's get you set up in just a few steps.",
    image: Step1
  },
  {
    title: "Your Profile",
    description: "Add your details and preferences to make the most of your experience.",
    image: Step2
  },
  {
    title: "Explore",
    description: "Discover the congressional information and discourse in your local and federal government!",
    image: Step3
  },
  {
    title: "You're All Set!",
    description: "You're ready to start using our platform. Enjoy your journey with us!",
    image: ""
  }
];


export default OnboardingDialog;
