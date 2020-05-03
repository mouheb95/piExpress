import React, { Component } from 'react'
import axios from 'axios'
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
                "email": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).email:null,
                "firstname": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).firstname:null,
                "lastname": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).lastname:null,
                "password": localStorage.getItem("consultedUser") ? JSON.parse(localStorage.getItem("consultedUser")).password:null,
                "confirmPassword":null, 
                "role": localStorage.getItem("consultedUser") && JSON.parse(localStorage.getItem("consultedUser")).role
                 ? JSON.parse(localStorage.getItem("consultedUser")).role: "client",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange = event => {
        const {name, value} = event.target
        this.setState({ [name]: value });
        console.log("chang",this.state.user )
    };
    handleSubmit = event => {
        event.preventDefault();
//      console.log("hello",this.state.user)
      const {email, password, role, firstname, lastname} = this.state;

      const user = {
        "email": email,
        "firstname": firstname,
        "lastname": lastname,
        "password": password,
        "confirmPassword": password ,
      }
      const user_undefined = JSON.parse(localStorage.getItem("consultedUser"))
      
      if( user_undefined === null ){
        axios.post("http://localhost:5000/admin/users",user).then(({ data }) => {
        }).catch(function (error) {
          console.log("Error****:", error);
        });
      } else {
        const _id = JSON.parse(localStorage.getItem("consultedUser"))._id
        axios.put("http://localhost:5000/admin/users/"+_id, user).then(({ data }) => {
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
                                    <h3 className="box-title">User</h3>
                                </div>
                                {/* /.box-header */}
                                {/* form start */}
                                <form role="form" onSubmit={this.handleSubmit}>
                                    <div className="box-body">
                                        <div className="form-group">
                                            <label htmlFor="Email">Email address</label>
                                            <input  type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="First name">First Name</label>
                                            <input  type="text" className="form-control" name="firstname" value={this.state.firstname} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Last name">Last Name</label>
                                            <input  type="text" className="form-control" name="lastname" value={this.state.lastname} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Password">Password</label>
                                            <input type="text" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="Role">Role</label>
                                            <input type="text" className="form-control" name="role" value={this.state.role} onChange={this.handleChange} />
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
