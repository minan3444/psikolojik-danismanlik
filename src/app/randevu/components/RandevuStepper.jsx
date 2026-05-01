'use client';

import { Stepper, Step, StepLabel } from '@mui/material';
import { STEPS } from '../constants/steps';

/**
 * RandevuStepper — Üstteki adım göstergesi.
 */
export default function RandevuStepper({ activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}