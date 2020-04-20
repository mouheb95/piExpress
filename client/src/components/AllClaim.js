import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  { Component } from 'react';



export  class AllClaim extends React.Component {

  state = {
    object: '',
    description: '',
    type: '',
    etat:''
  
   
}

componentDidMount() {
  console.log(localStorage.getItem("claim"))

}
constructor(props){
  super(props);
  console.log("gg")
  this.state = {type: 'probleme',etat:'pending'};

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};

handleSubmit = event => {
  event.preventDefault();
 
  

  const claim = {
      object: this.state.object,
      description: this.state.description,
      type: this.state.type,
      etat: this.state.etat
      
      
  };
  console.log(claim)
 


 /* axios.post(`claim/send`, claim)
      .then(async res => {
          if (res.status === 201) {
            console.log(claim)
          } else {
              console.log(' wrong information ')
          }
      })*/
}

 



  render() {
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
                        <h2>HAVE YOU HAD A PROBLEM?</h2>
                        <p>file your complaint with our service dfgh</p>
                       <p>dfgfhy</p> 
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



export default AllClaim