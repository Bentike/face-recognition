import React from 'react';
import './faceRecognition.css';

function FaceRecognition({imgSrc, box}) {
    const style = {
        width: '300px',
        height: 'auto',
        marginTop: '5px'
    }

    const style2 = {
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol
    }

   return(
       <div>
          <div className='wrapper'>
            <img id="inputImage" src={imgSrc} alt='place' style={style}/>
            <div id='box' className="bounding-box" style={style2}></div>         
          </div>        
       </div>
   )
}

export default FaceRecognition;