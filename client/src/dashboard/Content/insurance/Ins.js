import React, { Component } from 'react'
import axios from 'axios'
export default class Ins extends Component {
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
      insuranceprice: null,
    
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
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
              callApi = async () => {
                const response = await fetch('/insurance/ins/'+this.props.match.params.id);
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
                  etat: body.data.etat
                  
                })
        
            
                console.log(this.state.doc)
                return body;
            
              }
              
    handleChange = event => {
        this.setState({ [event.target.event]: event.target.value });
    };
    handleSubmit = event => {
        //event.preventDefault();
     // console.log(this.state.user.role)

        }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content">
                    <div className="row ">
                        <div className="col-md-8 ">
                            <div className="box box-primary ">
                                <div className="box-header with-border">
                                    <h3 className="box-title">Quick Example</h3>
                                </div>
                                {/* /.box-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="Email">Email address</label>
                                            <input disabled type="email" className="form-control" name="email" value={this.state.buyingprice} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">First Name</label>
                                            <input disabled type="number" className="form-control" name="firstname" value={this.state.realprice} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">Last Name</label>
                                            <input disabled type="number" className="form-control" name="lastname" value={this.state.age} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">Last Name</label>
                                            <input disabled type="text" className="form-control" name="lastname" value={this.state.categorie} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">Last Name</label>
                                            <input disabled type="number" className="form-control" name="lastname" value={this.state.proposedtopay} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Role">Price</label>
                                            <input type="number" className="form-control" name="role" value={this.state.insuranceprice} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                    {/* /.box-body */}
                                    <div className="box-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
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
