import React from 'react';

function Rank({userName, rank}) {
    return (
        <div>
           <div className="br3">
               <h4 style={{color: "#fff"}}>
                    <strong style={{textTransform: 'uppercase'}}>{userName}! </strong>
                        your current entries count is...
                </h4>
           </div>
           <div>
               <h1 style={{color:"#fff", marginTop:'-15px'}}>{rank}</h1>
           </div>
        </div>
    );
  }
  
export default Rank;
  