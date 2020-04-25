import React from 'react';
import ReactDOM from 'react-dom';
import Title from './Title';
import Menu from './Menu';
import Content from './Content';
import LoginForm from './LoginForm';
import AddPostForm from './AddPostForm';
import './index.css';


class BlogApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAuthorized : false,
            display: 'posts',
            menuId: 'home',
            visibleLoginForm: false,
            visibleAddPostForm: false,
            totalPosts: 0,
            maxPostsPerFetch: 10
        }
    }
    /* Handle menu click */
    handleMenuClick = (event) => {
        let id = event.target.id;
        let newDisplay = this.state.display
        let newVisibleLoginForm = this.state.visibleLoginForm;
        let newVisibleAddPostForm = this.state.visibleAddPostForm;
        if (id === 'home') {
            newDisplay = 'posts';
        } 
        if (id  === 'about'){
            newDisplay = 'about';
        }

        if (id === 'login'){
            newVisibleLoginForm = true;
        }

        if (id === 'addPost' && this.state.isAuthorized){
            newVisibleAddPostForm = true;
        }

        this.setState(
            function (state, props){
                return {
                        menuId: id,
                        display: newDisplay,
                        visibleLoginForm: newVisibleLoginForm,
                        visibleAddPostForm: newVisibleAddPostForm,
                    }
                }
            );
        
    }
    /* Gets the total number of Posts  in the blog */
    getTotalPosts = () => {
        let url = 'posts/total/';
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({totalPosts : result[0]['exact_count']});
                },
                (err) => {
                    console.log('Fetch Error :-S', err);
                });
    }

    /* Opens the add post form. */
    openAddPostForm = () => {
        this.setState(
            function (state, props){
                return {
                        visibleAddPostForm: true,
                    }
                }
            );
    }

    /* Closes the add post form. */   
    closeAddPostForm = (event) => {
        event.preventDefault();
        this.setState(
            function (state, props){
                return {
                        visibleAddPostForm: false,
                    }
                }
            );
    } 

    /* Opens the login form. */
    openLoginForm = () => {
        this.setState(
            function (state, props){
                return {
                        visibleLoginForm: true,
                    }
                }
            );
    }

    /* Closes the login form. */   
    closeLoginForm = (event) => {
        event.preventDefault();
        this.setState(
            function (state, props){
                return {
                        visibleLoginForm: false,
                    }
                }
            );
    }

    /* Get information from addPost form and sends to server */
    submitPost = (event) => {
        event.preventDefault();
        // Get values from the add Post form
        let name = document.getElementById('name').value
        let content = document.getElementById('content').value
        let metaTags = document.getElementById('meta-tags').value
        let date =  new Date().toJSON();

        let payload = {
        name: name,
        date: date,
        content: content,
        meta_tags: metaTags
        }

        let data = JSON.stringify(payload);
        let url = 'add/post/';
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: data  
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result["success"] === true) {
                        console.log('User has succesefully added post.')
                        this.setState(
                            function (state, props){
                                return {
                                        visibleAddPostForm: false,
                                        }
                            }
                        );
                    } else {
                        console.warn("Server has failed to add post.");
                    }
                },
                (err) => {
                    console.log('Fetch Error :-S', err);
                });
        }
        

    /* Get information from login form and sends to server to check. */
    checkCredentials = (event) => {
        event.preventDefault();
        // Get values from the login form
        let email = document.getElementById('email').value
        let psw = document.getElementById('psw').value
        let payload = {
            email: email,
            psw: psw
        }
        let data = JSON.stringify(payload);
        let url = 'auth/';
        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: data  
         })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result["success"] === true) {
                        console.log('User has succesefully logined.')
                        this.setState(
                            function (state, props){
                                return {
                                        visibleLoginForm: false,
                                        isAuthorized : true,
                                        }
                            }
                        );
                    } else {
                        console.warn("User has entered incorrect credentials");
                    }
                },
                (err) => {
                    console.log('Fetch Error :-S', err);
                });
            }

    componentDidMount = () =>{
        this.getTotalPosts(); 
        console.log(`Blog mounted:`, this.state)
    } 
            
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState != this.state)
            console.log('debiug', this.state) 
    
    }

    render(){
        return (
            <div id='blog-app-container' className='flex-container'> 
                <Title />
                <Menu 
                    isAuthorized={this.state.isAuthorized} 
                    onClick={()=>this.handleMenuClick}    
                    />
                <div id='main-container' className='flex-container'>
                    <div id='filler-left'>
                    </div>
                    <Content 
                        display={this.state.display}
                        totalPosts={this.state.totalPosts}
                        maxPostsPerFetch={this.state.maxPostsPerFetch}/>
                    <div id='filler-right'>
                    </div>
                </div>
                <LoginForm 
                    isVisible={this.state.visibleLoginForm} 
                    checkCredentials={() => this.checkCredentials}
                    close={() => this.closeLoginForm}
                    />
                <AddPostForm 
                    isVisible={this.state.visibleAddPostForm}
                    submitPost={() => this.submitPost}
                    close={() => this.closeAddPostForm}
                    />
            </div>
        );
    }
}






// ==================================
ReactDOM.render(
    <BlogApp />,
    document.getElementById('root')
  );
