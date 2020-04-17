import React from 'react';
import './LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class LoginForm extends React.Component{
    /* Opens the login form. */
    openLoginForm = () => {
        document.getElementById("loginForm").style.display = "block";
    }

    /* Closes the login form. */   
    closeLoginForm = () => {
        document.getElementById("loginForm").style.display = "none";
    }
    
    componentDidMount = () => {
        if (this.props.isVisible) {
            this.openLoginForm();
        } else {
            this.closeLoginForm();
        }
    }

    componentDidUpdate = () => {
        if (this.props.isVisible) {
            this.openLoginForm();
        } else {
            this.closeLoginForm();
        }
    }

    render(){
        return (
            <div className="form-popup" id="loginForm">
                <form className="form-container">
                <h1>Login</h1>
            
                <label htmlFor="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required />
            
                <label htmlFor="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" id="psw" required /> 
            
                <button type="submit" className="btn" onClick={this.props.checkCredentials()} >Login</button>
                <button type="submit" className="btn cancel" onClick={this.props.close()}>Close</button>
                </form>
          </div>
        );
    }
}

export default LoginForm;


