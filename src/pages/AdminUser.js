import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class AdminUser extends React.Component {

  constructor() {
    super();
    this.state = {
      toggleForm: false,
      toggleFormUpdate: false,
      username: "",
      password: "",
      userData: [],
      role: "",
    }
    this.getUserData();
  }

  getUserData = () => {
    axios.get(Api+'user')
    .then(res => this.setState({
      userData: res.data
    }))
    .catch(err => console.log(err))
  }

  toggleForm = e => {
    this.setState({
      toggleForm: !this.state.toggleForm,
    });
  }

  handleChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleRoleChange = e => {
    this.setState({
      role: e.target.value
    })
  }

  userOnSubmit = e => {
    e.preventDefault();
    if(this.state.username !== "") {
      const fd = new FormData();
      fd.append('username', this.state.username)
      fd.append('password', this.state.password)
      fd.append('role', this.state.role)
      axios.post(Api+'user/register', fd)
      .then(res => {
        if(res.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
    }
  }

  UserControlForm = () => {
    return(
      <div className={this.state.toggleForm === false ? "modal-form center" : "modal-form center show"}>
        <form onSubmit={this.userOnSubmit} className="form white center">
          <h1>Tambah User</h1>
            <input type="text" className="input-field" placeholder="Input Username" value={this.state.username} onChange={this.handleChange}/>
            <input type="text" className="input-field" placeholder="Input Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            <select className="input-field" onChange={this.handleRoleChange}>
              <option>----</option>
              <option value="2">Admin</option>
              <option value="3">Kasir</option>
              <option value="1">User</option>
            </select>
            <button type="submit" className="button-regular">SUBMIT</button>
        </form>
        <div className="close-form" onClick={this.toggleForm}>
          <span />
        </div>
      </div>
    )
  }

	render() {
		return (
			<React.Fragment>
        <div className="container-full flex">
          <div className="header">
            <div className="title">
              Admin User Dashboard
            </div>
            <div className="button-action">
              <button className="button-regular" onClick={e => this.toggleForm(e)}>Tambah User</button>
              <a href="/login" className="button-error">Logout</a>
            </div>
          </div>
          <div className="header flex-end">
            <a href="/admin/role">User</a>
            <a href="/admin/produk">Product</a>
          </div>
          <div className="section">
            <div className="list-section">
              {
                this.state.userData.map((data, key) => (
                  <div className="list-container" key={key}>
                    <div className="field">{data.username}</div>
                    <div className="field">{data.role}</div>
                    {/* <button className="button-regular" onClick={this.formUpdateHandle}>Update</button> */}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {this.UserControlForm()}
      </React.Fragment>
		)
	}
}