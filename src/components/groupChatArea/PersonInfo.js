// import { AccountCircleIcon } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import styled from '@emotion/styled';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { StyledBox } from './GroupChatArea';
import { IconButton } from '@mui/material';
import { Typography } from '@mui/material';
function PersonInfo() {
    const mediaArray = [
        LinkedInIcon,
        InstagramIcon,
        TwitterIcon
    ]

    return (
        <StyledBox style={{
            marginTop: "none",
            padding: "0px 96px 0px 12px",
        }}>
            <Box
            className='flex items-center'
            >
                <IconButton>
                    <KeyboardBackspaceIcon />
                </IconButton>
                <Typography
                
                sx={{
                    fontFamily: "Lato"
                }} fontSize={"20px"} fontWeight={700} color={"#3884F7"}>
                    Group Info / Person 1
                </Typography>
            </Box>
            <Box
            className='ml-3 mt-4'
            >
                <Box>
                    <AccountCircleIcon fontSize='56px' />
                </Box>
                <p 
                className='text-base font-bold my-2 mx-0 text-[#323232]'>
                Person 1
                </p>
                <Box 
                className='my-2 mx-0'
                >
                   {
                    mediaArray.map((MediaIcon, mediaIconIndex)=>{
                        return (
                            <MediaIcon
                            className='m-1 text-4xl'
                            />
                        )
                    })
                   }
                </Box>
                <Typography sx={{
                    fontFamily: "Lato"
                }} fontSize={"14px"} fontWeight={400} color={"#323232"} marginTop={2}>
                    An organized and enthusiastic designer, whose life has been nothing but a series of unplanned and unexpected events. I enjoy working on topics that are out of the box and that would let me come up with innovative ideas.
                </Typography>

                <Typography sx={{
                    fontFamily: "Lato"
                }} fontSize={"16px"} fontWeight={700} color={"#323232"} marginTop={2}>
                    Founder of <a href='#'
                    className='text-[#734AC7]'
                    >
                        @Beyond Design
                    </a>
                </Typography>



                <Box
                className='py-4 px-0'
                >
                    <p
                    className='font-bold text-2xl'
                        style={{
                            fontFamily: 'Lato',
                        }}
                    >
                        Find them in
                    </p>

                    <InfoTile title={"Hiring Techniques"} buttontitle={"Forum"} />
                    <InfoTile title={"Beyond Design"} buttontitle={"Group"} />

                </Box>
            </Box>



        </StyledBox >
    )
}

function InfoTile({ index, title, buttontitle }) {

    return (
        <Box 
        className='bg-white py-2 px-4 flex justify-center items-center border-0.5 border-solid border-[#EEEEEE] mb-2'>
            <Box>
                <p 
                className='mt-1 mx-0 mb-2'
                >
                    <span 
                    className='text-[#323232] text-base font-semibold'
                    >
                        {title}
                    </span>
                </p>

                <Button variant='outlined'
                className='py-1 px-1.5 text-[#E0FFDF] bg-[#83D381] hover:bg-[#E0FFDF] hover:text-[#83D381]'
                
                    startIcon={
                        (
                            <FiberManualRecordIcon color='#E0FFDF' />
                        )
                    }
                >
                    {buttontitle}
                </Button>
            </Box>
            <div className='grow' />

            <Button variant='outlined'
            className='py-[5px] px-4 text-[#3884F7]'
            >
                View
            </Button>

        </Box>
    )
}

export default PersonInfo