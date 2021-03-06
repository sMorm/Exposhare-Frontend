import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { svgPolaroid } from '../../shared/constants/links'
import Ionicon from 'react-ionicons'

// Components
import Header from '../reusables/Header.jsx'
import Trending from '../reusables/Trending.jsx'
import FullScreenSpinner from '../reusables/FullScreenSpinner.jsx'

import './styles/GuestHome.scss'

export default class GuestHome extends Component {
  state = {
    loadedImages: 0
  }

  onLoad = () => this.setState({ loadedImages: this.state.loadedImages + 1})
  render() {
    return (
      <div className='guestHomeContainer'>
        {this.state.loadedImages !== 3 && <FullScreenSpinner size={100} color='salmon' text={['Loading..', 'Loading...', 'Beep boop 🤖']} />}
        <div className='welcomeContainer'>
          <div className='welcomeImageContainer'>
            <span className='welcomeText'>
              <div>
                <h1>Photo Sharing</h1>
                <p>For Everyone.</p>
                <Link to='/signup' className='welcomeSignupButton'>
                  Join the Community!
                </Link>
              </div>
            </span>          
            <img 
              src='https://s3.amazonaws.com/exposhare-statics/ben-neale-unsplash-com.png' 
              alt='unsplash ben neale' 
              onLoad={this.onLoad}/>
          </div>
        </div>

        <div className='secondWelcomeContainer'>
          <span className='secondWelcomeContent'>
            <img src='https://s3.amazonaws.com/sereymorm.com/media/street12.jpg' alt='' onLoad={this.onLoad}/>
            <span className='secondWelcomeText'>
              <p><strong>Photo Sharing</strong> platform for creators —</p>
            </span>
          </span>
          <span className='secondWelcomeContent'>
            <img src='https://s3.amazonaws.com/sereymorm.com/media/street13.jpg' alt='' onLoad={this.onLoad}/>
            <span className='secondWelcomeText'>
              <p><strong>For Everyone</strong> Connecting the world through photos —</p>
            </span>
          </span>
        </div>

        <div className='sketchWelcomeContainer'>
          <Header title='Cross-platform' />
          <p>With both mobile and desktop support, share your photos from anywhere.</p>
          <span className='sketchWelcomeContent'>
            <img src='https://s3.amazonaws.com/exposhare-statics/iphone_cropped.png'/>
            <img src='https://s3.amazonaws.com/exposhare-statics/imac_cropped.png'/>
          </span>
        </div>

        <div className='discoverContainer'>
          <Header title='Discover' />
          <h3>See how other users are sharing photos on Exposhare.</h3>
          <Trending />
        </div>

        <div className='guestFooter'>
          <p>Built with&nbsp;</p><Ionicon icon='md-heart' color='salmon' /><p>&nbsp;in Lowell, MA</p>
        </div>
      </div>
    )
  }
}
