import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class UserDashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      toggleForm: false,
      historyUser: [],
      total: "",
      file: null,
      transaction_id: this.props.match.params.id,
    }
    this.getHistoryUser();
  }

  getHistoryUser = () => {
    axios.get(Api+'user/history/'+localStorage.getItem('userId')+'/detail')
    .then(res => this.setState({
      historyUser: res.data
    }))
    .catch(err => console.log(err))
  }

  toggleForm = e => {
    this.setState({
      toggleForm: !this.state.toggleForm
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if(this.state.total !== "" || this.state.file !== null) {
      const fd = new FormData();
      fd.append('transaction_id', this.state.transaction_id);
      fd.append('buktitf', this.state.file);
      fd.append('jumlah', this.state.total);
      axios.post(Api+'/upload',fd)
      .then(res => {
        if(res.status === 200) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
    }
  }

  handleTotalChange = e => {
    this.setState({
      total: e.target.value
    })
  }

  fileonChange = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

	render() {
		return(
      <React.Fragment>
  			<div className="container-full flex">
          <div className="header">
            <div className="title">
              User Dashboard
            </div>
            <div className="button-action">
              <button className="button-regular" onClick={this.toggleForm}>Add</button>
              <button className="button-error" onClick={() => window.location.replace('/')}>Logout</button>
            </div>
          </div>
          <div className="section">
            <div className="list-section">
            {
              this.state.historyUser.map((data, key) => (
                <div className="list-container" key={key}>
                  <div className="field">{data.merk}-{data.tipe}</div>
                  <div className="field">{data.jumlah}</div>
                  <div className="field">{data.tanggal}</div>
                </div>
              ))
            }
            </div>
          </div>
        </div>
        <div className={this.state.toggleForm === false ? "modal-form center" : "modal-form center show"}>
          <form className="form white center" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <h1>Add Transaction</h1>
            <input type="text" className="input-field" placeholder="Masukan Total Pembayaran" value={this.state.total} onChange={this.handleTotalChange}/>
            <input type="file" className="input-field" placeholder="Masukan Pembayaran" onChange={this.fileonChange}/>
            <button type="submit" className="button-regular">SUBMIT</button>
          </form>
          <div className="close-form" onClick={this.toggleForm}>
            <span />
          </div>
        </div>
      </React.Fragment>
		);
	}
}