import { useEffect } from 'react';
import {
  Dialog,
  Button,
  useDialog,
  CloseButton,
  Steps,
  ButtonGroup,
  Image,
} from '@chakra-ui/react';

const OnboardingDialog = () => {

  // const handleNext = () => {
  //   if (currentStep < steps.length - 1) {
  //     setCurrentStep(currentStep + 1);
  //   } else {
  //     onClose();
  //   }
  // };

  // const handlePrevious = () => {
  //   if (currentStep > 0) {
  //     setCurrentStep(currentStep - 1);
  //   }
  // };

  // const handleSkip = () => {
  //   onClose();
  // };

  const dialog = useDialog()


  useEffect(() => {

    dialog.setOpen(true)
  },[])


  return (
    <>
      <Dialog.RootProvider 
        value={dialog}
        placement="center"
        size="xl"
      >
        {/* <Dialog.Trigger asChild> */}
        {/*   <Button colorScheme="blue"> */}
        {/*     Reopen Onboarding */}
        {/*   </Button> */}
        {/* </Dialog.Trigger> */}
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
                  <Steps.Content key={index} index={index} padding={2} width="full" textAlign="center">
                    <Image src={step.image} margin="auto"/>

                    {step.description}
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
    description: "We're excited to have you join us. Let's get you set up in just a few steps.",
    image: "https://placehold.co/400x250"
  },
  {
    title: "Your Profile",
    description: "Add your details and preferences to make the most of your experience.",
    image: "https://placehold.co/400x250"
  },
  {
    title: "Explore",
    description: "Discover the powerful tools and resources available to you.",
    image: "https://placehold.co/400x250"
  },
  {
    title: "You're All Set!",
    description: "You're ready to start using our platform. Enjoy your journey with us!",
    image: "https://placehold.co/400x250"
  }
];


export default OnboardingDialog;
