import React, {Component} from 'react';
import NavLogin from  '../components/NavLogin';
import { NotificationManager} from 'react-notifications';
import {Redirect} from 'react-router-dom';
import axios from 'axios';


export default class Pokemon extends Component{
    state = {};
      
    constructor(prop) {  
        super(prop);                                       
        this.state = {                      
            pokemon:false,
            pokemonAll:false,
            loading:false,
            count:0,
            searchText:"",
            user:   JSON.parse(localStorage.getItem('user') ),
            config : {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            } 
        };     
        
    }
  async  componentDidMount() {    
      this.state.loading=true;
      
      try{      
       
        await axios.get('api/pokemon/pokedex',this.state.config).then(
            res => {  
                if(res.data){
                    let count = 0;  
                    
                    const pokemonsCn = res.data.filter(user => user.isUser == true);                
                    if(pokemonsCn) count = pokemonsCn.length;
                    
                    this.setState({
                        pokemon:res.data,
                        pokemonAll:res.data,
                        loading:false,
                         count:count
                    })
               }else{
                this.createNotification('error','sorry there was error' ) 
               }
            },
            err => {      
                this.createNotification('error','sorry there was error' )           
                console.log(err);
            }
        )
      }catch(err){
        console.log(err); 
      }


    }
    async addPokemon(id){        
        try{                                     
             axios({ method: 'post', url:'api/pokemon/add/'+id, headers: { 'Authorization': localStorage.getItem('token') } }            
             ).then(
                 res => {
                    if(res.data && res.data.error){
                        this.createNotification('warning',res.data.error ) 
                    }else if(res.data ){
                                          
                        this.createNotification('success','Pokemon added!' );                                                               
                        const index = this.state.pokemon.findIndex(a => a.id === id);
                        this.state.pokemon[index].isUser = true;
                        this.state.count = this.state.count + 1
                        this.forceUpdate();                                         
                     this.setState({
                         pokemon:this.state.pokemon
                     })
                    
                    }else{
                        this.createNotification('error','sorry there was error' )                                            
                    }
                 },
                 err => {
                    this.createNotification('error','sorry there was error '+ err )                                        
                    console.log(err);     
                 }
             )
           }catch(err){
             console.log(err); 
           }     
    }

    async deletePokemon(id){              
        try{           
             
             await axios.delete('api/pokemon/delete/'+id,this.state.config).then(
                 res => {                     
                     if(res.data){
                        this.createNotification('success','Pokemon deleted!' );                                                                                       
                        const index = this.state.pokemon.findIndex(a => a.id === id);
                        this.state.pokemon[index].isUser = false;
                        this.state.count = this.state.count - 1;
                        this.forceUpdate();                    
                     
                     this.setState({
                         pokemon:this.state.pokemon
                     })
                    }
                 },
                 err => {
                     
                     console.log(err);
     
                 }
             )
           }catch(err){
             console.log(err); 
           }     
    }   
    handleChange(e ) { 
             
         this.setState({searchText:e.target.value});
         this.filterData(e.target.value);
      };

    filterData (value) {    
            
        const lowercasedValue = value.toLowerCase().trim();                
        if (lowercasedValue != ""){         
          const filteredData = this.state.pokemonAll.filter(item => {
            return Object.keys(item).some(key =>
               item[key].toString().toLowerCase().includes(lowercasedValue)
            );
          });
          this.setState({
            pokemon:filteredData
        })
          
        }else{
            this.setState({
                pokemon:this.state.pokemonAll,                
            })
        }
    } 

    myPokemon (e) {        
    this.state.loading = true;
    const myPokemenData =(e.target.dataset.action =='show-my') ? (this.state.pokemon.filter(user => user.isUser == true)) : this.state.pokemonAll;                                
    this.setState({
        pokemon:myPokemenData,
        mypokemon:e.target.dataset.action ,        
        loading:false
     })                    
    } 
    
    sortPokemons(e) {   
               
        switch(e.target.value) {
            case 'id':
                this.setState({pokemon: this.state.pokemon.sort(this.compareBy('id'))});
              break;            
              case 'name':
                this.setState({pokemon: this.state.pokemon.sort(this.compareBy('name'))});
              break;       
              default:
                this.setState({
                    pokemon:this.state.pokemonAll,                
                })
                break;
          }                
      };

      compareBy(key) {
        return function (a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
      }
     
      createNotification  (type, msg)  {
        
          switch (type) {
            case 'info':
              NotificationManager.info('Info message ',msg,3000);
              break;
            case 'success':
              NotificationManager.success('Success message', msg,3000);
              break;
            case 'warning':
              NotificationManager.warning('Warning message', msg, 3000);
              break;
            case 'error':
              NotificationManager.error('Error message', msg, 3000);
              break;
          
        }
    }

    render() {
        if(!this.state.user){
            return <Redirect push to="/"/> 
        }
       
        let nav = <NavLogin show={this.state.mypokemon} countPokemon={this.state.count} onClickSort={this.myPokemon.bind(this)} searchPokemon={this.handleChange.bind(this)} filterPokemon={this.sortPokemons.bind(this)} />

        if(this.state.loading){
            return (                
                <div className="App">
                    {nav}
                    <h1>Loading.. </h1>
                </div>
            );
        }
        if(this.state.pokemon){           
            var items = [];                    
            this.state.pokemon.map((pokemon, i) => {                                
                let baseArray=[];                                                
                Object.entries(pokemon.base).map(([k,v])=>(                    
                    baseArray.push(<div>{k}&nbsp;{v}</div>)
                ))                   
                
                items.push(                
                <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12" >  
                   <div className={`card ${pokemon.isUser ? "card-user" : "normal"}`} >
                   <h6 className="left"><span className="badge badge-secondary">{pokemon.id}</span></h6>                       
                       <div className="single-pokemon">
                       <h2><span className="badge badge-danger">{pokemon.name}</span></h2>
                       </div>
                       <div>                                                   
                      </div>
                      <hr />  
                      <div>
                        {pokemon.isUser ? (
                                <button  class="btn btn-danger" onClick={() => this.deletePokemon(pokemon.id)}>Delete</button>                                             
                            ) :
                            (
                                <button  class="btn btn-warning"  onClick={() => this.addPokemon(pokemon.id)} >Add</button>                    
                            )}
                        </div>
                       <div>
                       <hr />                          
                            {pokemon.type.map((type) =>                                 
                                <span class="badge badge-secondary"> {type}</span>
                            )}  
                        <hr />                                                        
                            {baseArray.map((type) => 
                               <span class="badge badge-primary"> {type}</span>
                            )}                                                                                      
                      
                        </div>
                    </div>                                         
                </div>
                
                );
            });

           return(
               <div >                        
                {nav}
                    <div className="container">                
                        {items}                   
                    </div>                                   
                </div>                                  
           )
        }
            
        return (                
                <div className="App">                   
                </div>
            );
            
    }
}


