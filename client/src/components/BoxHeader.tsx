import React from 'react'
import FlexBetween from './FlexBox'
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
    title: string;
    sideText: string;
    subtitle?: string;
    sideTextColor?: string;
    //Question mark means optional if not then required
    icon?: React.ReactNode;
}

const BoxHeader = ({icon, title, subtitle, sideText, sideTextColor}: Props) => {
    const {palette} = useTheme();
  return (
    <FlexBetween color={palette.grey[400]} margin="1.5rem 1rem 0 1rem">
        <FlexBetween>
            {icon}
            <Box width="100%">
                <Typography variant="h4" mb="-0.1rem">
                    {title}
                </Typography>
                <Typography variant="h6" p="0.2rem" ml="-4px">
                    {subtitle}
                </Typography>

            </Box>
        </FlexBetween>
        <Typography 
            variant="h5" 
            fontWeight="700" 
            color={sideTextColor || palette.secondary[300]} // Use the sideTextColor prop if provided, otherwise default to "#02bf3e"
        >
                {sideText}
        </Typography>
        
    </FlexBetween>
  )
}

export default BoxHeader;