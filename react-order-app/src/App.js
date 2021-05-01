import React from 'react'
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";

function App() {

  return (
    <div>
      <UserProvider>
        <Application />
      </UserProvider>
        
    </div>
  );
}

export default App;
