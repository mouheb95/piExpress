import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import CurrencyInput from 'react-currency-input';



export class CarpoolingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doc: null,
            id: '',
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
            fromDate: '',
            toDate: '',
            parcel: {
                categorie: '',
                weight: '',
                dimension: '',
                quantity: '',
                photos:''
            },

            author: {
                firstname: '',
                lastname: '',
                email: ''
            },

            pict:''
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
        const response = await fetch('/carpooling/car/' + this.props.match.params.id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            doc: body.data,
            title: body.data.title,
            description: body.data.description,
            daily: body.data.daily,
            trage: {
                from: body.data.trage.from,
                to: body.data.trage.to
            },
            people_parcel_Carpooling: body.data.people_parcel_Carpooling,
            offre_demand_Carpooling: body.data.offre_demand_Carpooling,
            date: body.data.date,
            price: body.data.price,
            disponibility: body.data.disponibility,
            description: body.data.description,
            fromDate: body.data.fromDate,
            toDate: body.data.toDate,
            parcel: {
                categorie: body.data.parcel.categorie,
                weight: body.data.parcel.weight,
                dimension: body.data.parcel.dimension,
                quantity: body.data.parcel.quantity,
                photos:body.data.parcel.photos

            },
            author: {
                firstname: body.data.author.firstname,
                lastname: body.data.author.lastname,
                email: body.data.author.email
            },
            id: body.data._id,
            pict:body.data.parcel.photos.split("\\")[1]
        })
        console.log(this.state.pict)
        
    }


    render() {
        return (
            <div>
                <div className="aboutus">
                    <br></br> <br></br> <br></br><br></br> <br></br>
                    <div className="container">
                        <h3>{this.state.title}</h3>
                        <hr />
                        <div className="col-md-7 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">

                            <h4>Description :</h4>
                            <p>{this.state.description} </p>

                            <p>By
                               <a href="#" > {this.state.author.email}</a>
                            </p>

                            <br>
                            </br>
                            <h4>Trage :</h4>

                            {this.state.trage !== null && this.state.trage.from !== undefined ?
                                <table style={{ width: "100%", border: '1px solid black' }}>
                                    <tr>
                                        <th style={{ border: '1px solid black' }}>From</th>
                                        <th style={{ border: '1px solid black' }}>To</th>

                                    </tr>
                                    <tr>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.trage.from}</td>
                                        <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.trage.to}</td>

                                    </tr>

                                </table>


                                : null
                            }

                            <br></br>
                            <p>Price :
                               <a href="#" > {this.state.price} dt</a>
                            </p>


                            {this.state.parcel !== null && this.state.parcel.categorie !== undefined ?
                                <div> <h4>Parcel :</h4>
                                    <table style={{ width: "100%", border: '1px solid black' }}>
                                        <tr>
                                            <th style={{ border: '1px solid black' }}>Categorie</th>
                                            <th style={{ border: '1px solid black' }}>Weight</th>
                                            <th style={{ border: '1px solid black' }}>Dimension</th>
                                            <th style={{ border: '1px solid black' }}>Quantity</th>
                                        </tr>
                                        <tr>
                                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.parcel.categorie}</td>
                                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.parcel.weight}</td>
                                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.parcel.dimension}</td>
                                            <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.parcel.quantity} </td>
                                        </tr>

                                    </table>

                                    <a href="#">  <img className="img-responsive img-blog" src={`http://localhost:5000/uploads/${this.state.pict}`} width="100%" alt="" /></a>

                                </div>
                                : null
                            }

                            <br></br>
                            <br></br>



                            {this.state.daily !== false ?

                                <div>
                                    <table style={{ width: "100%", border: '1px solid black' }}>
                                        <tr >
                                            <th style={{ border: '1px solid black' }}>From Date</th>
                                            <th style={{ border: '1px solid black' }}>To Date</th>

                                        </tr>
                                        {this.state.fromDate !== undefined && this.state.toDate !== undefined ?
                                            <tr >

                                                <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.fromDate}</td>
                                                <td style={{ border: '1px solid black', textAlign: 'center' }}>{this.state.toDate}</td>


                                            </tr>
                                            : null
                                        }

                                    </table>

                                </div>

                                : null
                            }

                            <h4> Type (People / Parcel)  :   {this.state.people_parcel_Carpooling} </h4>
                            <h4> Kind ( Offer / Demand)  :   {this.state.offre_demand_Carpooling} </h4>




                        </div>
                        <div className="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="600ms">
                            <div className="skill">
                                <h2>Map</h2>
                                <p>This is your trage</p>





                            </div>
                        </div>
                    </div>
                    {this.state.author.email === this.state.user_email ?
                        <Link className="btn btn-primary readmore" to={"/editCarpooling/" + this.state.id}>edit <i className="fa fa-angle-right" /> </Link>
                        : null
                    }
                </div>
            </div>

        )
    }

}

export default CarpoolingDetails