import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';

export default class Nav extends Component {
  state ={}
              
  logout(){
    localStorage.clear();
    this.setState({redirect: true})
  }
  
componentDidMount() {    
   if(localStorage.getItem("token") && localStorage.getItem("user") ){      
     this.setState({       
       user:JSON.parse(localStorage.getItem("user"))
     });
   }        
   
 }
    render(){         
        if(this.state.redirect ){
         return <Redirect push to="/"/> 
        }

        if(this.state.user){
         return(
            
            <nav>
               <h3>Hi {this.state.user.name} welcome back! </h3>
               
                 <>                                   
                   <Button color="inherit" onClick={() => this.logout()}>
                     Logout
                   </Button>
                 </>
               
               </nav>
        )
        }else{
            return(
                <h1>Please login...</h1>
            )
        }                            
    
    
}
}


