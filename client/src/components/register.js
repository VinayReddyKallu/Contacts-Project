import React, { Component } from 'react';
import  "./Styles.css" ;
import Footer from './footer' ;
import axios from 'axios';
class Register extends Component {

    constructor(props){
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            username: '',
            password: '',
            Confirmpassword: '',
            email: '',
            phone: '',
            emailError:'' ,
            passwordError:'',  
            confirmpasswordError:'',
            usernameError:'',
            phoneError:''
    
        }

    }

    componentDidMount(){
        this.inputRef.current.focus();
    }
    
    validRegister(){
        if(!this.state.email.includes("@")){
            this.setState({emailError:"Invalid email address"})
            return false;   
        }
        if(this.state.password.length <= 5){
            this.setState({passwordError:"Password should be atleast 6 characters!"})
            return false;   
        }
        if(this.state.password!==this.state.Confirmpassword){
            this.setState({confirmpasswordError:"Password and Confirm password doest not match"})
            return false;   
        }
        if(this.state.phone.length!==10){
            this.setState({phoneError:"Phone number should be 10 digits"})
            return false;   
        }
        return true;
    }
    handleSubmit(){
        console.log("going");
        if(this.validRegister()){
            console.log("validated");
            let formData = new FormData();
            formData.append("username",this.state.username);
            formData.append("password",this.state.password);
            formData.append("Confirmpassword",this.state.Confirmpassword);
            formData.append("email",this.state.email);
            formData.append("phone",this.state.phone);
            const url="http://localhost:8080/register";
            axios.post(url,formData)
            .then(res=> {
                window.location= "/contacts"
                console.log("going")
                localStorage.setItem("token","hvhsvvaxbcdhb")
            }
            )
            .catch(err=>{
                window.location= "/register"
                console.log("not going")
            } 
           );
        }


    }
     
     render() { 
         return (  
            <React.Fragment>
                <div className="container-fluid">
                    <div className="jumbotron" id="side">
                        <h1 className="text-center font-weight-light">CONTACTS</h1>
                    </div>
                </div>
                <div className="container">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-xs-3">
                                User Name:
                                <input className="form-control" id="username" name="username"  ref={this.inputRef} type="text" placeholder="username"
                                onChange={e => this.setState({ username: e.target.value })} />
                                <p style={{color:"red",fontSize:"16px"}}>{this.state.usernameError}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                Password:
                                <input className="form-control" id="password" name="password" type="password" placeholder="password"
                                 onChange={e => this.setState({ password: e.target.value })}/>
                                  <p style={{color:"red",fontSize:"16px"}}>{this.state.passwordError}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                Confirm Password:
                                <input className="form-control" id="Confirmpassword" name="Confirmpassword" type="password" placeholder="password"
                                 onChange={e => this.setState({ Confirmpassword: e.target.value })}/>
                                  <p style={{color:"red",fontSize:"16px"}}>{this.state.confirmpasswordError}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                EMAIL:
                                <input className="form-control" id="email" name="email" type="email" placeholder="Email"
                                 onChange={e => this.setState({ email: e.target.value })}/>
                                 <p style={{color:"red",fontSize:"16px"}}>{this.state.emailError}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                PHONE:
                                <input className="form-control" id="phone" name="phone" type="tel" placeholder="phone"
                                 onChange={e => this.setState({ phone: e.target.value })}/>
                                  <p style={{color:"red",fontSize:"16px"}}>{this.state.phoneError}</p>
                                </div>
                            </div>
                            <br></br>
                            <div className="row">
                                <div className="col-xs-3">
                                    <input type="submit" onClick={()=>{this.handleSubmit()}} className="btn btn-primary" value="CREATE"/>
                                </div>
                            </div>
                        </div>
                       
                    
                </div>
                
                <Footer/>

            </React.Fragment>  
           
         );
     }
 }
  
 export default Register;
 
