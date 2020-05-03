import React from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
export default class GetInsurance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          doc: null,
          idins: null,
          buyingprice: null,
          realprice: null,
          age: null,
          categorie: null,
      proposedtopay: null,
      insuranceprice: "waiting",
      etat :  null,
      show1 : false,
      show2 : true,
      show3 : false
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
      
      delete(id) { 
        axios.delete('/insurance/ins/'+id)
        .then(async res => {
          if (res.status === 200) {
              console.log('deleted')

            this.props.history.push("/addins")
          } else {
              console.log(' none ')
          }
      })
     }
     accept(id) { 
      axios.post('/insurance/insacc/'+id)
      .then(async res => {
        if (res.status === 200) {
            console.log('accepted')
            this.setState({
            
              etat: "Accepted",
              show3: true
              
            })
          //this.props.history.push("/addins")
        } else {
            console.log(' none ')
        }
    })
   }
   reject(id) { 
    axios.post('/insurance/insref/'+id)
    .then(async res => {
      if (res.status === 200) {
          console.log('refused')
          this.setState({
            
            etat: "Refused",
            show3: false
          })

        //this.props.history.push("/addins")
      } else {
          console.log(' none ')
      }
  })
 }
      callApi = async () => {
        const response = await fetch('/insurance/inscar/'+this.props.match.params.id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
          doc: body.data,
          idins: body.data._id,
          buyingprice: body.data.buyingprice,
          realprice : body.data.realprice,
          age : body.data.age,
          categorie: body.data.categorie,
          proposedtopay: body.data.proposedtopay,
          insuranceprice: body.data.insuranceprice,
          etat: body.data.etat
          
        })
        if(body.data.insuranceprice==null) { 
          this.state.insuranceprice = "waiting";
          this.state.show2= false;
          this.state.show1= true;
      }
      
 
    if(body.data.etat==null) { 
      this.state.etat = "waiting"
  }
  if(body.data.etat== "accepted") { 
    this.state.show3= true;
}
    
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
                        <th>Buying Price  :</th>
                        <th>Real Price  :</th>
                        <th>Age  :</th>
                        <th>Categorie  :  </th>
                        <th>Proposed Price  :  </th>
                        <th>Insurance  price  :  </th>
                        <th>State  :</th>
                      </tr>
                      <tr>
                        <td>{this.state.buyingprice}</td>
                        <td>{this.state.realprice}</td>
                        <td>{this.state.age}</td>
                        <td>{this.state.categorie}</td>
                        <td>{this.state.proposedtopay}</td>
                        <td>{this.state.insuranceprice}</td>
                        <td>{this.state.etat}</td>
                      </tr>
                    </table>
                                  </div>
                                  <table>
                                    <tr>
                                    <td> <div className="col-xs-4">
                                    {this.state.show1==true &&(
            <button onClick={() => this.props.history.push("/editins/"+this.state.idins)} className="btn btn-primary btn-block btn-flat">Edit</button>
            )}</div></td>                                       <td><div className="col-xs-4">
         
                                    <button onClick={() => this.delete(this.state.idins)} className="btn btn-primary btn-block btn-flat">Delete</button>
         </div></td>
                                <td><div className="col-xs-4">
                                {this.state.show2==true &&(
          <button onClick={() => this.accept(this.state.idins)} className="btn btn-primary btn-block btn-flat">Accept</button>
          )}
             {this.state.show2==true &&(<button onClick={() => this.reject(this.state.idins)} className="btn btn-primary btn-block btn-flat">Reject</button>
             )}
      </div></td>                               
      <td><div className="col-xs-4">
      {this.state.show3==true &&(    <button onClick={this.paiment} className="btn btn-primary btn-block btn-flat">Pay</button>
                              )}  </div></td>                                      <td> <img src="../images/ins.png" className="img-responsive" style={{width:'20%', paddingLeft:'50px'}} /> </td>
                                    </tr>
                                  </table>
             
            </div>
            

          </div>
        );
      }
    }
    class Box1 extends React.Component{
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
}