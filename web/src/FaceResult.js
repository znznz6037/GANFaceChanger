import React, { Component } from 'react';
import { Button } from 'reactstrap'
import $ from 'jquery'

class FaceResult extends Component{
  constructor(props) {
    super(props)
    this.state = {
      imgData : null
    }
  }

  componentDidMount(){
    $.ajax({
      type:'GET',
      url: 'https://psbgrad.duckdns.org:5000/result',
      success:function(data){
          console.log("success");
          console.log(data);
          this.setState({imgData:data['img']})
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
            <div id="border_title">
              <h1 id="title">결과</h1>
            </div>
            <img src={'data:image/jpg;base64,' + this.state.imgData}/>
            <div>
              <form action="https://psbgrad.duckdns.org:5000/faceDownload" method="POST" encType="multipart/form-data">
                <Button id="submit" color="warning" type="submit" size="lg">이미지 다운로드하기</Button>
              </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default FaceResult;