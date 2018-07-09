import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class User extends React.Component {

  constructor() {
    super()
    this.state = {
      data: [],
      userId: "",
    }
  }

  handleUserIdChange = e => {
    this.setState({
      userId: e.target.value
    })
  }

  getUserData = () => {
    axios.get(Api+'user/'+this.state.userId)
    .then(res => {
      console.log(res);
      if(res.data === 1) {
        localStorage.setItem('userId', this.state.userId)
        window.location.replace('/users')
      } else if(res.data === 0) {
        console.log("User Not Found");
      }
    })
    .catch(err => console.log(err))
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.userId !== "") {
      this.getUserData()
    } else {
      console.log("Kosong")
    }
  }

	render() {
		return(
			<div className="container-full background-image center">
        <form className="form center" onSubmit={this.onSubmit}>
          <input type="text" className="input-field" placeholder="Input Username Id Here" value={this.state.userId} onChange={this.handleUserIdChange}/>
          <button type="submit" className="button-regular">Submit</button>
        </form>
      </div>
		);
	}
}