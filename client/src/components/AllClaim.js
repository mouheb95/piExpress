import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//import TableRow from './TableRow';



export  default class AllClaim extends React.Component {

 


constructor(props){
  super(props);
  console.log("gg")
  this.state = { claim: Array().fill(),doc: {},
    response: {}};
    
 
    this.componentDidMount = this.componentDidMount.bind(this);
}
componentDidMount() {
  


  //console.log(localStorage.getItem("claim"))
  axios.get('/claim/get')
        .then(response => {
          this.setState({ claim: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
  
       
      

        

}

  render() {
    const objs = this.state.claim

    const Data = ({ objs }) => (
      <>

        {objs.map(ob => (

          <tr>
            <td key={ob.description} >{ob.description}</td>
            
            <td>
              <div className="btn-group">
                <button 
                type="button"  className="btn btn-danger dropdown-toggle">Action</button>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
   /* const Data = ({ claim }) => (
      

      {claim.map(station => (

      
          <td >{station.date}</td>))});*/
    return (
      
      <div>
  <div id="breadcrumb">
    <div className="container">
      <div className="breadcrumb">
        <li><a href="index.html">Home</a></li>
        <li>Services</li>
      </div>
    </div>
  </div>
  <div className="services">
    <div className="container">
    <ul className="portfolio-filter text-center">
              
              <li><a className="btn btn-default" href="/claim" data-filter=".wordpress">Send Claim</a></li>
            </ul>
      <h3>Complaints</h3>
      <hr />
      <div className="center">
                        <h2>My claimts </h2>
                        
                       
                    </div>

                    <div>
          <h3 align="center">Business List</h3>
         
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Object</th>
                <th>Description</th>
               
              
              </tr>
            </thead>
            <tbody>
                   
            <Data objs={objs} />  
                
              
                     
            </tbody>
          </table>
        </div>
                        
                    <ul>
                      <li>fghjk</li>
                    </ul>
                       
                    <br></br>
      <div className="col-md-6">
        
          </div>
      <div className="col-md-6">
        
      </div>
    </div>
  </div>
  <div className="sub-services">
    <div className="container">
      <div className="col-md-6">
        <div className="media">
         
        </div>
      </div>
     
    </div>
  </div>
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

