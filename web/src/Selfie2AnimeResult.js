import React, { Component } from 'react';
import { Button } from 'reactstrap'

class Selfie2AnimeResult extends Component{
  constructor(props) {
    super(props);
    console.log('result')
    console.log(this.props.location.state.data)
  }

  base64ToImage(){
    var base64_string=this.props.location.state.data
    var img = document.createElement("img")
    img.src = "data:image/jpg;base64" + base64_string
    return <img src='"data:image/jpg;base64" + base64_string'></img> 
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <div id="border">
            <div id="border_title">
              <h1 id="title">결과</h1>
            </div>
            <img src={'data:image/jpg;base64,' + this.props.location.state.data["img"]}/>
            <div>
              <form action="https://psbgrad.duckdns.org:5000/animeDownload" method="POST" encType="multipart/form-data">
                <Button id="submit" color="warning" type="submit" size="lg">이미지 다운로드하기</Button>
              </form>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Selfie2AnimeResult;