import React, { Component } from 'react'
import axios from 'axios'
export default class Claim extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
              object: null,
              description: null,
              etat: null,
              type: null,
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        this.setState({ [event.target.event]: event.target.value });
    };
    handleSubmit = event => {
        event.preventDefault();
      console.log(this.state.user.role)

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
                                            <label htmlFor="Email">Object</label>
                                            <input disabled type="text" className="form-control" name="object" value={this.state.object} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">Description</label>
                                            <input disabled type="text" className="form-control" name="firstname" value={this.state.description} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">type</label>
                                            <input disabled type="text" className="form-control" name="type" value={this.state.type} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Role">etat</label>
                                            <input type="text" className="form-control" name="etat" value={this.state.etat} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Role">etat</label>
                                            <input type="text" className="form-control" name="role" value={this.state.etat} onChange={this.handleChange} />
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
