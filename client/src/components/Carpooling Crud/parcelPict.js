import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';




export class ParcelPict extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,

            redirectToNewPage: false


        }

    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,

        })
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    
    onClickHandler = () => {


        const data = new FormData()

     
        data.append('file', this.state.selectedFile)

        console.log(this.state.selectedFile)
        axios.put(`http://localhost:3000/carpooling/file/`+this.props.match.params.id, data)
            .then(res => {
                console.log(data)
                this.setState({ redirectToNewPage: true })
            })
            
    };





    render() {

        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/carpoolingList" />
            )
        }
        return (
            <div>


                <section id="contact-page">
                    <div className="container">
                        <div className="center">
                            <h2>Add Picture</h2>
                            <p>u can add a post of request or offer of carpooling </p>
                        </div>
                        <div className="row contact-wrap">
                            <div className="status alert alert-success" style={{ display: 'none' }} />
                            <div className="col-md-6 col-md-offset-3">
                                <div id="sendmessage">Your message has been sent. Thank you!</div>
                                <div id="errormessage" />



                                <form onSubmit={this.handleSubmit} action method="post" role="form" className="contactForm">


                                    <div className="form-group">



                                               {/*  <div className="form-group">
                                                    <input type='text' className="form-control" name="categorie" id="categorie" placeholder="categorie"
                                                        value={this.state.name} onChange={this.handleChange} />

                                                    <input type='number' className="form-control" name="weight" id="weight" placeholder="weight"
                                                        value={this.state.name} onChange={this.handleChange} />

                                                    <input type='number' className="form-control" name="dimension" id="dimension" placeholder="dimension"
                                                        value={this.state.name} onChange={this.handleChange} />

                                                    <input type='number' className="form-control" name="quantity" id="quantity" placeholder="quantity"
                                                        value={this.state.name} onChange={this.handleChange} />


                                                </div> */}

                                            
                                    </div>

                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <input type="file" name="file" onChange={this.onChangeHandler} />



                                    <br></br>

                                    <div className="text-center">

                                        <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

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


export default ParcelPict