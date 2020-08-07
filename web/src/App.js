import React, {Component} from 'react';
import './App.css';
import loadingImg from './loading.gif'

class App extends Component{
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <div id="border">
            <div className="loading" id = "loading">
                <img src={loadingImg} alt="Loading img"/>
                <p id="ptext">딥러닝 작업이 수행되고 있습니다. 10초 정도만 기다려주세요.</p>
            </div>
            <div id="notLoading">
                <p id="ptext">얼굴이 정중앙에 위치하게 218 * 178 크기로 업로드해주세요.</p>
                <form id="upload" action="http://34.64.112.90:5000/upload" method="POST" enctype="multipart/form-data">
                  <div id="border_title">
                      <h1 id="title"> 얼굴 특징 바꾸기! </h1>
                  </div>
                  <div id = "file_upload">
                      <label for="file" id="label">클릭해서 이미지를 업로드 해주세요.</label>
                      <input type="file" name="file" id="image" accept="image/*" 
                      onchange="setThumbnail(event);"/>
                  </div>
                  <div id="faceStyle_border"></div>    
                      <select id="faceStyle">
                          <option value="">스타일 선택</option>
                          <option value="안경">금발</option>
                          <option value="안경삭제">흑발</option>
                          <option value="곱슬머리">안경</option>
                          <option value="백인">화장</option>
                      </select>
                  <input type="submit" value="변환" id="a"/>
                </form>
            </div>
        </div>
        </header>
      </div>
    );
  }
}

export default App;