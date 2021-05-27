import React, { Component } from 'react';
import  "./Styles.css" ;
class Footer extends Component {
    render() { 
        return ( 
            <div className="foo">
                <footer className="container py-5">
                    <div className="row">
                        <div className="col-6 col-md">
                            <p><strong>About us</strong></p>
                             <p className="text-muted">This  application  displays you the contact details of all the users who are using this application.Thanks for using our application.
                                 Hope you have liked our app.Please feel free to contact us for any further help!</p>   
        

                        </div>
                        <div className="col-6 col-md">
                            <address>
                                <ul className="list-unstyled text-small">
                                    <li><strong>Corporate Office</strong></li>
                                    <li className="text-muted">17/1/382/B/97</li>
                                    <li className="text-muted">Champapet, Hyderabad - 500079</li>
                                    <li className="text-muted">Telangana, India</li>
                                    <li className="text-muted">Phone: +91 800 83 17 399</li>
                                </ul>
                            </address>

                        </div>

                    </div>
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                        <a href="mailto:vinayreddykallu@gmail.com"> EMAIL US</a>
                    </div>
                </footer>


            </div>






         );
    }
}
 
export default Footer;