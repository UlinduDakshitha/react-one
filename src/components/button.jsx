import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function AppButton({ label = 'Button', variant = 'contained', onClick, sx }) {
  return (
    <Button variant={variant} onClick={onClick} sx={sx}>
      {label}
    </Button>
  )
}