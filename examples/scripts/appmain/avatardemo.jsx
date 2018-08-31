import React, {Component} from 'react';
import { Avatar } from '../../../src/index';
console.log('avatar: ', Avatar);
import './avatardemo.styl';
import avatarImg from '../../imgs/avatar-demo.jpg';

class AvatarDemo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="avatar-demo">
        <div className="avatars">
          
          <Avatar icon="wealth" size="large" />
          <Avatar icon="wealth" />
          <Avatar icon="wealth" size="small" />

        </div>

        <div className="avatars">
          
          <Avatar icon="wealth" size="large" shape="square" />
          <Avatar icon="wealth" shape="square" />
          <Avatar icon="wealth" size="small" shape="square" />

        </div>

        <div className="avatars">
          
          <Avatar size="large" image={avatarImg} />
          <Avatar image={avatarImg} />
          <Avatar size="small" image={avatarImg} />
          
        </div>

         <div className="avatars">
          
          <Avatar size="large" image={avatarImg} shape="square" />
          <Avatar image={avatarImg} shape="square" />
          <Avatar size="small" image={avatarImg} shape="square" />
          
        </div>
      </div>
    );
  }
}

export default AvatarDemo;