import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class EditInsurance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            doc: null,
            idins: null,
            buyingprice: null,
            realprice: null,
            age: null,
            categorie: null,
        proposedtopay: null,
        carpooling: null,
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
          carpooling: body.data.carpooling,         
        })
    
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
        carpooling: this.state.carpooling
    }
        axios.put('/insurance/ins/'+this.props.match.params.id, insurance)
        .then(async res => {
          if (res.status === 200) {
              console.log('updated')
              this.props.history.push("/getins/"+insurance.carpooling)
            } else {
              console.log(' none ')
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
                        <p className="login-box-msg">Edit Insurance</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="buyingprice" className="form-control"  value={this.state.buyingprice} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="realprice" className="form-control"  value={this.state.realprice} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-user form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="age" className="form-control"  value={this.state.age} onChange={this.handleChange} />
                                <span className="glyphicon glyphicon-envelope form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                            <label>
        Categorie :
          <select name="categorie" value={this.state.categorie} onChange={this.handleChange}>
            <option value="sports">Sports</option>
            <option value="Electronic">Electronic</option>
            <option value="Vehicle">Vehicle</option>
            <option value="mediacl">Medical</option>
            <option value="clothes">Clothes</option>
          </select>
        </label>
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                            <div className="form-group has-feedback">
                                <input type="number" step="0.01" name="proposedtopay" className="form-control" value={this.state.proposedtopay} onChange={this.handleChange} />
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
                                <button type="submit" disabled={!this.state.buyingprice || !this.state.realprice || !this.state.age || !this.state.categorie || !this.state.proposedtopay} className="btn btn-primary btn-block btn-flat">Add</button>
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

