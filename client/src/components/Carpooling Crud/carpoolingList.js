import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './pagination';
import Popup from "reactjs-popup";
import { Redirect } from 'react-router';






const Carpooling = props => (
    <tr>
        <td>{props.carpooling.title}</td>
        <td>{props.carpooling.daily}</td>
        <td>{props.carpooling.people_parcel_Carpooling}</td>
        <td>{props.carpooling.offre_demand_Carpooling}</td>
        <td>{props.carpooling.date}</td>
        <td>
            <Link to={"/edit/" + props.carpooling._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCarpooling(props.carpooling._id) }}>delete</a>
        </td>

    </tr>


)

export class CarppolingList extends Component {

    constructor(props) {
        super(props);



        this.deleteCarpooling = this.deleteCarpooling.bind(this)

        this.state = {
            redirectToNewPage: false,
            resultatS: false,
            isLogin: localStorage.getItem("token") === null,
            carpoolings: Array().fill(null),
            carpoolingsSearch: Array().fill(null),
            author: {
                firstname: '',
                email: ''
            },
            loading: false,
            currentPage: 0,
            postsPerPage: 10,

            notification: {
                subject: '',
                content: '',
                reciver: { email: '' },
                sender: { email: '' },
                post: { title: '' }
            },

            notifications: [],

            advancedSearch: false,


            trage: {

                from: '',
                to: ''
            },

            people_parcel_Carpooling: '',
            offre_demand_Carpooling: '',
            date: '',
            price: '0.00',
            disponibility: '',


        };




    }



    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    componentDidMount() {
        axios.get('carpooling/car')
            .then(response => {
                this.setState({ carpoolings: response.data })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

        this.state.user = localStorage.getItem("user");
        if (this.state.user !== null) {
            this.state.user_id = localStorage.getItem("user").split("\"")[3];
            this.state.user_email = localStorage.getItem("user").split("\"")[7];
        }


        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));



        this.callApi2()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));


        axios.get('carpooling/notification/' + this.state.user_id)
            .then(response => {
                this.setState({ notifications: response.data.data })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })



    }

    myFunction() {

        var input, filter, div, d , h4, h3, a, i, txtValue;
        //input = document.getElementById("myInput");
        filter = document.getElementById("myInput").value.toUpperCase();
        div = document.getElementById("myDIV");

       
        d = div.querySelectorAll("#da");
        
        for (i = 0; i < d.length; i++) {
            h4 = d[i].getElementsByTagName("h4")[0];
            h3 = d[i].getElementsByTagName("h3")[0];
          
            console.log(h4)


            txtValue = h4.textContent || h4.innerText || h3.textContent || h3.innerText;
            console.log(txtValue)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                d[i].style.display = "";
            } else {
                d[i].style.display = "none";
            }
        }

    }

    showAdvancedSearch() {
        this.setState({
            advancedSearch: !this.state.advancedSearch,
        })
    }

    callApi = async () => {
        const response = await fetch('users/searchAuthorById/' + this.state.user_id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            author: body.data,

        })


        console.log(this.state.author.email)
        return body;

    }

    callApi2 = async () => {
        const response = await fetch('carpooling/notification/' + this.state.user_id);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            notification: body.data,

        })


        console.log(this.state.notification)
        return body;

    }


    deleteCarpooling(id) {
        axios.delete('carpooling/car/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            carpoolings: this.state.carpoolings.filter(el => el._id !== id)
        })
    }


    editCarpooling(id) {
        axios.put('carpooling/car/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            carpoolings: this.state.carpoolings.filter(el => el._id !== id)
        })
    }


    deleteNotif(id) {
        axios.delete('carpooling/notification/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            notifications: this.state.notifications.filter(el => el._id !== id)
        })
    }





    carpoolingList() {
        return this.state.carpoolings.map(currentcarpooling => {
            return <Carpooling carpooling={currentcarpooling} deleteCarpooling={this.deleteCarpooling} key={currentcarpooling._id} />;

        })
    }


    handleSubmit = event => {
        event.preventDefault();

        const { from, to, email } = this.state; //object disctructor

        const carpooling = {

            trage: {
                from: from,
                to: to
            },
            people_parcel_Carpooling: this.state.people_parcel_Carpooling,
            offre_demand_Carpooling: this.state.offre_demand_Carpooling,
            date: this.state.date,
            price: this.state.price,
            disponibility: this.state.disponibility,
            fromDate: this.state.fromDate,
            toDate: this.state.toDate,
            author: {
                email: email

            },

        };

        console.log(carpooling)

        axios.post(`carpooling/searchByType`, carpooling)
            .then(async res => {
                //  console.log(res.data.data._id)
                if (res.status === 200) {
                    this.setState({ carpoolingsSearch: res.data.data, resultatS: true, advancedSearch: false })
                    console.log(res.data)
                } else {
                    console.log(' none ')
                }
            })


    }


    

    render() {




        const currentPage = this.state.currentPage;
        const postsPerPage = this.state.postsPerPage;
        const loading = this.state.loading;



        // Get current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = this.state.carpoolings.slice(indexOfFirstPost, indexOfLastPost);




        // Change page
        const paginate = pageNumber => this.setState({ pageNumber });



        const objs = this.state.carpoolings;


        const objsN = this.state.notifications;
        const DataN = ({ objsN }) => (
            <>



                <Popup trigger={<button href="#" class="notification">  <span>Suggestions</span>
                    <span class="badge"> {this.state.notifications.length} </span></button>} position="right center">

                    <div className="border border-success">
                        {objsN.map((notif, index) => (

                            <div key={index}>

                                <br></br> <br></br>



                                <div className="rayen">

                                    <p className="sug" key={notif.subject} > {notif.subject}</p>
                                    <p className="pi" key={notif.content} > {notif.content}</p>



                                    <a onClick={() => this.deleteNotif(notif._id)} className="btn btn-danger readmore">Delete </a>
                                    <Link className="btn btn-warning readmore" to={"/carpoolingDetails/" + notif.post._id}>Details </Link>


                                </div>


                            </div>
                        ))}
                    </div>
                </Popup>
            </>
        );





        const Data = ({ objs }) => (
            <>

                <button type="button" onClick={() => this.showAdvancedSearch()} className="btn btn-outline-secondary">Advanced Search</button>

                {this.state.advancedSearch ?

                    <div  className="container">
                        <div className="col-md-3">
                            <div ></div>
                        </div>
                        <div className="col-md-6">

                            <div className="container-fluid p-3 my-3 border well well-lg" style={{ backgroundColor: '#F0FFF0' }}>
                                <form onSubmit={this.handleSubmit} role="form" className="form-inline">
                                    <br></br>

                                    <div className="form-group">

                                        <label >Choose an :</label> &nbsp;&nbsp;


                                    <select className="form-control" id="people_parcel_Carpooling" name="people_parcel_Carpooling" value={this.state.people_parcel_Carpooling} onChange={this.handleChange}>
                                            <option >Option</option>
                                            <option value="People">People</option>
                                            <option value="Parcel">Parcel</option>

                                        </select>
                                    </div>

                                    <br></br>
                                    <div className="form-group">
                                        <label >Choose an :</label>&nbsp;&nbsp;

                                    <select className="form-control" id="offre_demand_Carpooling" name="offre_demand_Carpooling" value={this.state.offre_demand_Carpooling} onChange={this.handleChange}>
                                            <option >Option</option>
                                            <option value="Offer">Offer</option>
                                            <option value="Demand">Demand</option>

                                        </select>

                                    </div>
                                    <br></br>

                                    <div className="form-group">
                                        <input className="form-control" name="from" id="from" placeholder="Trage .. from"
                                            value={this.state.from} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group" >
                                        <input className="form-control" name="to" id="to" placeholder="trage ..to"
                                            value={this.state.to} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" name="email" id="email" placeholder="username"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>

                                    <div className="form-group has-feedback">
                                        <input className="form-control" value={this.state.date} onChange={this.handleChange} type="datetime-local" name="date" />
                                        <span className="glyphicon glyphicon-user feedback" />
                                    </div>

                                    <div className="form-group">
                                        <input type="number" className="form-control" name="disponibility" id="disponibility" placeholder="places u need"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" name="price" id="price" placeholder="price"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>
                                    <br></br>

                                    <button className="btn btn-warning" type="submit" name="submit" required="required">   Search </button>

                                </form>
                            </div>
                        </div>
                    </div>
                    : null

                }


                {objs.map((carpooling, index) => (

                    <div id="da" key={index}>




                        <br></br> <br></br>

                        {carpooling.offre_demand_Carpooling !== 'Deman' ?

                            <section id="blog" className="container">
                                <div >
                                    <h4 key={carpooling.title} >  {carpooling.title}</h4>
                                </div>
                                <div className="blog">
                                    <div className="row">

                                        <div style={{ float: 'right' }}>

                                            <div style={{ backgroundColor: carpooling.offre_demand_Carpooling === 'Demand' ? "red" : "green" }}>
                                                <h3 key={carpooling.offre_demand_Carpooling} >{carpooling.offre_demand_Carpooling}</h3>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div key={index} className="container-fluid p-3 my-3 border well well-lg" >



                                                <div className="blog-item" >
                                                    <div className="row">

                                                        <div className="col-xs-12 col-sm-4" >
                                                            <div className="entry-meta" >
                                                                <span id="publish_date" key={carpooling.date} > {carpooling.date}</span>
                                                                {carpooling !== null && carpooling.author !== undefined ?
                                                                    <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-user" /> <a href="#" style={{ color: 'black' }} key={carpooling.author.email} > {carpooling.author.email}</a></span>
                                                                    : null
                                                                }


                                                                <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-comment" />
                                                                    <Link style={{ color: 'black' }} to={"/listComments/" + carpooling._id}>Consult comment  </Link>
                                                                    <a style={{ color: 'black' }} href="#" key={carpooling.comments} > {carpooling.comments.length} Comments</a></span>
                                                                <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-heart" /><a href="#" style={{ color: 'black' }} key={carpooling.price} >Price:  {carpooling.price} dt</a></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-8 blog-content">

                                                            {/* <a href="#"><img className="img-responsive img-blog" src="images/blog/blog1.jpg" width="100%" alt="" /></a> */}
                                                            {/* <h4> { this.carpoolingList() }</h4> */}
                                                            {carpooling !== null && carpooling.trage !== undefined ?
                                                                <div>
                                                                    <p key={carpooling.trage.from} > From : {carpooling.trage.from}</p>
                                                                    <p key={carpooling.trage.to} > To : {carpooling.trage.to}</p>

                                                                </div>
                                                                : null
                                                            }
                                                            <p key={carpooling.description} > Description : <br></br>{carpooling.description}</p>
                                                            <p key={carpooling.createdAt} > Created at :{carpooling.createdAt}</p>

                                                            {

                                                                carpooling !== null && carpooling.author !== undefined && carpooling.author.email === this.state.user_email ?
                                                                    <a onClick={() => this.deleteCarpooling(carpooling._id)} className="btn btn-danger readmore">Delete </a>
                                                                    : null
                                                            }
                                                            <Link className="btn btn-info readmore" to={"/addComment/" + carpooling._id}>Add comment  </Link>
                                                            <Link className="btn btn-warning readmore" to={"/carpoolingDetails/" + carpooling._id}>Details </Link>
                                                            {

                                                                carpooling !== null && carpooling.author !== undefined && carpooling.author.email === this.state.user_email ?
                                                                    <Link className="btn btn-info readmore" to={"/editCarpooling/" + carpooling._id}>edit <i className="fa fa-angle-right" /> </Link>
                                                                    : null
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div></div></div></section>
                            : null
                        }
                    </div>
                ))}
            </>
        );






        /* ********************************hedy Search result ****************************/


        const objsSeacrh = this.state.carpoolingsSearch;
        const DataSearch = ({ objsSeacrh }) => (
            <>

                <button type="button" onClick={() => this.showAdvancedSearch()} className="btn btn-outline-secondary">Advanced Search</button>

                {this.state.advancedSearch ?

                    <div className="container">
                        <div className="col-md-3">
                            <div ></div>
                        </div>
                        <div className="col-md-6">

                            <div className="container-fluid p-3 my-3 border well well-lg" style={{ backgroundColor: '#F0FFF0' }}>
                                <form onSubmit={this.handleSubmit} role="form" className="form-inline">
                                    <br></br>

                                    <div className="form-group">

                                        <label >Choose an :</label> &nbsp;&nbsp;


                <select className="form-control" id="people_parcel_Carpooling" name="people_parcel_Carpooling" value={this.state.people_parcel_Carpooling} onChange={this.handleChange}>
                                            <option >Option</option>
                                            <option value="People">People</option>
                                            <option value="Parcel">Parcel</option>

                                        </select>
                                    </div>

                                    <br></br>
                                    <div className="form-group">
                                        <label >Choose an :</label>&nbsp;&nbsp;

                <select className="form-control" id="offre_demand_Carpooling" name="offre_demand_Carpooling" value={this.state.offre_demand_Carpooling} onChange={this.handleChange}>
                                            <option >Option</option>
                                            <option value="Offer">Offer</option>
                                            <option value="Demand">Demand</option>

                                        </select>

                                    </div>
                                    <br></br>

                                    <div className="form-group">
                                        <input className="form-control" name="from" id="from" placeholder="Trage .. from"
                                            value={this.state.from} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group" >
                                        <input className="form-control" name="to" id="to" placeholder="trage ..to"
                                            value={this.state.to} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" name="email" id="email" placeholder="username"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>

                                    <div className="form-group has-feedback">
                                        <input className="form-control" value={this.state.date} onChange={this.handleChange} type="datetime-local" name="date" />
                                        <span className="glyphicon glyphicon-user feedback" />
                                    </div>

                                    <div className="form-group">
                                        <input type="number" className="form-control" name="disponibility" id="disponibility" placeholder="places u need"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" name="price" id="price" placeholder="price"
                                            value={this.state.name} onChange={this.handleChange} />

                                    </div>
                                    <br></br>

                                    <button className="btn btn-warning" type="submit" name="submit" required="required">   Search </button>

                                </form>
                            </div>
                        </div>
                    </div>
                    : null

                }

                {objsSeacrh.map((carpooling, index) => (

                    <div key={index}>




                        <br></br> <br></br>

                        {carpooling.offre_demand_Carpooling !== 'Deman' ?

                            <section id="blog" className="container">
                                <h4 key={carpooling.title} > {carpooling.title}</h4>
                                <div className="blog">
                                    <div className="row">

                                        <div style={{ float: 'right' }}>

                                            <div style={{ backgroundColor: carpooling.offre_demand_Carpooling === 'Demand' ? "red" : "green" }}>
                                                <h4 key={carpooling.offre_demand_Carpooling} > {carpooling.offre_demand_Carpooling}</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <div key={index} className="container-fluid p-3 my-3 border well well-lg" >



                                                <div className="blog-item" >
                                                    <div className="row">

                                                        <div className="col-xs-12 col-sm-4" >
                                                            <div className="entry-meta" >
                                                                <span id="publish_date" key={carpooling.date} > {carpooling.date}</span>
                                                                {carpooling !== null && carpooling.author !== undefined ?
                                                                    <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-user" /> <a href="#" style={{ color: 'black' }} key={carpooling.author.email} > {carpooling.author.email}</a></span>
                                                                    : null
                                                                }


                                                                <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-comment" />
                                                                    <Link style={{ color: 'black' }} to={"/listComments/" + carpooling._id}>Consult comment  </Link>
                                                                    <a style={{ color: 'black' }} href="#" key={carpooling.comments} > {carpooling.comments.length} Comments</a></span>
                                                                <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}><i className="fa fa-heart" /><a href="#" style={{ color: 'black' }} key={carpooling.price} >Price:  {carpooling.price} dt</a></span>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-8 blog-content">

                                                            {/* <a href="#"><img className="img-responsive img-blog" src="images/blog/blog1.jpg" width="100%" alt="" /></a> */}
                                                            {/* <h4> { this.carpoolingList() }</h4> */}
                                                            {carpooling !== null && carpooling.trage !== undefined ?
                                                                <div>
                                                                    <p key={carpooling.trage.from} > From : {carpooling.trage.from}</p>
                                                                    <p key={carpooling.trage.to} > To : {carpooling.trage.to}</p>

                                                                </div>
                                                                : null
                                                            }
                                                            <p key={carpooling.description} > Description : <br></br>{carpooling.description}</p>
                                                            <p key={carpooling.createdAt} > Created at :{carpooling.createdAt}</p>

                                                            {

                                                                carpooling !== null && carpooling.author !== undefined && carpooling.author.email === this.state.user_email ?
                                                                    <a onClick={() => this.deleteCarpooling(carpooling._id)} className="btn btn-danger readmore">Delete </a>
                                                                    : null
                                                            }
                                                            <Link className="btn btn-info readmore" to={"/addComment/" + carpooling._id}>Add comment  </Link>
                                                            <Link className="btn btn-warning readmore" to={"/carpoolingDetails/" + carpooling._id}>Details </Link>
                                                            {

                                                                carpooling !== null && carpooling.author !== undefined && carpooling.author.email === this.state.user_email ?
                                                                    <Link className="btn btn-info readmore" to={"/editCarpooling/" + carpooling._id}>edit <i className="fa fa-angle-right" /> </Link>
                                                                    : null
                                                            }

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div></div></div></section>
                            : null
                        }
                    </div>
                ))}
            </>
        );





        if (objs !== null) {
            return (
                <div className="suggest-list">
                                    <input type="text" id="myInput" onKeyUp={() => this.myFunction()} placeholder="Search for names.." title="Type in a name"></input>


                    <DataN objsN={objsN} />

                    {this.state.resultatS === false ?
                        <div id="myDIV">
                            <Data objs={objs} currentPosts={currentPosts} />
                        </div>
                        :
                        <DataSearch objsSeacrh={objsSeacrh} />
                    }




                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={this.state.carpoolings.length}
                        paginate={paginate}
                    />






                </div>


            )
        } else {
            return (




                <div>

                    <div id="breadcrumb">
                        <div className="container">
                            <div className="breadcrumb">
                                <li><a href="index.html">Home</a></li>
                                <li>Blog</li>
                            </div>
                        </div>
                    </div>
                    <section id="blog" className="container">
                        <div className="blog">
                            <div className="row">
                                <div className="col-md-8">







                                    <div className="blog-item">
                                        <div className="row">
                                            <div className="col-xs-12 col-sm-2">
                                                <div className="entry-meta">
                                                    <span id="publish_date">07  JUNY</span>
                                                    <span><i className="fa fa-user" /> <a href="#">John Doe</a></span>
                                                    <span><i className="fa fa-comment" /> <a href="#">2 Comments</a></span>
                                                    <span><i className="fa fa-heart" /><a href="#">56 Likes</a></span>
                                                </div>
                                            </div>
                                            <div className="col-xs-12 col-sm-10 blog-content">
                                                <a href="#"><img className="img-responsive img-blog" src="images/blog/blog1.jpg" width="100%" alt="" /></a>
                                                {/* <h4> { this.carpoolingList() }</h4> */}
                                                <p>Curabitur quis libero leo, pharetra mattis eros. Praesent consequat libero eget dolor convallis vel rhoncus magna scelerisque. Donec nisl ante, elementum eget posuere a, consectetur a metus. Proin a adipiscing sapien. Suspendisse vehicula
                        porta lectus vel semper. Nullam sapien elit, lacinia eu tristique non.posuere at mi. Morbi at turpis id urna ullamcorper ullamcorper.</p>
                                                <a className="btn btn-primary readmore">Read More <i className="fa fa-angle-right" /></a>
                                            </div>
                                        </div>
                                    </div>








                                    {/*/.blog-item*/}
                                    <ul className="pagination pagination-lg">
                                        <li><a href="#"><i className="fa fa-long-arrow-left" />Previous Page</a></li>
                                        <li className="active"><a href="#">1</a></li>
                                        <li><a href="#">2</a></li>
                                        <li><a href="#">3</a></li>
                                        <li><a href="#">4</a></li>
                                        <li><a href="#">5</a></li>
                                        <li><a href="#">Next Page<i className="fa fa-long-arrow-right" /></a></li>
                                    </ul>
                                    {/*/.pagination*/}
                                </div>
                                {/*/.col-md-8*/}
                                <aside className="col-md-4">
                                    <div className="widget search">
                                        <form role="form">
                                            <input type="text" className="form-control search_box" autoComplete="off" placeholder="Search Here" />
                                        </form>
                                    </div>
                                    {/*/.search*/}
                                    <div className="widget categories">
                                        <h3>Recent Comments</h3>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="single_comments">
                                                    <img src="images/blog/avatar3.png" alt="" />
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                                                    <div className="entry-meta small muted">
                                                        <span>By <a href="#">Alex</a></span>
                                                    </div>
                                                </div>
                                                <div className="single_comments">
                                                    <img src="images/blog/avatar3.png" alt="" />
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                                                    <div className="entry-meta small muted">
                                                        <span>By <a href="#">Alex</a></span>
                                                    </div>
                                                </div>
                                                <div className="single_comments">
                                                    <img src="images/blog/avatar3.png" alt="" />
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do </p>
                                                    <div className="entry-meta small muted">
                                                        <span>By <a href="#">Alex</a></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/.recent comments*/}
                                    <div className="widget categories">
                                        <h3>Categories</h3>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <ul className="blog_category">
                                                    <li><a href="#">Computers <span className="badge">04</span></a></li>
                                                    <li><a href="#">Smartphone <span className="badge">10</span></a></li>
                                                    <li><a href="#">Gedgets <span className="badge">06</span></a></li>
                                                    <li><a href="#">Technology <span className="badge">25</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/.categories*/}
                                    <div className="widget archieve">
                                        <h3>Archieve</h3>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <ul className="blog_archieve">
                                                    <li><a href="#"><i className="fa fa-angle-double-right" /> December 2015 <span className="pull-right">(97)</span></a></li>
                                                    <li><a href="#"><i className="fa fa-angle-double-right" /> November 2015 <span className="pull-right">(32)</span></a></li>
                                                    <li><a href="#"><i className="fa fa-angle-double-right" /> October 2015 <span className="pull-right">(19)</span></a></li>
                                                    <li><a href="#"><i className="fa fa-angle-double-right" /> September 2015 <span className="pull-right">(08)</span></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/.archieve*/}
                                    <div className="widget tags">
                                        <h3>Tag Cloud</h3>
                                        <ul className="tag-cloud">
                                            <li><a className="btn btn-xs btn-primary" href="#">Apple</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Barcelona</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Office</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Ipod</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Stock</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Race</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">London</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Football</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Porche</a></li>
                                            <li><a className="btn btn-xs btn-primary" href="#">Gadgets</a></li>
                                        </ul>
                                    </div>
                                    {/*/.tags*/}
                                    <div className="widget blog_gallery">
                                        <h3>Our Gallery</h3>
                                        <ul className="sidebar-gallery">
                                            <li><a href="#"><img src="images/blog/gallery1.png" alt="" /></a></li>
                                            <li><a href="#"><img src="images/blog/gallery2.png" alt="" /></a></li>
                                            <li><a href="#"><img src="images/blog/gallery3.png" alt="" /></a></li>
                                            <li><a href="#"><img src="images/blog/gallery4.png" alt="" /></a></li>
                                            <li><a href="#"><img src="images/blog/gallery5.png" alt="" /></a></li>
                                            <li><a href="#"><img src="images/blog/gallery6.png" alt="" /></a></li>
                                        </ul>
                                    </div>
                                    {/*/.blog_gallery*/}
                                </aside>
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
                </div>

            )
        }
    }


}
export default CarppolingList
