import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import './App.css'
import { useState,useEffect } from "react";
import AdminNavBar from "./admin/AdminNavBar";
import ArtistNavBar from "./artist/ArtistNavBar";
import CustomerNavBar from "./customer/CustomerNavBar";

function App() 
{
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isArtistLoggedIn, setIsArtistLoggedIn] = useState(false);
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const artistLoggedIn = localStorage.getItem('isArtistLoggedIn') === 'true';
    const customerLoggedIn = localStorage.getItem('isCustomerLoggedIn') === 'true';

    setIsAdminLoggedIn(adminLoggedIn);
    setIsArtistLoggedIn(artistLoggedIn);
    setIsCustomerLoggedIn(customerLoggedIn);
  }, [])

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
  };

  const onArtistLogin = () => {
    localStorage.setItem('isArtistLoggedIn', 'true');
    setIsArtistLoggedIn(true);
  };

  const onCustomerLogin = () => {
    localStorage.setItem('isCustomerLoggedIn', 'true');
    setIsCustomerLoggedIn(true);
  };
  

  return (
    <div className="App">
      
      <Router>
        {isAdminLoggedIn ? (
          <AdminNavBar/>
        ) : isArtistLoggedIn ? (
          <ArtistNavBar/>
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar/>
        ) : (
          <NavBar onAdminLogin={onAdminLogin}
                  onArtistLogin={onArtistLogin} 
                  onCustomerLogin={onCustomerLogin} />
        ) }
      </Router>

    </div>
  );
}

export default App;
