import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import { getDiscover, getGenre } from '../sagas/TV/actions';

import Header from './global/Header';
import Pagination from './global/Pagination';
import Footer from './global/Footer';

import { routeCodes } from '../config/routes';

const REACT_APP_CARD_LIST_WIDTH = process.env.REACT_APP_CARD_LIST_WIDTH;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genre: [],
      page: 1
    };
    this.handleGenre = this.handleGenre.bind(this);
    this.handlePage = this.handlePage.bind(this);
  }

  componentDidMount() {
    this.props.getDiscover();
    this.props.getGenre();
  }

  componentDidUpdate(prevProps, prevState) {
    const { genre, page } = this.state;
    if (prevState.genre !== genre) {
      this.props.getDiscover('1', genre.toString());
    }
    if (prevState.page !== page) {
      this.props.getDiscover(page.toString(), genre.toString());
    }
  }

  handleGenre(e) {
    const { genre } = this.state;
    const id =  e.target.id;
    let element = document.getElementById(id);
    if (genre.includes(id)) {
      const index = genre.indexOf(id);
      if (index > -1) {
        let newGenre = [ ...genre ]
        newGenre.splice(index, 1);
        this.setState({
          genre: newGenre
        })
        element.classList.remove('active');
      }
    } else {
      const newGenre = [ ...genre, id]
      console.log(newGenre)
      this.setState({
        genre: newGenre
      })
      element.classList.add('active');
    }
    console.log(element)
  }

  handlePage(page) {
    this.setState({
      page,
    });
  }

  render() {
    const { configData, meData, discoverData, genreData } = this.props;
    const cardBaseUrl = `${ configData && configData.images ? configData.images.secure_base_url : '' }${REACT_APP_CARD_LIST_WIDTH}`
    const sliderSetting = {
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      centerMode: false,
      arrows: true,
      className: 'custom-slick-wrapper',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return(
      <div className='main-wrapper'>
        <Header />
        { meData && meData.favorites ?<h5 className='list-title'>YOUR FAVORITES</h5> : null }
        <Slider { ...sliderSetting }>
          { 
            meData && meData.favorites ?
              meData.favorites.map((card, index) => {
                return (
                  <NavLink to={ `${ routeCodes.SINGLETV }/${ card.id }` } key={ index } >
                    <div className='card card-layout'>
                      <img className='card-img-top' src={`${cardBaseUrl}${ card.poster_path }`} alt='Hooq`d' />
                      <div className='vote-text'><FontAwesomeIcon icon={ faStar } /> {card.vote_average}</div>
                      <div className='card-body'>
                        <p className='card-text text-center'>{ card.name }</p>
                      </div>
                    </div>
                  </NavLink>
                )
              }) : null
          }
        </Slider>
        <h5 className='list-title'>DISCOVER</h5>
        <div className='btn-toolbar genre-btn-toolbar' role='toolbar'>
        {
          genreData && genreData.genres ?
            genreData.genres.map((gen, index) => {
              return (
                <div className='btn-group' role='group' key={ index }>
                  <button type='button' className='btn btn-outline-warning' onClick={this.handleGenre} id={gen.id}>{gen.name}</button>
                </div>
              )
            }) : null
        }
        </div>
        <div className='container-fluid'>
          <div className='row discover-row'>
            { 
              discoverData && discoverData.results ?
                discoverData.results.map((card, index) => {
                  return (
                    <div className='col-md-2' key={ index }>
                      <NavLink to={ `${ routeCodes.SINGLETV }/${ card.id }` } >
                        <div className='card card-layout-discover'>
                          <img className='card-img-top' src={`${cardBaseUrl}${ card.poster_path }`} alt='Hooq`d' />
                          <div className='vote-text'><FontAwesomeIcon icon={ faStar } /> {card.vote_average}</div>
                          <div className='card-body'>
                            <p className='card-text text-center'>{ card.name }</p>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  )
                }) : null
            }
          </div>
          <Pagination
              page={ this.state.page }
              size={ 20 }
              count={ discoverData && discoverData.total_results ? discoverData.total_results : null }
              handlePage={ this.handlePage }
            />
        </div>
        <Footer />
      </div>
    )
  }
}

// redux providing state takeover
const mapStateToProps = (state) => {
    return {
      meData: state.auth.get('meData'),
      configData: state.tv.get('configData'),
      discoverData: state.tv.get('discoverData'),
      genreData: state.tv.get('genreData')
    }
}
export default connect(mapStateToProps, { getDiscover, getGenre })(Home)