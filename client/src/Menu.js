import React from 'react';
import './Menu.css';
import Navbar from 'react-bootstrap/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';


class Menu extends React.Component {
    render() {
        return (
            <div id='navbar-container'>
                <Navbar className='topnav'>
                    
                        <button id='home' className='btn' onClick={this.props.onClick()}>Home</button>
                        <button id='about' className='btn' onClick={this.props.onClick()}>About</button>
                        <button id='login' className='btn' onClick={this.props.onClick()}>Login</button>
                        <button className='btn' onClick={this.props.onClick()}>
                            <span 
                            className={this.props.isAuthorized ? 'isAuth' : 'needAuth'}  
                            id='addPost'>Add Post</span>
                        </button>
                    
                </Navbar>
            </div>
        );
    }
}

export default Menu;