import React from 'react';
import {Button} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import './Content.css';

const ABOUTINFO = (
    <div id='aboutInfo'>
        <h2>About</h2>
        <p>This blog is intended to be about software and software-related things. I believe
        in the KISS principle which stands for Keep It Simple Stupid.</p>
    </div>);
 
class Content extends React.Component {
    constructor(props){
        super(props);
        this.state =  {
            data: [],
            pageNum: 0
        };
        this.parseJSON = this.parseJSON.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.updateState = this.updateState.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    /* Format Date assuming date is a string in the format YYYY-MM-DDTHH:MM:SS:SSZ (i.e. 2020-03-30T04:00:00.000Z) */
    formatDate = (inputDate) => {
    let array = inputDate.split('T');
    let resultDate = array[0];
    let resultTime = array[1].slice(0, 8); 
    return {
        'date': resultDate,
        'time': resultTime
        }
    }

    updateState = (newData) => {
        this.setState({
            data: newData
        });
    }
    
    parseJSON = (response) => {
        return response.text() ? JSON.parse(response) : null
    }

    // this loads the first ten posts in blog
    getPosts = () => {
        let url = `posts/recent/0/${this.props.maxPostsPerFetch}`;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({data: result});
                },
                (err) => {
                    console.log('Fetch Error :-S', err);
                });
    }

    fetchMoreData = () => {
        let newPageNum = this.state.pageNum + 1;
        let url = `posts/recent/${newPageNum * this.props.maxPostsPerFetch}/${this.props.maxPostsPerFetch}`;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    let newData = this.state.data.slice();
                    newData = newData.concat(result);
                    console.log(result, newData);
                    this.setState({
                        data: newData, 
                        pageNum: newPageNum});
                },
                (err) => {
                    console.log('Fetch Error :-S', err);
                });
        
    }
    
    componentDidMount = () => {
        if (this.props.display === 'posts'){
            this.getPosts();
        }
        console.log("DEBUG component Did mount", this.state.data, this.props.display );
    }

    componentDidUpdate = (prevProps) => {
    
       if (prevProps.display !== this.props.display && this.props.display === "posts") {
           this.getPosts();
       }
        console.log("DEBUG component did update", this.state.data, this.props.display );
    }

    renderPosts = () => {
        let posts = [];
        for (let i = 0; i < this.state.data.length; i++){
            let metaTags = this.state.data[i].meta_tags.split(',');
            let formattedDate = this.formatDate(this.state.data[i].date);
            let output = {__html: this.state.data[i].content}
            posts.push(
                <div className='post' key={this.state.data[i].name}>
                    <h2>{this.state.data[i].name}</h2>
                    <time dateTime={this.state.data[i].date}>{formattedDate.date} at {formattedDate.time}</time>
                    <div className='content' 
                        dangerouslySetInnerHTML={output}>
                    </div>
                    <div className='meta-tags'>
                        <h5>Meta tags:</h5>
                        {metaTags.map((metaTag) => {
                            return <Button disabled variant='outline-primary' key={metaTag}>{metaTag}</Button>
                        })}
                    </div>
                </div>
            )
        }
        return ( 
            <InfiniteScroll
                dataLength={this.state.data.length}
                next={this.fetchMoreData}
                hasMore={this.props.totalPosts - this.state.data.length  >  0 ? true: false}
                loader={<h4>Loading...</h4>}>{posts}
            </InfiniteScroll>
          );
    }

    render = () =>{
        return (
        <div id='content-container'>
            { this.props.display !== 'posts' ?  ABOUTINFO : this.renderPosts()}
        </div>
        );
    }
}

export default Content;