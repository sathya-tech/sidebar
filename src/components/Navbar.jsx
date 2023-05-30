import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import Chatbot from '../chatbot/Chatbot'


import "./Navbar.css";
import { createContext } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

function Navbar() {
  
  //for setting the theme
  const [theme, setTheme] = useState("dark");

  //for setting the color of navbar contents after the theme changes
  const [color, setColor] = useState('white');

  //for showing the chatbox when message is clicked
  const [showChat, setShowChat] = useState(false);

  //for closing the navbar when clicked close button
  const [sidebar, setSidebar] = useState(false);

  //for selecting whether to open the chatbox or not
  const closeChat = showChat ? 'show' : '';
  const openChat = showChat ? '' : 'show'

  //for changing thee color of navbar contents
  function colorChange() {
    if (color == 'white') {
      setColor('#060b26');  
    }
    else {
      setColor('white');
    }
  }

  //for changing the theme either to dark or to light
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    colorChange();
  };
  

  //to hide or show sidebar
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <IconContext.Provider value={{ color: '#fff' }}>
          
          <div className='navbar'>

          {/* Hamburger icon */}
            <Link to='#' className='menu-bars' >
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>

          {/*Navbar Contents  */}
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} id={theme}>
            <ul className='nav-menu-items'>

              {/* Close buttton */}
              <li className='navbar-toggle' id={theme}>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose style={{color:color}} onClick={showSidebar} />
                </Link>

              {/* Toggle bar */}
                <div className="switch">
                  <label> {theme === "light" ? "Light Mode" : "Dark Mode"}</label>
                  <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
                </div>
              </li>

              {/* Home Panel */}
                <div className={`nav-text ${closeChat}`} style={{color:color}} onClick={showSidebar}>
                  <Link to='/'>
                  <AiIcons.AiFillHome style={{color:color}}/>
                    <span style={{color:color}}>Home</span>
                  </Link>
                </div>
              
              {/* Reports Panel */}
                <div className={`nav-text ${closeChat}`} style={{color:color}} onClick={showSidebar}>
                  <Link to='/reports'>
                  <IoIcons.IoIosPaper style={{color:color}}/>
                    <span style={{color:color}}>Reports</span>
                  </Link>
                </div>

              {/* Team Panel */}
                <div className={`nav-text ${closeChat}`} style={{color:color}} onClick={showSidebar}>
                  <Link to='/team'>
                  <IoIcons.IoMdPeople style={{color:color}} />
                    <span style={{color:color}}>Team</span>
                  </Link>
                </div>

                {/* Message panel */}
                <div className={`nav-text ${closeChat}`} style={{color:color}} onClick={()=>setShowChat(true)}>
                  <Link to='#'>
                  <FaIcons.FaEnvelopeOpenText style={{color:color}} />
                    <span style={{color:color}}>Message</span>
                  </Link>
              </div>

                {/* show message */}
                <ul className={`${openChat} list-style`}>
                <Link to='#'>
                  <h4 style={{ color: color }} className='down' onClick={() => setShowChat(false)}>Close Chat</h4>
                </Link>
                
                {/* Message bot */}
                <li >
                  <Chatbot />
                </li>
                
              </ul>

              

            </ul>
          </nav>
        </IconContext.Provider>

      </ThemeContext.Provider>

      
    </>
  );
}

export default Navbar;
