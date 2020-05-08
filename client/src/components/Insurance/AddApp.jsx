import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class AddApp extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        isLogin: localStorage.getItem("token") === null,
            redirect: false,
    user: '',
    date: '',
    place: '',
    carpooling:''

    };
    console.log(this.state.isLogin)
        if (this.state.isLogin !== true) { 
            this.state.redirect = true
        }
    }
    componentDidMount() {
        console.log(localStorage.getItem("user"))

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        const appointment = {
            user: this.state.user,
    date: this.state.date,
    place: this.state.place,
        };

        console.log(appointment)

        axios.post(`insurance/appoint/5eb0f815e0e6a154a000b94e`, appointment)
            .then(async res => {
                if (res.status === 201) {
                    console.log(res)
                   this.props.history.push("/getapp/"+res.data.data._id)
                } else {
                    console.log(' none ')
                }
            })
    }

    render() {
        const { redirect } = this.state;

        if (!redirect) {
            return <Redirect to="/" />;
        } else {
        return (
            <body className="hold-transition register-page">
                <div className="register-box">
                    <div className="register-logo">
                        <a href="fake_link"><b>Car</b>Pooling</a>
                    </div>
                    <div className="register-box-body">
                        <p className="login-box-msg">Add new Insurance</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input type="datetime-local"  name="date" className="form-control"  value={this.state.date} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="text"  name="place" className="form-control" placeholder="Place" value={this.state.place} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                    
                            <div className="form-group has-feedback">
                            <label>
        User :
          <select name="user" value={this.state.user} onChange={this.handleChange}>
            <option value="5e7b8867148bfa40989888dd">Rania</option>
            <option value="5e7b9076eb9bb037f86d4460">Achraf</option>
          </select>
        </label>
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                            
                            <div className="row">
                                
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Add</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                       
                    </div>
                    {/* /.form-box */}
                </div>
            </body>
        )
    }
}
}
