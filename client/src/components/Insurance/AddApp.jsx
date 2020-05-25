import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


export default class AddApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLogin: localStorage.getItem("token") === null,
            redirect: false,
    user: '',
    date: '',
    place: '',
    carpooling:'',

            appointment: [],
            clients: []


        }
    }



    componentDidMount() {

        axios.get('/insurance/appoint/' + this.props.match.params.id)
            .then(response => {
                this.setState({ appointment: response.data.data, clients: response.data.data1
                                  });
                //console.log(this.state.appointment[11].user)
                

            })
            .catch((error) => {
                console.log(error);
            })




        this.state.user = localStorage.getItem("user");
        this.state.user_id = localStorage.getItem("user").split("\"")[3];
        this.state.user_email = localStorage.getItem("user").split("\"")[7];
        console.log(this.state.user)
        console.log(this.state.user_email)

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

        axios.post(`/insurance/appoint/`+this.props.match.params.id, appointment)
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

        if (redirect) {
            return <Redirect to="/" />;
        } else {
        const objs = this.state.appointment
        const objs1 = this.state.clients

        const Data = ({ objs }) => (
            <>

<body className="hold-transition register-page">
                <div className="register-box">
                    <div className="register-logo">
                        <a href="fake_link"><b>APP</b>ointment</a>
                    </div>
                    <div className="register-box-body">
                        <p className="login-box-msg">Add new appointment</p>
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
          {objs1.map((client, index) => (
               <option value={client._id}>{client.FirstName}</option>
          ))}
        
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
                    <section id="blog" className="container">
                        <div className="blog">
                            <div className="row justify-content-md-center">

                               
                                <div className="col">

                                    <h3>Appointments</h3>
                                    {objs.map((appoint, index) => (
                                        <div key={index}>

{appoint.user=="5e7d117e525cda0f88b6f193" &&(
        
                                            <h4 key={appoint.user} > 
                                            
                                           Name: Mohamed</h4>
  )}
  {appoint.user=="5ea91f14ad21753cacfc6140" &&(
        
        <h4 key={appoint.user} > 
        
      Name: Achraf</h4>
)}
{appoint.user=="5ea91ec5ad21753cacfc613f" &&(
        
        <h4 key={appoint.user} > 
        
       Name: Rania</h4>
)}
                                           
                                            <div class="container-fluid p-3 my-3 border well well-lg">
                                        
                                        <div className="row">
                                            
                                            <div className="col-sm-12">
                                            <div className="single_comments">
                                                    
                                                    <p key={appoint.date} >Date: {appoint.date} </p>
                                                   
                                                </div>
                                                <div className="single_comments">
                                                    
                                                    <p key={appoint.place} >Place: {appoint.place} </p>
                                                   
                                                </div>
                                                <a onClick={() => this.props.history.push("/getapp/"+appoint._id)} className="btn btn-primary readmore">Details </a>

                                              
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    ))}


                                </div>
                            </div>
                            {/*/.row*/}
                        </div>
                    </section>
                    {/*/#blog*/}
                    <footer>
                        <div className="footer">
                            <div className="container">
                                <div className="social-icon">
                                    <div className="col-md-4">
                                        <ul className="social-network">
                                            <li><a href="#" className="fb tool-tip" title="Facebook"><i className="fa fa-facebook" /></a></li>
                                            <li><a href="#" className="twitter tool-tip" title="Twitter"><i className="fa fa-twitter" /></a></li>
                                            <li><a href="#" className="gplus tool-tip" title="Google Plus"><i className="fa fa-google-plus" /></a></li>
                                            <li><a href="#" className="linkedin tool-tip" title="Linkedin"><i className="fa fa-linkedin" /></a></li>
                                            <li><a href="#" className="ytube tool-tip" title="You Tube"><i className="fa fa-youtube-play" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-4 col-md-offset-4">
                                    <div className="copyright">
                                        © Company Theme. All Rights Reserved.
<div className="credits">
                                            {/*
All the links in the footer should remain intact.
You can delete the links only if you purchased the pro version.
Licensing information: https://bootstrapmade.com/license/
Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=Company
*/}
Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a></div>
                                    </div>
                                </div>
                            </div>
                            <div className="pull-right">
                                <a href="#home" className="scrollup"><i className="fa fa-angle-up fa-3x" /></a>
                            </div>
                        </div>
                    </footer>


            </>
        );

        if (objs !== null) {
            return (
                <div className="suggest-list">


                    <Data objs={objs} />
                </div>
            )
        } else {



            return (




                <div>

                </div>

            )
        }
    }
}
}

