import React from 'react';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    signinStatus = () => {
      let message = document.getElementById("message2");
      message.textContent = "Incorrect email or password";
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value});
    }
    
    onSubmit = () => {
        if(this.state.signInEmail.length && this.state.signInPassword.length !== 0){
            fetch('https://mysterious-harbor-78970.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.id){
                    this.props.loadUser(data);
                    this.props.onRouteChange('home');
                }else{
                    this.signinStatus();
                }
            })
        }else{
            this.signinStatus();
        }
    }

    render(){
        const {onRouteChange} = this.props;
        return(
            <article className="br3 ba b--black-10 mv4 w100 w-50-m w-25-l mw6 shadow5 center">
                <main className="pa4 black-80">
                 <div className="measure center">
                     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                         <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                         <div className="mt3">
                             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="email"
                               name="email-address" 
                               id="email-address"
                               onChange={this.onEmailChange}    
                               />
                         </div>
                         <div className="mv3">
                             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                             <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                              type="password"
                              name="password"
                              id="password"
                              onChange={this.onPasswordChange}    
                              />
                         </div>
                     </fieldset>
                     <div className="">
                          <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                           type="submit"
                           value="Sign in" 
                           onClick={this.onSubmit}/>
                     </div>
                     <div className="lh-copy mt3">
                         <p className="f6 link dim black db ml5 pointer" onClick={() => onRouteChange('register')}>Register</p>
                     </div>
                     <p className="f6 fw6 ph0 mh0" id="message2"></p>
                   </div>
               </main>
             </article>  
        )
    }
}

export default SignIn;