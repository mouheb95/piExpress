import React, { Component } from 'react'
import axios from 'axios'
export default class Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
                "object": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).object:null,
                "description": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).description:null,
                "type": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).type:null,
                "etat": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).etat:null,
               
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value });
        console.log("chang",this.state.claim )
    };
    handleSubmit = event => {
        event.preventDefault();
//      console.log("hello",this.state.user)
      const {object, description, type, etat} = this.state;

      const claim = {
        "object": object,
        "description": description,
        "type": type,
        "etat": etat,
        
      }
      const user_undefined = JSON.parse(localStorage.getItem("consultedUser"))
      
      if( user_undefined === null ){
        axios.post("http://localhost:5000/claim",claim).then(({ data }) => {
        }).catch(function (error) {
          console.log("Error****:", error);
        });
      } else {
        const _id = JSON.parse(localStorage.getItem("consultedUser"))._id
        axios.put("http://localhost:5000/claim/get"+_id, claim).then(({ data }) => {
        }).catch(function (error) {
          console.log("Error****:", error);
        });
      }
      
      }
       

    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="row ">
                        <div className="col-md-8 ">
                            <div className="box box-primary ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Claim</h3>
                                </div>
                                {/* /.box-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="Email">Object</label>
                                            <div>{this.state.object}</div>
                                           </div>
                                        <div className="form-group">
                                            <label htmlFor="First name"> Description</label>
                                            <p>{this.state.description}</p>
                                             </div>
                                             <div className="form-group">
                                            <label htmlFor="First name"> Etat</label>
                                            <p>{this.state.description}</p>
                                             </div>
                                        
                                    </div>
                                    {/* /.box-body */}
                                    <div className="box-footer">
                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
