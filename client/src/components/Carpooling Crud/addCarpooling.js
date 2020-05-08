import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import DatePicker from 'react-date-picker';
import CurrencyInput from 'react-currency-input';



export class AddCarpooling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            daily: false,
            trage: {

                from: '',
                to: ''
            },

            people_parcel_Carpooling: '',
            offre_demand_Carpooling: '',
            date: new Date(),
            price: '0.00',
            isPeaple: true,
            isParcel: false,
            isOffer: true,
            isDemand: false,
            disponibility: '',
            description: '',
            fromDate: new Date(),
            toDate: new Date(),
            parcel: {
                categorie: '',
                weight: '',
                dimension: '',
                quantity: ''
            },
            redirectToNewPage: false

            //author: '',
        }

    }


    operationDemand() {
        this.setState({
            isDemand: true,
            isOffer: false
        })
    }

    operationOffer() {
        this.setState({
            isOffer: true,
            isDemand: false
        })
    }

    operationDaily() {
        this.setState({
            daily: true
        })
    }

    operationNOTDaily() {
        this.setState({
            daily: false
        })
    }

    operationParcel() {
        this.setState({
            isParcel: true,
            isPeaple: false
        })
    }

    operationNOTParcel() {
        this.setState({
            isParcel: false,
            isPeaple: true
        })
    }

    componentDidMount() {
        this.state.user = localStorage.getItem("user");
        this.state.user_id = localStorage.getItem("user").split("\"")[3];
        this.state.user_email = localStorage.getItem("user").split("\"")[7];
        console.log(this.state.user)
        console.log(this.state.user_email)

    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /*  handleChangeP(event, maskedvalue, floatvalue){
         this.setState({price: maskedvalue});
     } */

    onChange = date => this.setState({ date })
    onChangeFD = fromDate => this.setState({ fromDate })
    onChangeTD = toDate => this.setState({ toDate })
    onChange = price => this.setState({ price })
    onChangeOffer = offre_demand_Carpooling => this.setState({ offre_demand_Carpooling: 'Offer' })
    onChangeDemand = offre_demand_Carpooling => this.setState({ offre_demand_Carpooling: 'Demand' })
    onChangePeople = people_parcel_Carpooling => this.setState({ people_parcel_Carpooling: 'People' })
    onChangeParcel = people_parcel_Carpooling => this.setState({ people_parcel_Carpooling: 'Parcel' })

    handleSubmit = event => {
        event.preventDefault();

        const { from, to, categorie, weight, dimension, quantity } = this.state; //object disctructor

        const carpooling = {
            title: this.state.title,
            daily: this.state.daily,
            trage: {
                from: from,
                to: to
            },
            people_parcel_Carpooling: this.state.people_parcel_Carpooling,
            offre_demand_Carpooling: this.state.offre_demand_Carpooling,
            date: this.state.date,
            price: this.state.price,
            disponibility: this.state.disponibility,
            description: this.state.description,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            parcel: {
                categorie: categorie,
                weight: weight,
                dimension: dimension,
                quantity: quantity

            },
            author: {
                _id: this.state.user_id,
                email: this.state.user_email

            },

            // author: this.state.author 
        };

        console.log(carpooling)

        axios.post(`carpooling/car`, carpooling)
        .then(async res => {
          //  console.log(res.data.data._id)
            if (res.status === 200) {
                console.log(res.data.data)
               this.props.history.push("/parcelPict/"+res.data.data)
               this.setState({ redirectToNewPage: true })
            } else {
                console.log(' none ')
            }
        })
       

    }
    render() {

        if (this.state.redirectToNewPage) {
            return (
            <Redirect to="/parcelPict"/>
            )
          }
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

                                <button class="btn btn-primary btn-sm" onClick={() => this.operationDemand()}>Demand</button>
                                <button class="btn btn-primary btn-sm" onClick={() => this.operationOffer()}>Offer</button>

                                {
                                    this.state.isOffer ?

                                        <form onSubmit={this.handleSubmit} action method="post" role="form" className="contactForm">
                                            <br></br>


                                            <input name="offre_demand_Carpooling" className="form-control"
                                                onChange={this.onChangeOffer}
                                                value={this.state.offre_demand_Carpooling} />

                                            <br></br>

                                            <div className="form-group">
                                                <input type="text" name="title" className="form-control" id="title" placeholder="Your title" data-rule="minlen:4" data-msg="Please enter at least 4 chars"
                                                    value={this.state.name} onChange={this.handleChange} />
                                                <div className="validation" />
                                            </div>

                                            <div className="form-group">
                                                <textarea name="description" value={this.state.name} onChange={this.handleChange} placeholder="Your text" className="form-control" rows="5" cols="30" />
                                            </div>

                                            <div className="form-group">

                                                <label className="form-control">Daily ?</label>
                                                <label className="form-control" for="Yes" >Yes <input onClick={() => this.operationDaily()} type="radio" id="Yes" name="daily" value='true' onChange={this.handleChange} /></label>
                                                {
                                                    this.state.daily ?
                                                        <div className="form-group">

                                                            <DatePicker name="fromDate" className="form-control"
                                                                onChange={this.onChangeFD}
                                                                value={this.state.date}
                                                            />
                                                            <DatePicker name="toDate" className="form-control"
                                                                onChange={this.onChangeTD}
                                                                value={this.state.date}
                                                            />

                                                        </div>

                                                        : null}
                                                <label className="form-control" for="No">No <input onClick={() => this.operationNOTDaily()} type="radio" id="No" name="daily" value='false' onChange={this.handleChange} /></label>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" name="from" id="from" placeholder="from" data-msg="Please enter a valid email"
                                                    value={this.state.name} onChange={this.handleChange} />

                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" name="to" id="to" placeholder="to" data-msg="Please enter a valid email"
                                                    value={this.state.name} onChange={this.handleChange} />

                                            </div>


                                            <div className="form-group">


                                                <label className="form-control" for="People"> People <input onClick={() => this.operationNOTParcel()} type="checkbox" id="People" name="People"
                                                    onChange={this.onChangePeople}
                                                    value={this.state.people_parcel_Carpooling}
                                                /></label>

                                                <label className="form-control" for="Parcel">Parcel <input onClick={() => this.operationParcel()} type="checkbox" id="Parcel" name="Parcel"
                                                    onChange={this.onChangeParcel}
                                                    value={this.state.people_parcel_Carpooling}
                                                /></label>

                                                {
                                                    this.state.isParcel ?
                                                        <div className="form-group">
                                                            <input type='text' className="form-control" name="categorie" id="categorie" placeholder="categorie"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="weight" id="weight" placeholder="weight"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="dimension" id="dimension" placeholder="dimension"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="quantity" id="quantity" placeholder="quantity"
                                                                value={this.state.name} onChange={this.handleChange} />


                                                        </div>

                                                        : null}
                                            </div>


                                            <div className="form-group">
                                                <input type='number' className="form-control" name="disponibility" id="disponibility" placeholder="disponibility" data-msg="Please enter number disponibility"
                                                    value={this.state.name} onChange={this.handleChange} />

                                            </div>


                                            <div className="form-group">
                                                <DatePicker name="date" className="form-control"
                                                    onChange={this.onChange}
                                                    value={this.state.date}
                                                />
                                            </div>


                                            <div className="form-group">
                                                <label className="form-control" > Price :
                                                <CurrencyInput
                                                        name="price"
                                                        value={this.state.price}
                                                        onChange={this.onChange}
                                                    />
                                                </label>

                                            </div>

                                            <div className="text-center">
                                               
                                                <button type="submit" name="submit" className="btn btn-primary btn-lg" required="required">   Submit Message </button>
                                                
                                            </div>




                                        </form>




                                        : null
                                }

                                {
                                    this.state.isDemand ?


                                        <form onSubmit={this.handleSubmit} action method="post" role="form" className="contactForm">
                                            <br></br>

                                            <input name="offre_demand_Carpooling" className="form-control"
                                                onChange={this.onChangeDemand}
                                                value={this.state.offre_demand_Carpooling} />

                                            <br></br>


                                            <div className="form-group">
                                                <input type="text" name="title" className="form-control" id="title" placeholder="Your title" data-rule="minlen:4" data-msg="Please enter at least 4 chars"
                                                    value={this.state.name} onChange={this.handleChange} />
                                                <div className="validation" />
                                            </div>

                                            <div className="form-group">
                                                <textarea name="description" value={this.state.name} onChange={this.handleChange} placeholder="Your text" className="form-control" rows="5" cols="30" />
                                            </div>

                                            <div className="form-group">

                                                <label className="form-control">Daily ?</label>
                                                <label className="form-control" for="Yes" >Yes <input onClick={() => this.operationDaily()} type="radio" id="Yes" name="daily" value='true' onChange={this.handleChange} /></label>
                                                {
                                                    this.state.daily ?
                                                        <div className="form-group">

                                                            <DatePicker name="fromDate" className="form-control"
                                                                onChange={this.onChangeFD}
                                                                value={this.state.date}
                                                            />
                                                            <DatePicker name="toDate" className="form-control"
                                                                onChange={this.onChangeTD}
                                                                value={this.state.date}
                                                            />

                                                        </div>

                                                        : null}
                                                <label className="form-control" for="No">No <input onClick={() => this.operationNOTDaily()} type="radio" id="No" name="daily" value='false' onChange={this.handleChange} /></label>
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control" name="from" id="from" placeholder="from" data-msg="Please enter a valid email"
                                                    value={this.state.name} onChange={this.handleChange} />

                                            </div>

                                            <div className="form-group">
                                                <input className="form-control" name="to" id="to" placeholder="to" data-msg="Please enter a valid email"
                                                    value={this.state.name} onChange={this.handleChange} />

                                            </div>


                                            <div className="form-group">


                                                <label className="form-control" for="People"> People <input onClick={() => this.operationNOTParcel()} type="checkbox" id="People" name="People"
                                                    onChange={this.onChangePeople}
                                                    value={this.state.people_parcel_Carpooling}
                                                /></label>

                                                <label className="form-control" for="Parcel">Parcel <input onClick={() => this.operationParcel()} type="checkbox" id="Parcel" name="Parcel"
                                                    onChange={this.onChangeParcel}
                                                    value={this.state.people_parcel_Carpooling}
                                                /></label>

                                                {
                                                    this.state.isParcel ?
                                                        <div className="form-group">
                                                            <input type='text' className="form-control" name="categorie" id="categorie" placeholder="categorie"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="weight" id="weight" placeholder="weight"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="dimension" id="dimension" placeholder="dimension"
                                                                value={this.state.name} onChange={this.handleChange} />

                                                            <input type='number' className="form-control" name="quantity" id="quantity" placeholder="quantity"
                                                                value={this.state.name} onChange={this.handleChange} />


                                                        </div>

                                                        : null}
                                            </div>



                                            <div className="form-group">
                                                <DatePicker name="date" className="form-control"
                                                    onChange={this.onChange}
                                                    value={this.state.date}
                                                />
                                            </div>



                                            <div className="text-center">
                                                <button type="submit" name="submit" className="btn btn-primary btn-lg" required="required">Submit Message</button>
                                            </div>
                                        </form>


                                        : null
                                }

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


export default AddCarpooling