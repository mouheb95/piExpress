import React, { Component } from 'react'
import axios from 'axios'
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                "_id": "5e75fa7644832232952cba36",
                "email": "student1@esprit.tn",
                "firstname": "user",
                "lastname": "esprit",
                "password": "pmWkWSBCL51Bfkhn79xPuKBKHz//H6B+mY6G9/eieuM=",
                "role": "admin",
                "createdAt": "2020-03-18T21:26:34.404Z",
                "updatedAt": "2020-03-18T21:26:34.404Z",
                "claim": [],
                "vehicle": [],
            }
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
                                            <label htmlFor="Email">Email address</label>
                                            <input disabled type="email" className="form-control" name="email" value={this.state.user.email} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">First Name</label>
                                            <input disabled type="text" className="form-control" name="firstname" value={this.state.user.firstname} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">Last Name</label>
                                            <input disabled type="text" className="form-control" name="lastname" value={this.state.user.lastname} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Role">Role</label>
                                            <input type="text" className="form-control" name="role" value={this.state.user.role} onChange={this.handleChange} />
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
