import React, { Component } from 'react';
import  "./Styles.css" ;
import GoogleContacts from 'react-google-contacts';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import Footer from './footer';
class Contacts extends Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token === null){
            loggedIn = false
        }
        let loggedOut=false;
        this.state = {
            isclicked : false,
            username: '',
            contacts: [],
            loggedIn,
            loggedOut
        }

    }
   
    insertToDb(name,email){
        let formData = new FormData();
        formData.append("username",name);
        formData.append("email",email);
        const url="http://localhost:8080/insert";
        axios.post(url,formData)
        .then(res=> console.log(res.data))
        .catch(err=> console.log(err));
    }
    responseCallback = (response) => {
        this.setState({ contacts: response })
        this.state.contacts.map((contact) => (
        this.insertToDb(contact.title,contact.email)

        
        ))
    }

    handleSubmit = e => {
        this.setState({isclicked: true});
        e.preventDefault();
        console.log(this.state.username.length);
        if(this.state.username.length!==0){
            const url = "http://localhost:8080/searchContact";
            axios.get(url,{
                params: {
                username: this.state.username
                }
            }).then(response => response.data)
            .then((data) => {
                this.setState({ contacts: data })
                console.log(this.state.contacts)
                })
        }
        else{
            const url = "http://localhost:8080/getAllContacts";
            axios.get(url,{
            }).then(response => response.data)
            .then((data) => {
                this.setState({ contacts: data })
                console.log(this.state.contacts)
                })
        }
    }

    handleInput = e =>{
        this.setState({isclicked: true});
        const url = "http://localhost:8080/searchContact";
            axios.get(url,{
                params: {
                username: e.target.value
                }
            }).then(response => response.data)
            .then((data) => {
                this.setState({ contacts: data })
                console.log(this.state.contacts)
                })
        
    }

    handleLog = e =>{
        localStorage.removeItem("token")
        this.setState({loggedOut : true})
        
    }

    render() { 
        
        if(this.state.loggedIn === false ||this.state.loggedOut === true){
            return <Redirect to="/" />
        }

        if(!this.state.isclicked ){
            return ( 
                <React.Fragment>
                    <div className="container">
                        <div className="jumbotron" id="side">
                            <div class="row ">
                                <div class="col-md-4"><h1 className="text-center">CONTACTS</h1> </div>
                                <div class="col-md-4"><button id="buy1" onClick={this.handleSubmit}  className="btn btn-outline-info">View All Contacts</button></div>
                                <div class="col-md-4"><button onClick={this.handleLog} id="buy2" className="btn btn-primary" >LogOut</button></div>
                            </div>
                            <br></br>
                            <div class="row">
                            <input type="text" id="username" name="username" className="form-control" placeholder="Search for..."
                              onChange={e => this.setState({ username: e.target.value })} /><br></br>
                            </div>
                            <br></br>
                            <div class="row">
                            <button onClick={this.handleSubmit} className="btn btn-primary" >Search</button>
                            </div>
                            <br></br> 
                            <br></br>
                            <h5  className="foo"><kbd>Click the Below button to  Import your contacts from Google</kbd>
                            
                            <center>
                            <br></br>
                            <GoogleContacts
                            clientId="933016618909-hlge4jpkghovh7a64eoh50r0rv092jel.apps.googleusercontent.com"
                            buttonText=""
                            onSuccess={this.responseCallback}
                            onFailure={this.responseCallback}
                            /></center>
                            </h5>
                            
                        </div>
                        <div>
                            
                            <h4><center><kbd>Select the letter to display contacts starting with it!</kbd></center></h4>
                            <center><div className="keyboardRow">
                                <button value="a" onClick={this.handleInput} className="btn btn-warning">a</button>
                                <button value="b"  onClick={this.handleInput} className="btn btn-warning">b</button>
                                <button value="c"  onClick={this.handleInput} className="btn btn-warning">c</button>
                                <button value="d"  onClick={this.handleInput} className="btn btn-warning">d</button>
                                <button value="e"  onClick={this.handleInput} className="btn btn-warning">e</button>
                                <button value="f"  onClick={this.handleInput} className="btn btn-warning">f</button>
                                <button value="g"  onClick={this.handleInput} className="btn btn-warning">g</button>
                                <button value="h"  onClick={this.handleInput} className="btn btn-warning">h</button>
                                <button value="i"  onClick={this.handleInput} className="btn btn-warning">i</button>
                                <button value="j"  onClick={this.handleInput} className="btn btn-warning">j</button>
                                <button value="k"  onClick={this.handleInput} className="btn btn-warning">k</button>
                                <button value="l"  onClick={this.handleInput} className="btn btn-warning">l</button>
                                <button value="m"  onClick={this.handleInput} className="btn btn-warning">m</button>
                                <button value="n"  onClick={this.handleInput} className="btn btn-warning">n</button>
                                <button value="o"  onClick={this.handleInput} className="btn btn-warning">o</button>
                                <button value="p"  onClick={this.handleInput} className="btn btn-warning">p</button>
                                <button value="q"  onClick={this.handleInput} className="btn btn-warning">q</button>
                                <button value="r"  onClick={this.handleInput} className="btn btn-warning">r</button>
                                <button value="s"  onClick={this.handleInput}className="btn btn-warning">s</button>
                                <button value="t"  onClick={this.handleInput} className="btn btn-warning">t</button>
                                <button value="u"  onClick={this.handleInput} className="btn btn-warning">u</button>
                                <button value="v"  onClick={this.handleInput} className="btn btn-warning">v</button>
                                <button value="w"  onClick={this.handleInput} className="btn btn-warning">w</button>
                                <button value="x"  onClick={this.handleInput} className="btn btn-warning">x</button>
                                <button value="y"  onClick={this.handleInput} className="btn btn-warning">y</button>
                                <button value="z"  onClick={this.handleInput} className="btn btn-warning">z</button> 
                                
                            </div></center>
                        </div>
                    </div>
                    <Footer/>
                </React.Fragment>
            );

        }
        
        else{
            return ( 
                <React.Fragment>
                    <div className="container-fluid">
                        <div className="jumbotron" id="side">
                            <h1 className="text-center font-weight-light">CONTACTS</h1>
                            <button onClick={this.handleLog} id="buy2" className="btn btn-primary" >LogOut</button>
                            <br></br><marquee behavior="scroll" direction="left"><h2>Here are your contacts!</h2></marquee>

                        </div>
                    </div>
                    <div className="container-fluid">
                        <table border='1' width='100%' >
                        <thead>
                                <tr>
                                    <th>UserName</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contacts.map((contact) => (
                                    
                                <tr>
                                    <td>{ contact.username }</td>
                                    <td >{ contact.email }</td>
                                    <td >{ contact.phone }</td>

                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer/>
                </React.Fragment>
            );
        }
    }
}
 
export default Contacts;