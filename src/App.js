import React from 'react'
import { AppContext, socket } from "./appContext";
import Main from './Main';
// import {BrowserRouter , Routes , Route} from 'react-router-dom'
// import GetName from './GetName';

const App = () => {
  return (
    <AppContext.Provider value={{ socket }}>
      <>
        {/* <BrowserRouter>
          <Routes>
              <Route path="/chat" element={ <Main/>} />
              <Route path="/" element={ <GetName/>} />
        </Routes>
      </BrowserRouter> */}
        <Main />
      </>
    </AppContext.Provider>
  )
}

export default App