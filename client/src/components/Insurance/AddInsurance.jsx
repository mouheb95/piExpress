import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class AddInsurance extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
        isLogin: localStorage.getItem("token") === null,
            redirect: false,
    buyingprice: '',
    realprice: '',
    age: '',
    categorie: '', 
    proposedtopay: '',
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

        const insurance = {
            buyingprice: this.state.buyingprice,
    realprice: this.state.realprice,
    age: this.state.age,
    categorie: this.state.categorie, 
    proposedtopay: this.state.proposedtopay,
    carpooling: "5e934594d526bd3e5c3716ae" 
        };

        console.log(insurance)

        axios.post(`insurance/ins`, insurance)
            .then(async res => {
                if (res.status === 201) {
                    console.log(insurance.carpooling)

                   this.props.history.push("/getins/"+insurance.carpooling)
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
                                <input type="number" step="0.01" name="buyingprice" className="form-control" placeholder="Bying Price" value={this.state.buyingprice} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="realprice" className="form-control" placeholder="Real Price" value={this.state.realprice} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="age" className="form-control" placeholder="Age" value={this.state.age} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-envelope form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="text" name="categorie" className="form-control" placeholder="Categorie" value={this.state.categorie} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="proposedtopay" className="form-control" placeholder="Proposed to pay" value={this.state.proposedtopay} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-log-in form-control-feedback" />
                            </div>
                            <div className="row">
                                <div className="col-xs-8">
                                    <div className="checkbox icheck" style={{ paddingLeft: "25px" }}>
                                        <label>
                                            <input type="checkbox" /> I agree to the <a href="#">Insurance terms</a>
                                        </label>
                                    </div>
                                </div>
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
