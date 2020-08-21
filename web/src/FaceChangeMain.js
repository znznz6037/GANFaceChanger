import React, { Component } from 'react';
import "./styles.css";
import './index.css';
import { Spinner, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { BrowserRouter as Redirect, withRouter} from 'react-router-dom'
import $ from 'jquery'

class FaceChangeMain extends Component{
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      innerText: '스타일 선택',
      image: null,
      redirect:false
    };

    this.toggle = this.toggle.bind(this);
    this.uploadImage = this.uploadImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  uploadImage = (e) => {
      e && e.preventDefault();
      let formData = new FormData(e.target)
      formData.append('style', this.state.innerText)
      console.log(formData)

      $.ajax({
          type:'POST',
          url: 'https://psbgrad.duckdns.org:5000/upload',
          data:formData,
          cache:false,
          contentType: false,
          processData: false,
          success:function(data){
              console.log("success");
              console.log(data);
              this.setState({redirect:true})
              this.setState({image:data['img']})
              this.props.history.push('/faceResult', {data})
          }.bind(this),
          error: function(data){
              console.log("error");
              console.log(data);
          }
      });
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = event => {
    this.setState({
      innerText: event.target.name
    })
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
                  <p id="ptext">10초 정도만 기다려주세요</p>
                  <p id="ptext">딥러닝 작업이 수행되고 있습니다.</p>
                  
                </div>
                <div id="notLoading">
                <form id="upload" name="style" onSubmit={this.uploadImage.bind(this)} value={this.state.innerText} action="https://psbgrad.duckdns.org:5000/upload" method="POST" encType="multipart/form-data">
                      <div id="border_title">
                          <h1 id="title">페이스 체인지</h1>
                      </div>
                      <div id = "file_upload">
                          <label htmlFor="file" id="label">클릭해서 이미지를 업로드 해주세요.</label>
                          <input type="file" name="file" id="image" accept="image/*"/>
                          <div id ="uploaded_img"></div>
                      </div>              
                          <Dropdown id="faceStyle" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle color="warning" caret className="dropdown-toggle">
                              {this.state.innerText}
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={this.handleChange} name="하얀 피부">하얀 피부</DropdownItem>
                              <DropdownItem onClick={this.handleChange} name="염소 수염">염소 수염</DropdownItem>
                              <DropdownItem onClick={this.handleChange} name="안경">안경</DropdownItem>
                              <DropdownItem onClick={this.handleChange} name="미소">미소</DropdownItem>
                              <DropdownItem onClick={this.handleChange} name="화장">화장</DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                      <Button color="secondary" id="submit" type="submit" size="lg">실행</Button>{' '}
                    </form>
                </div>
            </div>
            </header>
          </div>
        );
      }
  
}

export default withRouter(FaceChangeMain);