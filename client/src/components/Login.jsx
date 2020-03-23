import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLogin: localStorage.getItem("token") === null,
            redirect: false,
            email: '',
            password: '',
        };
        console.log(this.state.isLogin)
        if (this.state.isLogin !== true) { 
            this.state.redirect = true
        }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`users/login`, user)
            .then(async res => {
                if (res.status === 200) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                    if (res.data.user.role === "admin") {
                        localStorage.setItem("role", JSON.stringify(res.data.user.role));
                        localStorage.setItem("token", res.data.accessToken);
                        this.props.history.push("dashboard");

                    } else {
                        localStorage.setItem("token", res.data.accessToken);
                        this.props.history.push("/");
                    }
                } else {
                    console.log(' wrong password ')
                }
            })
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <body className="hold-transition login-page">
                    <div className="login-box">
                        <div className="login-logo">
                            <a href="fake_link"><b>Car</b>Pooling</a>
                        </div>
                        {/* /.login-logo */}
                        <div className="login-box-body">
                            <p className="login-box-msg">Sign in to start your session</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group has-feedback">
                                    <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.name} onChange={this.handleChange} />
                                    <span className="glyphicon glyphicon-envelope form-control-feedback" />
                                </div>
                                <div className="form-group has-feedback">
                                    <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.name} onChange={this.handleChange} />
                                    <span className="glyphicon glyphicon-lock form-control-feedback" />
                                </div>
                                <div className="row">
                                    <div className="col-xs-8" >
                                        <div className="checkbox icheck" style={{ paddingLeft: "25px" }}>
                                            <label>
                                                <input type="checkbox" /> Remember Me
          </label>
                                        </div>
                                    </div>
                                    {/* /.col */}
                                    <div className="col-xs-4">
                                        <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                                    </div>
                                    {/* /.col */}
                                </div>
                            </form>
                            <div className="social-auth-links text-center">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-block btn-social btn-facebook btn-flat"><i className="fa fa-facebook" /> Sign in using
      Facebook</a>
                                <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus" /> Sign in using
      Google+</a>
                            </div>
                            {/* /.social-auth-links */}
                            <a href="#">I forgot my password</a><br />
                            <Link to="/register" className="btn btn-link">Register a new membership</Link>
                        </div>
                        {/* /.login-box-body */}
                    </div>
                </body>
            )
        }
    }
}

