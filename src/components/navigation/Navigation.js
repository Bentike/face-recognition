import React from 'react';

function Navigation({value, onRouteChange}) {
   return(
       <nav style={{display:"flex", justifyContent:"flex-end"}}>
           <p className="f4 dim link black underline pa3 pointer" onClick={() => onRouteChange('SignIn')}>{value}</p>
       </nav>
   )
}

export default Navigation;