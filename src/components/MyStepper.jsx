/** @format */

import * as React from 'react';
import { Box, Stepper, Step, StepButton, Button, Typography } from '@mui/material';
import { FifthPage, FirstPage, FourthPage, SecondPage, ThirdPage } from '../pages';
import axios from 'axios';

const steps = [
  'Planning',
  'Approved Design',
  'Installation Company',
  'Payment Schedule',
  'Certificate Issuance',
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(
    () => +localStorage.getItem('com_active_step')
  );
  const [completed, setCompleted] = React.useState({});
  const [isAllowed, setIsAllowed] = React.useState(false);
  const id = localStorage.getItem('com_id');

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
    localStorage.setItem('com_active_step', newActiveStep);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    localStorage.setItem('com_active_step', activeStep - 1);
  };

  const handleStep = step => () => {
    setActiveStep(step);
    localStorage.setItem('com_active_step', step);
  };

  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`allowed.php?id=${id}`)
        .then(res => res.data.res === 'true' && setIsAllowed(true))
        .catch(err => console.log(err));
    }, 1000);
    return () => clearInterval(interval);
  }, [id]);
  return (
    <Box sx={{ margin: 1 }}>
      <Stepper
        sx={{
          paddingBlock: '2vh',
          overflow: 'hidden',

          width: '100%',
          overflowX: { xs: 'auto', sm: 'hidden' },
        }}
        nonLinear
        alternativeLabel
        activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              color='inherit'
              onClick={handleStep(index)}
              disabled={index > 1 && !isAllowed}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 ? (
              <FirstPage />
            ) : activeStep === 1 ? (
              <SecondPage />
            ) : activeStep === 2 ? (
              <ThirdPage />
            ) : activeStep === 3 ? (
              <FourthPage />
            ) : (
              <FifthPage />
            )}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                // color='inherit'
                variant='contained'
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button
                variant='contained'
                onClick={handleNext}
                sx={{ mr: 1 }}
                disabled={(activeStep > 0 && !isAllowed) || activeStep + 1 === steps.length}>
                Next
              </Button>
              {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant='caption' sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))} */}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
