import React from 'react';
import axios from 'axios';
import Api from '../Api';


export default class AdminProduct extends React.Component {

  constructor() {
    super();
    this.state = {
      toggleForm: false,
      dataMerk: [],
      dataProduk: [],
      tipe: "",
      harga: "",
      merk: "",
    };
    this.getMerk();
    this.getProduk()
  }

  getMerk = () => {
    axios.get(Api+'brand')
    .then(res => this.setState({
      dataMerk: res.data
    }))
    .catch(err => console.log(err))
  }

  getProduk = () => {
    axios.get(Api+'produk')
    .then(res => this.setState({
      dataProduk: res.data
    }))
    .catch(err => console.log(err))
  }

  toggleForm = e => {
    this.setState({
      toggleForm: !this.state.toggleForm
    });
  }

  handleMerkChange = e => {
    this.setState({
      merk: e.target.value
    })
  }

  handleTipeChange = e => {
    this.setState({
      tipe: e.target.value
    })
  }

  handleHargaChange = e => {
    this.setState({
      harga: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.merk !== "" || this.state.tipe !== "" || this.state.harga !== "") {
      const fd = new FormData();
      fd.append('brand_id', this.state.merk);
      fd.append('type', this.state.tipe);
      fd.append('harga', this.state.harga);
      axios.post(Api+'produk/add', fd)
      .then(res => {
        if(res.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
    }
  }

  ProductControlForm = () => {
    return(
      <div className={this.state.toggleForm === false ? "modal-form center" : "modal-form center show"}>
        <form className="form white center" onSubmit={this.onSubmit}>
          <h1>Tambah Produk</h1>
          <select className="input-field" placeholder="Masukan Merk Produk" onChange={this.handleMerkChange}>
              <option>--------------------------</option>
              {
                this.state.dataMerk.map((data, key) => (
                  <option value={data.id} key={key}>{data.name}</option>
                ))
              }
          </select>
          <input type="text" className="input-field" placeholder="Masukan Tipe Produk" value={this.state.tipe} onChange={this.handleTipeChange}/>
          <input type="text" className="input-field" placeholder="Masukan Harga Produk" value={this.state.harga} onChange={this.handleHargaChange}/>
          <button type="submit" className="button-regular">SUBMIT</button>
        </form>
        <div className="close-form" onClick={e => this.toggleForm(e)}>
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
              Admin Produk Dashboard
            </div>
            <div className="button-action">
              <button className="button-regular" onClick={this.toggleForm}>Tambah Produk</button>
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
              this.state.dataProduk.map((data, key) => (
                <div className="list-container" key={key}>
                  <div className="field">{data.merk} - {data.tipe}</div>
                  <div className="field">{data.harga}</div>
                </div>
              ))
            }
            </div>
          </div>
        </div>
        {this.ProductControlForm()}
      </React.Fragment>
		)
	}
}