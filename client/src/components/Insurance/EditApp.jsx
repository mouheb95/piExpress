import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class AddApp extends React.Component {
    constructor(props) {
        super(props)
    this.state = {
       doc:null,
    user: null,
    user_id:null,
    date: null,
    place: null,
    client:null,
    author : null,
    carpo: null
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
        const response = await fetch('/insurance/oneappoint/'+this.props.match.params.idap+'/'+this.state.user_id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
          doc: body.data,
          date: body.data.date,
          place: body.data.place,
          client : body.data.user,
          author : body.data.author,
          carpo: body.data.carpo
        
          
        })
        
      
    
        console.log(this.state.doc)
        return body;
    
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

        axios.put('/insurance/suponeappoint/'+this.state.carpo+'/'+this.props.match.params.idap, appointment)
            .then(async res => {
                if (res.status === 200) {
                    console.log(res)
                   this.props.history.push("/getapp/"+this.props.match.params.idap)
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
          <select disabled name="user" value={this.state.client} onChange={this.handleChange}>
            <option value="5ea91ec5ad21753cacfc613f">Rania</option>
            <option value="5ea91f14ad21753cacfc6140">Achraf</option>
          </select>
        </label>
                                <span className="glyphicon glyphicon-lock form-control-feedback" />
                            </div>
                            
                            <div className="row">
                                
                                {/* /.col */}
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat">Edit</button>
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
