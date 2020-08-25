import React, { Component } from 'react';
import "./styles.css";
import './index.css';
import { Spinner, Button } from 'reactstrap'
import { BrowserRouter as Redirect, withRouter} from 'react-router-dom'
import $ from 'jquery'

class Selfie2AnimeMain extends Component{
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      redirect:false
    };

    this.toggle = this.toggle.bind(this);
    this.uploadImage = this.uploadImage.bind(this)
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  uploadImage = (e) => {
    e && e.preventDefault();
    let formData = new FormData(e.target)
    console.log(formData)

    $.ajax({
        type:'POST',
        url: 'https://psbgrad.duckdns.org:5000/uploadAnime',
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        success:function(data){
            console.log("success");
            console.log(data);
            this.setState({redirect:true})
            this.setState({image:data['img']})
            this.props.history.push('/animeResult', {data})
        }.bind(this),
        error: function(data){
            console.log("error");
            console.log(data);
        }
    });
}

  render() {
    return (
      <div>
        <header className="App-header">
          <div id="border">
            <div className="loading" id = "loading">
              <div>
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="danger" />
                <Spinner type="grow" color="warning" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="dark" />
              </div>
              <p id="ptext">딥러닝 작업이 수행되고 있습니다. 20초 정도만 기다려주세요.</p>
            </div>
            <div id="notLoading">
                <form id="upload" onSubmit={this.uploadImage.bind(this)} action="https://psbgrad.duckdns.org:5000/uploadAnime" method="POST" encType="multipart/form-data">
                  <div id="border_title">
                      <h1 id="title">Selfie2Anime</h1>
                  </div>
                  <div id = "file_upload">
                       <label htmlFor="file" id="label">클릭해서 이미지를 업로드 해주세요.</label>
                      <input type="file" name="file" id="image" accept="image/*"/>
                      <div id ="uploaded_img"></div>
                  </div>
                  <Button color="secondary" id="submit" type="submit" size="lg">실행</Button> 
                </form>
                <br></br>
                <p id="ptext">개발중입니다....</p>
            </div>
        </div>
        </header>
      </div>
    );
  }
}

export default withRouter(Selfie2AnimeMain);