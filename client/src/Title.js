import React from 'react';
import './Title.css';


class Title extends React.Component {

    render() {
        return (
            <div id='blog-title-container'> 
                <div id='blog-title'>
                    <h1>Software <span>KISS</span></h1>
                </div>
            </div>
        );
    }
}

export default Title;