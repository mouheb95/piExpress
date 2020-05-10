import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';




export class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.fromF = this.fromF.bind(this)
        this.toF = this.toF.bind(this)
        this.state = {
            lat: 35.828829,
            lng:  10.640525,
            zoom: 7,
            
                from_lat: "35.594604950000004",
                from_long: "11.010310615238183",
                id: "132512",
                to_lat: "35.828829",
                to_long: "10.640525",
           

          
            nameFrom: '',
            nameTo: '',

            from: '',
            to: '',

            resul: Array().fill(null),

        }

    }





    componentDidMount() {

    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };





    fromF() {
        this.from()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

    }

    toF() {
        this.to()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));

    }




    from = async () => {
        this.setState({
            from: this.state.from
        })

        const response = await fetch("https://www.latlong.net/c/?lat=40.785091&long=40.785091");
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    }

    to = async () => {
        this.setState({
            to: this.state.to
        })

        const response = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + this.state.to);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        this.setState({
            to_lat: body[0].lat,
            to_long: body[0].lon,
            nameTo: body[0].display_name,

        })
      
        return body;
    }




    render() {




        const position = [this.state.lat, this.state.lng];

        const from_lat = this.state.from_lat
        const to_lat = this.state.to_lat
    
        const from_long = this.state.from_long
        const to_long = this.state.to_long





        return (


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
               

                <b>From</b>
                <div id="search">
                    <input type="text" name="from" id="from" size="58" onChange={this.handleChange}
                        value={this.state.from} />
                    <button type="button" onClick={() => this.fromF()}>Search</button>
                    <div id="results">
                        lat :      {this.state.from_lat}
                        <br></br>
                       lon  :        {this.state.from_long}
                        <br></br>
                       name  :      {this.state.nameFrom}
                    </div>
                </div>


                <b>To</b>
                <div id="search">
                    <input type="text" name="to" id="to" size="58" onChange={this.handleChange}
                        value={this.state.to} />
                    <button type="button" onClick={() => this.toF()}>Search</button>
                    <div id="results">
                        lat :      {this.state.to_lat}
                        <br></br>
                       lon  :        {this.state.to_long}
                        <br></br>
                       name  :      {this.state.nameTo}
                    </div>
                </div>








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
        )
    }
}


export default Maps