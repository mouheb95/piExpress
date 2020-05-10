import React, { Component, useEffect } from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import CurrencyInput from 'react-currency-input';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';




export class CarpoolingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.showMap = this.showMap.bind(this)

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
                photos: ''
            },

            author: {
                firstname: '',
                lastname: '',
                email: ''
            },

            pict: '',

            timer: null,
            gif: '',
            loaded: '',






            lat: 35.828829,
            lng: 10.640525,
            zoom: 7,

            from_lat: "35.594604950000004",
            from_long: "11.010310615238183",
            id: "132512",
            to_lat: "35.828829",
            to_long: "10.640525",



            nameFrom: '',
            nameTo: '',

            from: 'sousse',
            to: 'sfax',


            hideMap: false,
        }



    }


    reloadGif = () => {
        setTimeout(() => {
            this.setState({ pict: this.state.pict })
        }, 0)
    }


    componentDidMount() {
        this.state.user = localStorage.getItem("user");
        this.state.user_id = localStorage.getItem("user").split("\"")[3];
        this.state.user_email = localStorage.getItem("user").split("\"")[7];
        console.log(this.state.user)
        console.log(this.state.user_email)

        /* this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

        console.log(this.state.doc) */



        this.from()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));



        this.to()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));




    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    showMap() {

        this.from()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

        this.to()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

        this.setState({
            hideMap: true
        })
    }

    from = async () => {
        this.setState({
            from: this.state.trage.from
        })

        console.log(this.state.trage.from)
        const response = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + this.state.trage.from);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        this.setState({
            from_lat: body[0].lat,
            from_long: body[0].lon,
            nameFrom: body[0].display_name,

        })
        return body;
    }

    to = async () => {
        this.setState({
            to: this.state.trage.to
        })
        console.log(this.state.to)

        const response = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + this.state.trage.to);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        this.setState({
            to_lat: body[0].lat,
            to_long: body[0].lon,
            nameTo: body[0].display_name,

        })

        return body;
    }

    componentWillMount() {

        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
        console.log(this.state.doc)

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
                photos: body.data.parcel.photos

            },
            author: {
                firstname: body.data.author.firstname,
                lastname: body.data.author.lastname,
                email: body.data.author.email
            },
            id: body.data._id,

            pict: body.data.parcel.photos
        })


        console.log(body.data)
        if (this.state.pict !== null) {

            this.setState({ pict: this.state.pict.split("\\")[1] })
        }

        console.log("********" + this.state.pict)

    }




    sendInvite(id) {
        axios.post(`http://localhost:3000/carpooling/sendInvite/` + id + '/' + this.state.user_id)
            .then(async res => {
                //  console.log(res.data.data._id)
                if (res.status === 200) {

                    console.log(res.data)
                } else {
                    console.log(' none ')
                }
            })

    }


    render() {




        const position = [this.state.lat, this.state.lng];

        const from_lat = this.state.from_lat
        const to_lat = this.state.to_lat

        const from_long = this.state.from_long
        const to_long = this.state.to_long

        return (
            <div>
                <div className="aboutus">
                    <br></br> <br></br> <br></br><br></br> <br></br>
                    <div className="container">
                        <h3>{this.state.title}</h3>
                        <hr />
                        <div className="col-md-5 wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="300ms">

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


                            {this.state.parcel !== null && this.state.parcel._id !== '' ?
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

                                    {/* <button onClick={this.reloadGif}>Replay Animation</button> */}

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


                            <button type="button" onClick={() => this.sendInvite(this.state.id)} className="btn btn-outline-secondary">Send Invite</button>


                        </div>


                        <div className="col-md-7" data-wow-duration="1000ms" data-wow-delay="600ms">
                            <div className="skill">
                                <h2>Map</h2>
                                <button type="button" onClick={() => this.showMap()}>Show Map</button>
                                <p>This is your trage</p>
                                                  From   :      {this.state.nameFrom}
                                                   <br></br>
                                                 To     :      {this.state.nameTo}



                                <div>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>






                                    {this.state.hideMap !== false ?

                                        <div>


                                           
                                            <br></br>
                                            <br></br>


                                            <Map
                                                style={{ height: "100vh" }}
                                                center={position}
                                                zoom={this.state.zoom}
                                            >
                                                <TileLayer
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                />

                                                <Polyline key={this.state.id} positions={[
                                                    [from_lat, from_long], [to_lat, to_long],
                                                ]} color={'red'} />

                                            </Map>


                                        </div>

                                        : null
                                    }


                                </div>





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