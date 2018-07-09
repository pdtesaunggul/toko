import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class Kasir extends React.Component {

  constructor() {
    super();
    this.state = {
      toggleForm: false,
      toggleFormUser: false,
      dataTransaksi: [],
      dataUser: [],
      dataProduk: [],
      user_id: null,
      produk: null,
      username: "",
    }
    this.getTransaksi();
    this.getProduk();
    this.getUser();
  }

  getTransaksi = () => {
    axios.get(Api+'user/history/')
    .then(res => {
      this.setState({
        dataTransaksi: res.data
      })
    })
    .catch(err => console.log(err))
  }

  getUser = () => {
    axios.get(Api+'user')
    .then(res => {
      this.setState({
        dataUser: res.data,
        user_id: res.data[0].id
      })
    })
    .catch(err => console.log(err))
  }

  getProduk = () => {
    axios.get(Api+'produk')
    .then(res => {
      this.setState({
        dataProduk: res.data,
        produk: res.data[0].id
      })
    })
    .catch(err => console.log(err))
  }

  handleUserChange = e => {
    this.setState({
      user_id: e.target.value
    });
  }

  handleProdukChange = e => {
    this.setState({
      produk: e.target.value
    });
  }

  handlePostTransaksi = e => {
    const fd = new FormData();
    fd.append('user_id', this.state.user_id);
    fd.append('item_id', this.state.produk);
    axios.post(Api+'transaksi/new', fd)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }

  handlePostUser = e => {
    if(this.state.username !== "") {
      const fd = new FormData();
      fd.append('username', this.state.username);
      axios.post(Api+'user/register', fd)
      .then(res => {
        window.location.reload()
      })
      .catch(err => console.log(err)) 
    } else {
      console.log("Username Kosong Bapak")
    }
  }

  handleUsername = e => {
    this.setState({
      username: e.target.value
    });
  }

  toggleForm = e => {
    this.setState({
      toggleForm: !this.state.toggleForm,
    });
  }

  toggleFormUser = e => {
    this.setState({
      toggleFormUser: !this.state.toggleFormUser,
    });
  }

  render() {
    return(
      <React.Fragment>
        <div className="container-full flex">
          <div className="header">
            <div className="title">
              Kasir Dashboard
            </div>
            <div className="button-action">
              <button className="button-regular" onClick={e => this.toggleFormUser(e)}>+ User</button>
              <button className="button-regular" onClick={e => this.toggleForm(e)}>+ Transaksi</button>
              <a href="/login" className="button-error">Logout</a>
            </div>
          </div>
          <div className="section">
            <div className="list-section">
              {
                this.state.dataTransaksi.map((data, key) => {
                  return (
                    <div className="list-container" key={key}>
                      <div className="field">{data.id}</div>
                      <div className="field">{data.username}</div>
                      <div className="field">Rp. {data.harga}</div>
                      <div className="field">{data.tanggal}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div className={this.state.toggleForm === false ? "modal-form center" : "modal-form center show"}>
          <div className="form white center">
            <h1>Tambah Transaksi</h1>
            <select className="input-field" onChange={this.handleUserChange}>
              {
                this.state.dataUser.map((res, key) => <option value={res.id} key={key}>{res.username}</option>)
              }
            </select>
            <select className="input-field" onChange={this.handleProdukChange}>
              {
                this.state.dataProduk.map((res, key) => <option value={res.id} key={key}>{res.merk} - {res.tipe}</option>)
              }
            </select>
            <button className="button-regular" onClick={this.handlePostTransaksi}>SUBMIT</button>
          </div>
          <div className="close-form" onClick={e => this.toggleForm(e)}>
            <span />
          </div>
        </div>

        <div className={this.state.toggleFormUser === false ? "modal-form center" : "modal-form center show"}>
          <div className="form white center">
            <h1>Tambah Transaksi</h1>
            <input type="text" className="input-field" placeholder="Input Username" value={this.state.username} onChange={this.handleUsername}/>
            <button className="button-regular" onClick={this.handlePostUser}>SUBMIT</button>
          </div>
          <div className="close-form" onClick={e => this.toggleFormUser(e)}>
            <span />
          </div>
        </div>
      </React.Fragment>
    );
  }
}