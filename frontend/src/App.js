import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages and components
import Home from './pages/Home';
import Stats from './pages/Stats';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar'; 

import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { user } = useAuthContext(); 

  return (
    <BrowserRouter>
      <div className="App flex flex-col h-screen">
        {/* Navbar  */}
        <Navbar />

        <div className="flex flex-1">
          {/* Sidebar  */}
          {user && <Sidebar />}

          {/* Main page content */}
          <div className="flex-1 p-4 overflow-auto">
            <Routes>
              {/* Home route */}
              <Route 
                path="/" 
                element={user ? <Home /> : <Navigate to="/login" />} 
              />

              {/* Stats route */}
              <Route 
                path="/stats" 
                element={user ? <Stats /> : <Navigate to="/login" />} 
              />

              {/* Authentication routes */}
              <Route 
                path="/login" 
                element={!user ? <Login /> : <Navigate to="/" />} 
              />
              <Route 
                path="/signup" 
                element={!user ? <Signup /> : <Navigate to="/" />} 
              />

              {/* Catch-all route: redirect unknown paths */}
              <Route 
                path="*" 
                element={<Navigate to={user ? "/" : "/login"} />} 
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
