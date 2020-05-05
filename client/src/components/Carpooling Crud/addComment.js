import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import CurrencyInput from 'react-currency-input';



export class AddComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doc:null,
          
           
                description:'',
                author:'',
                rating:'',
                
            

           
        }

    }

    componentDidMount() {
        this.state.user = localStorage.getItem("user");
        this.state.user_id = localStorage.getItem("user").split("\"")[3];
        this.state.user_email = localStorage.getItem("user").split("\"")[7];
        console.log(this.state.user)
        console.log(this.state.user_email)

        this.callApi()
        .then(res => this.setState({ response: res.express }))
        .catch(err => console.log(err));


    }


    callApi = async () => {
        const response = await fetch('/carpooling/car/'+this.props.match.params.id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
      
      }


    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   
    handleSubmit = event => {
        event.preventDefault();

        



        const carpooling = {
           
            
                description: this.state.description,
                author:{
                    _id:this.state.user_id ,
                    email:this.state.user_email
                   
                },
                rating: this.state.rating,
               

            
           

        };

        console.log(carpooling)


        this.props.history.push('/carpoolingList');
        axios.put(`http://localhost:3000/carpooling/comment/`+this.props.match.params.id, carpooling)
    }
    render() {
        return (
            <div>
                <div id="breadcrumb">
                    <div className="container">
                        <div className="breadcrumb">
                            <li><a href="index.html">Home</a></li>
                            <li>Contact</li>
                        </div>
                    </div>
                </div>
                {/* <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22864.11283411948!2d-73.96468908098944!3d40.630720240038435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbg!4v1540447494452" width="100%" height={380} frameBorder={0} style={{ border: 0 }} allowFullScreen />
                </div */}>
                <section id="contact-page">
                    <div className="container">
                        <div className="center">
                            <h2>Add Post</h2>
                            <p>u can add a post of request or offer of carpooling </p>
                        </div>
                        <div className="row contact-wrap">
                            <div className="status alert alert-success" style={{ display: 'none' }} />
                            <div className="col-md-6 col-md-offset-3">
                                <div id="sendmessage">Your message has been sent. Thank you!</div>
                                <div id="errormessage" />

                               

                                        <form onSubmit={this.handleSubmit} action method="post" role="form" className="contactForm">
                                            <br></br>

                                            

                                            <div className="form-group">
                                                <textarea name="description" value={this.state.name} onChange={this.handleChange} placeholder="Your text" className="form-control" rows="5" cols="30" />
                                            </div>

                                            <div className="form-group">
                                                <input type="number" name="rating" className="form-control" id="rating" placeholder="rate this post" 
                                                    value={this.state.name} onChange={this.handleChange} />
                                               
                                            </div>

                                            <div className="text-center">
                                            

                                                <button type="submit" name="submit" className="btn btn-primary btn-lg" required="required">  Submit Message </button>
                                            </div>


                                        </form>


                                      

                            </div>
                        </div>
                        {/*/.row*/}
                    </div>
                    {/*/.container*/}
                </section>
                {/*/#contact-page*/}
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
            </div>

        )
    }
}


export default AddComments