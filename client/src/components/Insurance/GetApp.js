import React from 'react';
//import Moment from 'react-moment';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class GetInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          doc: null,
          idapp: null,
          user: null,
          user_id: null,
          client: null,
          author:null,
          date: null,
          place: null,
          codeaf: null,
          code1:null,
          resu: null,
          show1: false,
          show2: false
     
        };
            }
            
      componentDidMount() {
        this.state.user = localStorage.getItem("user");
    this.state.user_id = localStorage.getItem("user").split("\"")[3];
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));


    const script = document.createElement("script");
    script.src = `js/content.js`;
    script.async = true;
    document.body.appendChild(script);
      }
      handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
     
      verif() { 
        const codever = {
          code: this.state.code1
      };
    console.log(codever)
        axios.post('/insurance/oneappoint/'+this.props.match.params.idap+'/'+this.state.user_id, codever)
        .then(async res => {
          if (res.data.message == "true") {
              console.log('ok')
              alert("****T R U E****");
              //  this.state.show1= true;
             //   this.state.show2= false;

                          }
           else {
            console.log('non')
            alert("****F A L S E****");
          //  this.state.show1= false;
           // this.state.show2= true;         
           }
      })
     }   
      callApi = async () => {
        const response = await fetch('/insurance/oneappoint/'+this.props.match.params.idap+'/'+this.state.user_id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
          doc: body.data,
          date: body.data.date,
          place: body.data.place,
          codeaf : body.data.code,
        
          
        })
        
      
    
        console.log(this.state.doc)
        return body;
    
      }
      
    
      render() {

        return (
          
          <div >
            <div >
            <div>
            <p>.</p>
            <p>.</p>
            <p>.</p>
          </div>
              <div >
                <h3 >
                  My Insurance
                </h3>
              </div>
              <div >
                  <table style={{border: '1px solid black', margin: '10px', fontSize: '120%', borderSpacing: '10px'}}>
                      <tr>
                        <th>Date  :</th>
                        <th>Place  :</th>
                        <th>Code  :</th>
                        <th>verif  :</th>

                      </tr>
                      <tr>
                        <td>{this.state.date}</td>
                        <td>{this.state.place}</td>
                        <td>{this.state.codeaf}</td>
                        <td><input type="text"  name="code1"  placeholder="partner" value={this.state.code1} onChange={this.handleChange} /></td>

                      </tr>
                    </table>
                                  </div>
                                  <table>
                                    <tr>
                                      <td><div className="col-xs-4">
         
                                    <button onClick={() => this.verif()} className="btn btn-primary btn-block btn-flat">Verif</button>
         </div></td>
         <td><div>
         {this.state.show1 && (<h4>TRUE</h4>)}
         {this.state.show2 && (<h4>FALSE</h4>)}
         </div></td>
                                                
                                        
                                    </tr>
                                  </table>
             
            </div>
            

          </div>
        );
      }
    }
    /*class Box1 extends React.Component{
      render(){
          return(
            <td> <div className="col-xs-4">
            <button onClick={() => this.edit(this.state.idins)} className="btn btn-primary btn-block btn-flat">Edit</button>
        </div></td>            )
      }
  }
  class Box2 extends React.Component{
    
    render(){
        return(
          <td><div className="col-xs-4">
          <button onClick={() => this.accept(this.state.idins)} className="btn btn-primary btn-block btn-flat">Accept</button>
          <button onClick={() => this.reject(this.state.idins)} className="btn btn-primary btn-block btn-flat">Reject</button>

      </div></td>
       
        )
    }
}
class Box3 extends React.Component{
  render(){
      return(
<td><div className="col-xs-4">
                                    <button onClick={this.paiment} className="btn btn-primary btn-block btn-flat">Pay</button>
                                </div></td>      )
  }
}*/