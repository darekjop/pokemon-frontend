import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
const axios = require('axios');

export default class Login extends Component{
state = {};
constructor() {  
    super();                               
    this.state = {                      
        isLogin:false,        
    };     
}
handleSubmit = e => {
      e.preventDefault(); 
      this.setState({error:''});
      const data={
          email:this.email,
          password:this.password
      }
      
      axios.post('api/user/login',data)
      .then(res => {
          
          if(res.data && res.data.error){
          
            this.setState({
                error:res.data.error
            });

          }else{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            this.setState({
                isLogin:true
            })
            
          }
      })
      .catch(err=>{
        
        console.log(err);
      })
}

render(){
    
    if (this.state.isLogin){
        return <Redirect to="/pokemon" />
    }
  return (
    <div className="centered">
               
    <div className="auth-wrapper">
    <div className="auth-inner"> 
    <div className="App">
        {this.state.error &&
        <div class="alert alert-danger" role="alert">
            {this.state.error}    
        </div>
        }

      <h1>Login page</h1>
      <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={e=>this.email= e.target.value} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={e=>this.password= e.target.value} />
                </div>
               

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
               
            </form>
    </div>
    </div>
    </div>
    </div> 
  );
  }
}

