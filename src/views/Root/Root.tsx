import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Editor from '../Editor'
import Finder from "../Finder"

export default function Root() {
    return (
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Finder />} />
          <Route index path="/editor" element={<Editor editable={true}/>} />
          <Route path="*" element={<h1>Error: 404</h1>} />
        </Routes>
      </BrowserRouter>
    )
  }