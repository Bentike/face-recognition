import React from 'react';
import Tilt from 'react-tilt';
import brain from './logo.png';
import './logo.css';

function Logo() {
   return(        
            <Tilt className="Tilt" options={{ max : 50}} >
               <img src={brain} alt='logo'/>
            </Tilt>
   )
}

export default Logo;