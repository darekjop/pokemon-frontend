import React,{Component} from 'react';
import Nav from '../components/Nav';
import {NotificationContainer} from 'react-notifications';
export default class NavLogin extends Component {
  
  
    render(){
        
        return( 
        <div>                
        <Nav />  
        <NotificationContainer/>

        <div className="container">
        <div  >              
        <div className="col-md-8 col-lg-8 col-sm-8 col-xs-12" >  
        <input
            style={{ marginLeft: 5 }}
            type="text"
            placeholder="Type to search..."
            value={this.props.searchText}
            onChange={this.props.searchPokemon.bind(this)}
            className="form-control"
        />
        </div>

        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-12" >  
        <select onChange={this.props.filterPokemon.bind(this)} className="form-control">
        <option value="name">-</option>
            <option value="id">id </option>        
            <option value="name">name</option>        
            </select>
            </div>
        </div>
        <div className="col-md-2 col-lg-2 col-sm-2 col-xs-12" >  
        
        {this.props.show=='show-my' ? 
            <button  class="btn btn-danger mypokemon" data-action="show-all" onClick={this.props.onClickSort.bind(this)}>Show All </button>                                                               
        : (
            <button  class="btn btn-danger mypokemon" data-action="show-my" onClick={this.props.onClickSort.bind(this)}>My pokemon</button>                                                               
        )
        }
        </div>
        </div>
        </div>)                         
    
    
}
}


