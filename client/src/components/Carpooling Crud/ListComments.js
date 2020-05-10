import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


export class ListComments extends Component {

    constructor(props) {
        super(props);

        this.state = {

            comments: [],


            doc: {
                createdAt: null,
                comments: Array().fill(null),
            },
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
            

        }
    }



    componentDidMount() {

        axios.get('http://localhost:3000/carpooling/comment/' + this.props.match.params.id)
            .then(response => {
                this.setState({ comments: response.data.data,
                                  })
                console.log(this.state.comments[11].author.email)

            })
            .catch((error) => {
                console.log(error);
            })




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
                categorie: body.data.categorie,
                weight: body.data.weight,
                dimension: body.data.dimension,
                quantity: body.data.quantity

            },




        })
        console.log(this.state.doc._id)
    }


    deleteComment (id,idComment) {

        axios.delete('http://localhost:3000/carpooling/comment/' + id+'/'+idComment)
            .then(response => { console.log(response.data) });
        this.setState({
            comments: this.state.comments.filter(el => el._id !== id)
        })
       
    }

    render() {





        const objs = this.state.comments

        const Data = ({ objs }) => (
            <>

                <div>


                    <section id="blog" className="container">
                        <div className="blog">
                            <div >

                               
                                <div >







                                    <div >



                                        <section >
                                            <h4 > {this.state.title}</h4>
                                            <div >
                                                
                                                <div style={{ backgroundColor: '#FFDEAD'}} className="  container-fluid p-3 my-3 border well well-lg">

                                                    <div  >

                                                        <div >
                                                            <h4 > Type of carpooling: {this.state.offre_demand_Carpooling}</h4>
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div >



                                                            <div className="blog-item">
                                                                <div >

                                                                    <div className="col-xs-12 col-sm-4">
                                                                        <div className="entry-meta">
                                                                            <span id="publish_date"  ></span>




                                                                            <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}>><i className="fa fa-comment" />

                                                                                <a style={{ color: 'black' }} href="#" > {this.state.doc.comments.length}  Comments</a></span>
                                                                            <span style={{ backgroundColor: '#C0C0C0', color: 'red' }}>><i className="fa fa-heart" /><a  style={{ color: 'black' }} href="#"  >Price:  {this.state.price} dt</a></span>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p > Description : {this.state.description}</p>
                                                                        <p  > Created at :{this.state.doc.createdAt}</p>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </section>

                                    </div>







                                    <h3>Recent Comments</h3>

                                    {objs.map((comment, index) => (
                                        <div key={index}>


                                            <h4 key={comment.description} > {comment.description}</h4>

                                            <div className="container-fluid p-3 my-3 border well well-lg">
                                        
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="single_comments">
                                                    
                                                    <p key={comment.description} > {comment.description} </p>
                                                    <p key={comment.rating} > {comment.rating} </p>
                                                    <div className="entry-meta small muted">
                                                       
                                                        {comment !== null && comment.author !== undefined ?
                                                         <p>By 
                                                                   <a href="#" key={comment.author.email} > {comment.author.email}</a>
                                                                   </p>
                                                                    : null
                                                                }
                                                        
                                                    </div>
                                                </div>
                                                <a onClick={() => this.deleteComment(this.state.doc._id,comment._id)} className="btn btn-primary readmore">Delete </a>

                                              
                                            </div>
                                        </div>
                                    </div>
                                        </div>
                                    ))}













                                </div>
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


            </>
        );

        if (objs !== null) {
            return (
                <div className="suggest-list">


                    <Data objs={objs} />
                </div>
            )
        } else {



            return (




                <div>

                </div>

            )
        }
    }
}

export default ListComments
