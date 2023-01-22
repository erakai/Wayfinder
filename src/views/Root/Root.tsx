import { BrowserRouter, Route, Routes } from 'react-router-dom'
import * as React from 'react';

import Editor from '../Editor'
import Finder from "../Finder"

import {AlertList} from "../../components/Structure/AlertList"; 

let updateAuth = (newAuth : boolean) => {}

export default function Root() {
    const [auth, setAuth] = React.useState(false);

    updateAuth = (newAuth : boolean) => {
      setAuth(newAuth);
    }


    return (
      <div>
        <AlertList />
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Finder />} />
            <Route index path="/editor" element={<Editor editable={true} />} />
            <Route path="*" element={<h1>Error: 404</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

export function refreshAuth(newAuth: boolean) {
  updateAuth(newAuth);
}