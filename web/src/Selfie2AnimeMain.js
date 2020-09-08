import React, { Component } from 'react';
import "./styles.css";
import './index.css';
import { Spinner, Button } from 'reactstrap'
import $ from 'jquery'
import swal from 'sweetalert'
import createHashHistory from './HashHistory'

var isLoaded=false

class Selfie2AnimeMain extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      image: null
    };

    this.toggle = this.toggle.bind(this);
    this.uploadImage = this.uploadImage.bind(this)
  }

  componentDidMount(){
    $('#upload').submit(function(){
      if(isLoaded){
        $('#notLoading').hide()
        $('#loading').show()
      }
    })

    $('#file_upload').change(function(e){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      if(document.getElementById("image").files.length !== 0 ) isLoaded=true
      reader.onload = function(){
          var thumbnail = new Image();
          thumbnail.src = reader.result;
          thumbnail.onload = function(){
              var canvas = document.createElement('canvas');
              var canvasContext = canvas.getContext("2d");
              canvas.width = 380;
              canvas.height = 400;
              canvasContext.drawImage(this, 0, 0, 400, 400);
              var dataURI = canvas.toDataURL("image/*");
              var imgTag = "<img id='thumbnail' onclick=$('#image').click() src='" + dataURI + "'/>";
              $('#label').css("display", "none");
              $('#image').css("display", "none");
              $('#uploaded_img').html(imgTag);                   
          }
      }
    });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  uploadImage = (e) => {
    e && e.preventDefault();
    if(document.getElementById("image").files.length === 0 ){
      swal("Error", "이미지를 업로드해주세요!", "error")
    }
    else{
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
              if(data === 'error'){
                swal("Error", "얼굴 인식에 실패하였습니다.\n다른 이미지를 업로드해 주세요.", "error")
                $('#notLoading').show()
                $('#loading').hide()
              }
              else{
                console.log("success");
                console.log(data);
                createHashHistory.push('/animeResult')
              }
          }.bind(this)
      });
    }
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
              <p id="ptext">딥러닝 작업이 수행되고 있습니다.<br/> 20초 정도만 기다려주세요.</p>
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
                  <Button color="warning" id="submit" type="submit" size="lg">실행</Button> 
                </form>
            </div>
        </div>
        </header>
      </div>
    );
  }
}

export default Selfie2AnimeMain;