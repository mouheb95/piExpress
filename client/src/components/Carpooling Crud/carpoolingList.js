import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './pagination';
import Popup from "reactjs-popup";





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
            isLogin: localStorage.getItem("token") === null,
            carpoolings: Array().fill(null),
            author: {
                firstname: '',
                email: ''
            },
            loading: false,
            currentPage: 0,
            postsPerPage: 100,

            notification: {
                subject: '',
                content: '',
                reciver: { email: '' },
                sender: { email: '' },
                post: { title: '' }
            },

            notifications: []

        };




    }




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
        this.state.user_id = localStorage.getItem("user").split("\"")[3];
        this.state.user_email = localStorage.getItem("user").split("\"")[7];



        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));



        this.callApi2()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));


        axios.get('carpooling/notification/5e7b8867148bfa40989888dd')
            .then(response => {
                this.setState({ notifications: response.data.data })
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
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
        const response = await fetch('carpooling/notification/5e7b8867148bfa40989888dd');
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

                            <div  key={index}>

                                <br></br> <br></br>



                                <div className="rayen">
                                    
                                    <p key={notif.subject} > {notif.subject}</p>
                                    <p key={notif.content} > {notif.content}</p>
                                    
                                    <p key={notif.sender.email} > {notif.sender.email}</p>

                                    
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

                {objs.map((carpooling, index) => (

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

                    <DataN objsN={objsN} />
                    <Data objs={objs} />
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
