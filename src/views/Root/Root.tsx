import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Editor from '../Editor'

export default function Root() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Editor />} />

          <Route path="*" element={<Container sx={{ p: 5 }}>404</Container>} />
        </Routes>
      </BrowserRouter>
    )
  }