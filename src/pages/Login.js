import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.username !== "" && this.state.password !== "") {
      const fd = new FormData();
      fd.append('username', this.state.username);
      fd.append('password', this.state.password);
      axios.post(Api+'user/login', fd)
      .then(res => {
        if(res.data === "admin") {
          window.location.replace('/admin')
        } else if(res.data === "kasir") {
          window.location.replace('/kasir')
        } else {
          alert("Anda tidak di perkenankan mengakses halaman berikutnya")
        }
      })
      .catch(err => console.log(err))
    } else {
      alert("Username atau password tidak boleh kosong")
    }
  }

	render() {
		return(
      <div className="container-full background-image center">
        <form className="form center white" onSubmit={this.onSubmit}>
          <h1>Login</h1>
          <input type="text" className="input-field" placeholder="Username" value={this.state.username} onChange={this.onChangeUsername}/>
          <input type="password" className="input-field" placeholder="Password" value={this.state.password} onChange={this.onChangePassword}/>
          <button type="submit" className="button-regular">Login</button>
        </form>
      </div>
		);
	}
}