import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        FirstName: '',
        LastName: '',
        confirmPassword: '',
    }

    componentDidMount() {
        console.log(localStorage.getItem("user"))

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            confirmPassword: this.state.confirmPassword
        };

        console.log(user)

        axios.post(`users/register`, user)
            .then(async res => {
                if (res.status === 201) {
                    window.location.href = '/login'
                } else {
                    console.log(' wrong password ')
                }
            })
    }

    render() {
        return (
            <body className="hold-transition register-page">
                <div className="register-box">
                    <div className="register-logo">
                        <a href="fake_link"><b>Car</b>Pooling</a>
                    </div>
                    <div className="register-box-body">
                        <p className="login-box-msg">Register a new membership</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input type="text" name="FirstName" className="form-control" placeholder="First Name" value={this.state.name} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="text" name="LastName" className="form-control" placeholder="Last Name" value={this.state.name} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.name} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-envelope form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.name} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="password" name="confirmPassword" className="form-control" placeholder="confirmPassword" value={this.state.name} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-log-in form-control-feedback" />
                            </div>
                            <div className="row">
                                <div className="col-xs-8">
                                    <div className="checkbox icheck" style={{ paddingLeft: "25px" }}>
                                        <label>
                                            <input type="checkbox" /> I agree to the <a href="#">terms</a>
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Register</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <div className="social-auth-links text-center">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign up using
        Facebook</a>
                            <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign up using
        Google+</a>
                        </div>
                        <Link to="/login" className="btn btn-link">I already have a membership</Link>
                    </div>
                    {/* /.form-box */}
                </div>
            </body>
        )
    }
}

