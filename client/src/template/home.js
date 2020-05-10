import React, { Component } from 'react'
import Notification from "../components/Notification/index";
import axios from 'axios'
export default class home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value });
    };

    buttonHanler = () => {
        const { content } = this.state
        const post = {
            "from": JSON.parse(localStorage.getItem("user")).email,
            "to": "234",
            content: content
        }  //this.state.post
        axios.post("http://localhost:4001/notifications/new", post).then(({ data }) => {

        })
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
                <div className="map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22864.11283411948!2d-73.96468908098944!3d40.630720240038435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbg!4v1540447494452" width="100%" height={380} frameBorder={0} style={{ border: 0 }} allowFullScreen />
                    <Notification />
                </div >
                <section id="contact-page">
                    <div className="container">
                        <div className="center">
                            <h2>Add Post</h2>
                            
                            <p>Add a post of request or offer of carpooling </p>
                        </div>
                        <div className="row contact-wrap">
                            <div className="status alert alert-success" style={{ display: 'none' }} />
                            <div className="col-md-6 col-md-offset-3">
                                <div id="sendmessage">Your message has been sent. Thank you!</div>
                                <div id="errormessage" />
                                <div className="form-group">
                                    <textarea className="form-control" name="content" value={this.state.content} onChange={this.handleChange} id="from" placeholder="text" data-msg="Please enter a valid email"
                                    />

                                </div>
                                <button onClick={() => this.buttonHanler()}>
                                    send mssage
                                </button>

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
