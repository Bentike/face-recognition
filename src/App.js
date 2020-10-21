import React from 'react';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/Sign';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import Register from './components/register/Register';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const particlesParam = {
  particles: { 
    number: { 
      value: 80, 
      density: { 
        enable: true, 
        value_area: 1000, 
      } 
    }, 
  }, 
}
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      input: '',
      src: '',
      box: {},
      route: 'SignIn',
      rank: '0',
      userName: '',
      user: {
        id: '',
        name: '',
        email: '',
         entries: 0,
         joined: ''
      }
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiImage = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiImage.left_col * width,
      topRow: clarifaiImage.top_row * height,
      rightCol: width - (clarifaiImage.right_col * width),
      bottomRow: height - (clarifaiImage.bottom_row * height),
    }
  }
  
  displayFaceBox = (box) => {
    this.setState({box : box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  fetchUserId = () => {
    fetch("https://mysterious-harbor-78970.herokuapp.com/image", {
      method: 'put',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        id : this.state.user.id
      })
    })
     .then(response => response.json())
     .then(data => {
        this.setState({rank: data})
    })
     .catch(err => {console.log('an error occured', err)})
  }
  
  fetchImageUrl = () => {
    fetch("https://mysterious-harbor-78970.herokuapp.com/imageurl", {
           method: 'post',
           headers: {"Content-Type":"application/json"},
           body: JSON.stringify({
             input : this.state.input
           })
         })
         .then(response => response.json())
         .then(response => {
            if(response.outputs){
              const box = document.getElementById("box");
              this.displayFaceBox(this.calculateFaceLocation(response));
              box.style.display = "flex";
              this.fetchUserId();
            }
         })
         .catch(err => console.log('An error occured', err))
  }

  onButtonSubmit = () => {
    this.setState({src: this.state.input})
     this.fetchImageUrl();  
  }

  onRouteChange = (route) => {
    this.setState({route});
    this.setState({src: ''});
  }

  loadUser = (data) => {
    const {id, name, email, entries, joined} = data;
    this.setState({user:{
         id,
        name,
        email,
        entries,
        joined      
    }});
    this.setState({userName: name});
    this.setState({rank: entries});
  }

  render(){
    return (
      this.state.route === 'SignIn' ? 
       <div>
          <Navigation />
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          <Particles
          className='param' 
          params={particlesParam} 
          /> 
       </div> :
        this.state.route === "register" ?
          <div>
             <Navigation value="Back" onRouteChange={this.onRouteChange}/>
             <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             <Particles
                className='param' 
                params={particlesParam} 
              /> 
          </div> :
        <div className="App">
          <Navigation value="Sign-Out" onRouteChange={this.onRouteChange}/>
          <Logo/>
          <Rank userName={this.state.userName} rank={this.state.rank}/>
          <ImageLinkForm 
            inputChange={this.onInputChange}
            onSubmit={this.onButtonSubmit}
          />
         <FaceRecognition box={this.state.box} imgSrc={this.state.src}/>
          <Particles
          className='param' 
          params={particlesParam} 
          /> 
        </div>
    );
  }
}

export default App;

//https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500
