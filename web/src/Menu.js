import React from 'react';
import InfoModal from './Modal'
import { scaleDown as Menu } from 'react-burger-menu'

class Slide extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
        <Menu disableAutoFocus>
            <h1>메뉴</h1>
            <a className="bm-menu-wrap" href="/pizzas">
                페이스 체인지
            </a>
    
            <a className="bm-item" href="/desserts">
                초상화
            </a>
            <a className="menu-item" href="javascript:void(0)">
                <InfoModal/>
            </a>
    
            <a className="menu-item" href="https://github.com/znznz6037/GANFaceChanger">
                GitHub
            </a>
      </Menu>
    );
  }
}

export default Slide