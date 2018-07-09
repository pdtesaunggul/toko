import React from 'react';
import axios from 'axios';
import Api from '../Api';

export default class UserDashboard extends React.Component {

  constructor(){
    super();
    this.state = {
      historyUser: [],
    }
    this.getHistoryUser();
  }

  getHistoryUser = () => {
    axios.get(Api+'user/history/'+localStorage.getItem('userId'))
    .then(res => this.setState({
      historyUser: res.data
    }))
    .catch(err => console.log(err))
  }

  detailHistory(id) {
    window.location.replace(`/user/${id}`)
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
              <button className="button-error" onClick={() => window.location.replace('/')}>Logout</button>
            </div>
          </div>
          <div className="section">
            <div className="list-section">
            {
              this.state.historyUser.map((data) => (
                <div className="list-container" key={data.id}>
                  <div className="field">{data.merk}-{data.tipe}</div>
                  <div className="field">{data.harga}</div>
                  <div className="field">Sisa: Rp. {data.sisa}</div>
                  <div className="field">{data.tanggal}</div>
                  <button className="button-regular" onClick={this.detailHistory.bind(this, data.id)}>Detail</button>
                </div>
              ))
            }
            </div>
          </div>
        </div>
      </React.Fragment>
		);
	}
}