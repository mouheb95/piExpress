import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Onne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          claim: {}
        };
      }
    
      componentDidMount() {
        axios.get('/claim/get/'+this.props.match.params.id)
          .then(res => {
            this.setState({ claim: res.data ,
              object: res.data.object, });
            console.log(this.state.claim.data);
          });
      }
    
    
     
  render() {
    const { claim } = this.state;
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
              
              <li><a className="btn btn-default" href="#" data-filter=".wordpress">my complaints</a></li>
            </ul>
      <h3>Send Claim</h3>
      <hr />
      <div className="center">
                        <h2>HAVE YOU HAD A PROBLEM?</h2>
                        <p>file your complaint with our service</p>
                       {this.state.claim.object}
                    </div>

                    <div className="row contact-wrap">
                        <div className="status alert alert-success" style={{display: 'none'}} />
                        <div className="col-md-6 col-md-offset-3">
                        <div id="sendmessage">Your message has been sent. Thank you!</div>
                        <div id="errormessage" />
                        
                        </div>
                    </div>
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


