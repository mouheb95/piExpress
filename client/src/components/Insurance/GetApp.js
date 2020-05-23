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
          carpo:null,
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
          client : body.data.user,
          author : body.data.author,
          carpo: body.data.carpo
        
          
        })
        
      
    
        console.log(this.state.doc)
        return body;
    
      }
      delete() { 
        axios.delete('/insurance/suponeappoint/'+this.state.carpo+'/'+this.props.match.params.idap)
        .then(async res => {
          if (res.status === 200) {
              console.log('deleted')

            this.props.history.push("/addapp/"+this.state.carpo)
          } else {
              console.log(' none ')
          }
      })
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
                   My Appointment
                </h3>
              </div>
              <div style={{display: 'flex'}} >
                <div>
              <div >
                  <table style={{border: '1px solid black', margin: '10px', fontSize: '120%', borderSpacing: '10px'}}>
                      <tr>
                        <th>Date  :</th>
                        <th>Place  :</th>
                        <th>Code  :</th>
                        <th>User  :</th>
                        <th>verif  :</th>

                      </tr>
                      <tr>
                        <td>{this.state.date}</td>
                        <td>{this.state.place}</td>
                        <td>{this.state.codeaf}</td>
                        {this.state.client=="5e7d117e525cda0f88b6f193" &&(
                        <td>Mohamed</td>)}
                        {this.state.client=="5ea91f14ad21753cacfc6140" &&(
                        <td>Achraf</td>)}
                        {this.state.client=="5ea91ec5ad21753cacfc613f" &&(
                        <td>Rania</td>)}
                        {this.state.client=="5e7d33c6f0d3523f74d8cb4a" &&(
                        <td>Ali</td>)}
                        <td><input type="text"  name="code1"  placeholder="partner" value={this.state.code1} onChange={this.handleChange} /></td>

                      </tr>
                    </table>
                                  </div>
                                  <table>
                                    <tr>
                                      <td><div className="col-xs-4">
                                      {this.state.author==this.state.user_id &&(
                                      <button onClick={() => this.delete()} className="btn btn-primary btn-block btn-flat">Delete</button>
                                      )}
                                       {this.state.author==this.state.user_id &&(
                                      <button onClick={() => this.props.history.push("/editapp/"+this.props.match.params.idap)} className="btn btn-primary btn-block btn-flat">Edit</button>
                                      )}
                                    <button onClick={() => this.verif()} className="btn btn-primary btn-block btn-flat">Verif</button>
         </div></td>
         <td><div>
         {this.state.show1 && (<h4>TRUE</h4>)}
         {this.state.show2 && (<h4>FALSE</h4>)}
         </div></td>
                                                
                                        
                                    </tr>
                                  </table>
                                  </div>
                                  <div>
            <img src="../images/app.png" className="img-responsive" style={{width:'40%', paddingLeft:'100px'}} />
            </div>
             
            </div>
            
</div>
          </div>
        );
      }
    }
    