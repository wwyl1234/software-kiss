import React from 'react';
import './AddPostForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class AddPostForm extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

   // let xhr = new XMLHttpRequest();
   // xhr.open('POST', 'add/post/');
   // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // Call a function when the state changes.
   // xhr.onreadystatechange = function() { 
    //    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
   //         // Request finished. Do processing here.
    //        let result = JSON.parse(xhr.response)
      //      if (result["success"] === true) {
     //           console.log('User has succesefully added post.')
    //            this.props.close();
  //          } else {
    //            console.warn("Server has failed to add post.");
   //         }
  //      }
   // }
  //  let body = `name=${name}&date=${date}&content=${content}&meta_tags=${metaTags}`;
  //  xhr.send(body);
 // }
    
  /* Opens the add post form. */
  openAddPostForm = () => {
    document.getElementById("addPostForm").style.display = "block";
  }

  /* Closes the add post form. */   
  closeAddPostForm = () => {
    document.getElementById("addPostForm").style.display = "none";
  } 

  textChange = (event) => {
    this.setState(
      function (state) {
        return {
          value: event.target.value
        };
      }
    )
  }

  componentDidMount = () => {
    if (this.props.isVisible) {
      this.openAddPostForm();
    } else {
      this.closeAddPostForm();
    }
  }

  componentDidUpdate = () => {
    if (this.props.isVisible) {
      this.openAddPostForm();
    } else {
      this.closeAddPostForm();
    }
  }

  render(){
    return (
      <div className="form-popup" id="addPostForm">
        <form className='form-container'>
          <h1>Add Post</h1>
      
          <label htmlFor="name"><b>Name</b></label>
          <input type="text" placeholder="Enter Title/Name of the Post" name="name" id="name" required />
      
          <label htmlFor="content"><b>Content</b></label>
          <br></br>
          <textarea value={this.state.value} onChange={this.textChange}
                    rows="10" cols="35" 
                    placeholder="Enter Content in html format" name="content" id="content" required />
          <br></br>

          <label htmlFor="meta-tags"><b>Meta Tags</b></label>
          <input type="text" placeholder="Enter Meta tags in csv format (i.e. happy,UI)" name="meta-tags" id="meta-tags" />
      
          <button type="submit" className="btn" onClick={this.props.submitPost()}>Submit</button>
          <button type="submit" className="btn cancel" onClick={this.props.close()}>Close</button>
        </form>
      </div> 
      ); 
    }

  }
export default AddPostForm;
