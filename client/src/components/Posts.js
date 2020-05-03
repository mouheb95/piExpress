import React, { Component } from 'react'
import axios from 'axios'

import "./Posts.css"
export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
            isHidden: false
        }
        this.newPosts = this.newPosts.bind(this)
    }
    newPosts = () => {
        axios.get("http://localhost:5000/scraping").then(({ data }) => {
            console.log("scraping", data)
            this.setState({
                posts: data
            })
        }).catch(function (error) {
            console.log("Error****:", error);
        });


        this.setState(prevState => ({
            isHidden: !prevState.isHidden
        }))
        /*  this.setState({
             posts: 
                 ["Si War a partagé sa première publication. Nouveau membre · 3 h",
     "Yassine Namlaghui a partagé sa première publication. Nouveau membre · 10 h" ]
      

    })*/
    }

    render() {


        const objs = this.state.posts
        const Data = ({ objs }) => (
            <>

                {objs.map((user, index) => (

                    <div key={index} className="suggest-item">
                        <p key={user} >{user}</p>
                        <div className="flex">
                            <input type="text" className="suggest-input" />
                            <button style={{ color: "black" }} className="suggest-button">Replay</button>
                        </div>
                    </div>
                ))}
            </>
        );

        if (objs !== null) {
            return (
                <div className="suggest-list">
                    <h1 style={{ color: "black" }}>Suggested posts</h1>
                    <Data objs={objs} />
                </div>
            )
        } else {
            return (
                <div className="suggest-list">
                    <button hidden={this.state.isHidden} onClick={this.newPosts}>Fetch data</button>
                    <div hidden={!this.state.isHidden}>
                        <h1 style={{ color: "black" }} >Fetching data .... </h1>
                        <p>please wait :)</p>
                    </div>
                </div>
            )
        }

    }
}