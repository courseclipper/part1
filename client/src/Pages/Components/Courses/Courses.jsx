import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import Navbar from '../../Navbar/Navbar'
import './Courses.css'

function Courses() {
  return (
    <>
      <Navbar />
      <Box sx={{ width: '95%', maxWidth: '1400px', margin: 'auto' }}>
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant='h1' sx={{ fontSize: '3rem' }}>Best in Courses</Typography>
          <Typography sx={{ fontSize: '1.3rem' }}>Checkout the best course</Typography>
        </Box>
        <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', gap: '32px' }}>
          <img src='/courses/course1.jpg' alt='course-1' style={{ width: '31%' }} />
          <img src='/courses/course2.jpg' alt='course-2' style={{ width: '31%' }} />
          <img src='/courses/course3.jpg' alt='course-3' style={{ width: '31%' }} />
          <img src='/courses/course4.avif' alt='course-4' style={{ width: '31%' }} />
          <img src='/courses/course5.jpeg' alt='course-5' style={{ width: '31%' }} />
        </Stack>
        <div className="note-section">
          <h2>Note</h2>
          <p>Hello there,<br /><br />
            Feeling stuck on which course or vocation to pick? It's not unexpected! Grab a seat and jump into some exploration. Look into audits, investigate choices, and pay attention to your instinct. The correct way is out there hanging tight for you. Continue investigating and putting stock in yourself. You have this!</p>
        </div>
      </Box>
    </>
  )
}

export default Courses