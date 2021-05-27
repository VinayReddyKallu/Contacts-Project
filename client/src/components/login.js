import React, { PureComponent } from 'react';
import  "./Styles.css" ;
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './footer' ;
class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
        this.state = {
            username: '',
            password: '',

        }
    }

    
    
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        if(this.state.username.length===0)
            alert("Username should not be Empty!");
        if(this.state.password.length===0)
            alert("password should not be Empty!");
        
        let formData = new FormData();
        formData.append("username",this.state.username);
        formData.append("password",this.state.password);
        const url="http://localhost:8080/login";
        axios.post(url,formData)
        .then(res=> 
            {
                window.location= "/contacts"
                localStorage.setItem("token","hvhsvvaxbcdhb")
            }
        )
        .catch(err=>  alert("invalid credentials")
        );
        

    }
     
    
    render() { 
        return (
            
            <React.Fragment>
                <div className="container-fluid">
                    <div className="jumbotron" id="side">
                        <h1 className="text-center font-weight-light">CONTACTS</h1>
                        <Link className="buy" to='/register'><button  className="btn btn-primary" >SignUp</button></Link>
                    </div>
                </div>
                <div className="container">
                    <form >
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-3">
                                User Name:
                                <input className="form-control" id="username" ref={this.inputRef} name="username" type="text" placeholder="username"
                                onChange={e => this.setState({ username: e.target.value })}/>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                Password:
                                <input className="form-control" id="password" name="password" type="password" placeholder="password"
                                onChange={e => this.setState({ password: e.target.value })}/>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                    <input type="submit" onClick={this.handleSubmit} className="btn btn-primary" value="login"/>
                                </div>
                            </div>
                        </div>
                       
                    </form>
                </div>
                 
                <Footer/>

               
            </React.Fragment>  
           
        );
    }
}
 
export default Login;