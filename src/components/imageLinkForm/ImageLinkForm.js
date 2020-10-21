import React from 'react';
import './imageLinkForm.css';

function ImageLinkForm(props) {
   return(        
        <div>
            <p className='f3'>
               This Magic Brain will detect faces in your pictures. Give it a try.
            </p>
            <div>
                <div className='cntr-div'>
                  <div className='center pa2 br3 shadow-5 cont' style={{width:'700px'}}>
                    <input type='text'
                     className='f4 pa1 w-70 center'
                     placeholder='image link here...'
                     onChange={props.inputChange}
                     />
                    <button 
                    className='w-30 grow f4 link ph3 pv1 dib white bg-light-purple' 
                    onClick={props.onSubmit}>Detect</button>
                  </div>
                </div>
            </div>
        </div>
   )
}

export default ImageLinkForm;