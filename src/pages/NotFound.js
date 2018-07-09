import React from 'react';

export default class NotFound extends React.Component {
	render() {
		return (
			<div className="container-full background-image center">
        <h1 style={{color: "#fff"}}>Page Not Found :( ...</h1>
        <a href="/" style={{color: "#fff"}}>Back to Home</a>
      </div>
		)
	}
}
