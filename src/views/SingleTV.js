import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faScroll, faPlayCircle, faStar, faHeart, faHeartBroken, faPlay } from '@fortawesome/free-solid-svg-icons';

import { getSingleTV } from '../sagas/TV/actions';
import { updateUserFavorites, getMe } from '../sagas/Auth/actions';

import Header from './global/Header';
import Footer from './global/Footer';

const REACT_APP_CARD_SINGLE_WIDTH = process.env.REACT_APP_CARD_SINGLE_WIDTH;
const REACT_APP_CARD_SMALL_WIDTH = process.env.REACT_APP_CARD_SMALL_WIDTH;

class SingleTV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonActive: ''
    };
    this.handleFavoritesAdd = this.handleFavoritesAdd.bind(this);
    this.handleFavoritesRemove = this.handleFavoritesRemove.bind(this);
    this.handleSeasonActive = this.handleSeasonActive.bind(this);
  }

    componentDidMount() {
      this.props.getSingleTV(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
      const { updateUserFavoritesData } = this.props;
      if (updateUserFavoritesData !== prevProps.updateUserFavoritesData) {
        this.props.getMe();
      }
    }

    handleFavoritesAdd() {
      const { singleTVData } = this.props;
      const data = {
        id: singleTVData.id,
        poster_path: singleTVData.poster_path,
        vote_average: singleTVData.vote_average,
        name: singleTVData.name
      }
      this.props.updateUserFavorites(data, 'add')
    }
    handleFavoritesRemove() {
      this.props.updateUserFavorites(this.props.match.params.id, 'remove')
    }
    handleSeasonActive(e) {
      this.setState({
        seasonActive: e.target.id
      })
    }
  
    render() {
      const self = this;
      const { singleTVData, configData, meData, meLoad } = this.props;
      let imageUrl = '';
      let seasonImageUrl = '';
      if (singleTVData && singleTVData.poster_path && configData && configData.images) {
        imageUrl = `${ configData.images.secure_base_url }${REACT_APP_CARD_SINGLE_WIDTH}${ singleTVData.poster_path }`;
        seasonImageUrl = `${ configData.images.secure_base_url }${REACT_APP_CARD_SMALL_WIDTH}`;
      }
        return(
          <div className='main-wrapper'>
            <Header />
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-3 wrapper-single-image'>
                  {
                    imageUrl ?
                      <img className='custom-single-image' src={ imageUrl } alt='Hooq`d' /> : null
                  }
                </div>
                <div className='col-9 wrapper-single-desc'>
                  <h3>{ singleTVData ? singleTVData.name : '-' }</h3>
                  <hr />
                  <div className='btn-toolbar genre-btn-toolbar genre-single-btn-toolbar' role='toolbar'>
                  {
                    singleTVData && singleTVData.genres ?
                      singleTVData.genres.map((gen, index) => {
                        return (
                          <div className='btn-group' role='group' key={ index }>
                            <button type='button' className='btn btn-outline-warning active'>{gen.name}</button>
                          </div>
                        )
                      }) : null
                  }
                  </div>
                  <p className='text-muted'>{ singleTVData ?
                    `${singleTVData.number_of_seasons} seasons || ${singleTVData.number_of_episodes} episodes || ${
                      moment(singleTVData.first_air_date).format('YYYY')} || ${singleTVData.type} - ${singleTVData.status} || ${
                        singleTVData.in_production ? 'In Production' : 'Completed'}` : '-' }
                  </p>
                  <div className='row mb-1'>
                    <div className='col-1 text-right'><FontAwesomeIcon icon={ faStar } /></div> 
                    <div className='col-auto'><strong>{ singleTVData.vote_average }</strong></div>
                  </div>
                  <div className='row mb-1'>
                    <div className='col-1 text-right'><FontAwesomeIcon icon={ faClock } /></div> 
                    <div className='col-auto'><strong>{ singleTVData.episode_run_time } min</strong></div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-1 text-right'><FontAwesomeIcon icon={ faScroll } /></div> 
                    <div className='col-auto'>{ singleTVData.overview }</div>
                  </div>
                  <hr />
                  <div className='row mb-2'>
                    <div className='col-1 text-right'><strong>Director</strong></div> 
                    <div className='col-auto'>{ singleTVData.created_by ? singleTVData.created_by[0].name : '' }</div>
                  </div>
                  <div className='row mb-2'>
                    <div className='col-1 text-right'><strong>Production</strong></div> 
                    <div className='col-auto'><ul className='ul-no-padding'>{ singleTVData.production_companies ? 
                      singleTVData.production_companies.map((comp, index) => {
                        return <li key={index}>{comp.name}</li>
                      }) : '' }</ul>
                    </div>
                  </div>  
                  <div className='row mb-2'>
                    <button type='button' className='btn btn-success btn-lg'>
                      <FontAwesomeIcon icon={ faPlayCircle } />&nbsp;&nbsp;&nbsp;Watch Now</button>
                  </div>
                  {
                    meData && meData._id ?
                    <div className='row mb-2'>
                      {
                          meData.favorites && meData.favorites.filter(e => e.id === parseInt(self.props.match.params.id, 10)).length > 0 ?
                            <button type='button' className='btn btn-secondary btn-lg' onClick={ this.handleFavoritesRemove }>
                            <FontAwesomeIcon icon={ faHeartBroken } />&nbsp;&nbsp;&nbsp;{!meLoad ? 'Remove from Favorites' : 'Loading'}</button> :
                              <button type='button' className='btn btn-info btn-lg' onClick={ this.handleFavoritesAdd }>
                            <FontAwesomeIcon icon={ faHeart } />&nbsp;&nbsp;&nbsp;{!meLoad ? 'Add to Favorites' : 'Loading'}</button>
                      }
                    </div> :
                    <div className='row mb-2'>
                      {
                        !meLoad ?
                        <small className='text-muted'>Sign in is required to add this movie to your favorites</small>
                        : null
                      }
                    </div>
                  }
                </div>
              </div>
              <hr />
              <h4>Seasons</h4>
              <div className='row mb-5'>
                <div className='col-4'>
                  <div className='list-group' id='list-tab' role='tablist'>
                    {
                      singleTVData && singleTVData.seasons ?
                      singleTVData.seasons.map((season, index) => {
                        return <a key={ index } 
                        className={ this.state.seasonActive === `${ season.id }${ season.season_number }` ?
                          'list-group-item list-group-item-action active list-group-item-secondary' : 'list-group-item list-group-item-action list-group-item-secondary' } 
                        id={`${ season.id }${ season.season_number }`}
                        data-toggle='list' 
                        href={`#${ season.id }`} 
                        role='tab' 
                        aria-controls={index}
                        onClick={ this.handleSeasonActive }>{season.name}</a>
                      }) : null
                    }
                  </div>
                </div>
                <div className='col-8'>
                  <div className='tab-content' id='nav-tabContent'>
                    {
                      singleTVData && singleTVData.seasons ?
                      singleTVData.seasons.map((season, index) => {
                        return <div key={ index } 
                        className={ this.state.seasonActive === `${ season.id }${ season.season_number }` ? 'tab-pane fade show active' : 'tab-pane fade' } 
                        id={ season.id }
                        role='tabpanel' 
                        aria-labelledby={`${ season.id }${ season.season_number }`}>
                          <h6>{ season.name }</h6>
                          <hr />
                          <div className='row mb-5'>
                            <div className='col-2'>
                            {
                              seasonImageUrl ?
                                <img className='custom-season-image' src={ `${seasonImageUrl}${season.poster_path}` } alt='Hooq`d' /> : null
                            }
                            </div>
                            <div className='col-10'>
                              <p><small>Air Date : <strong>{season.air_date}</strong></small></p>
                              <p><small>Episode : <strong>{season.episode_count}</strong></small></p>
                              <p>{ season.overview }</p>
                            </div>
                          </div>
                          <div className='row'>
                              {
                                (
                                  () => {
                                    const episodeList = [];
                                    for (let i = 0; i < season.episode_count; i++) {
                                      episodeList.push(<div key={ i } className='col-2 btn btn-outline-info m-1'><FontAwesomeIcon icon={ faPlay } /> Watch Episode {i + 1}</div>);
                                    }
                                    return episodeList;
                                  }
                                )()
                              }
                          </div>  
                        </div>
                      }) : null
                    }
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        )
      }
    }
  
  // redux providing state takeover
  const mapStateToProps = (state) => {
      return {
        isAuthenticated: state.auth.get('isAuthenticated'),
        meData: state.auth.get('meData'),
        meLoad: state.auth.get('meLoad'),
        configData: state.tv.get('configData'),
        singleTVData: state.tv.get('singleTVData'),
        updateUserFavoritesData: state.auth.get('updateUserFavoritesData')
      }
  }
  export default connect(mapStateToProps, { getSingleTV, updateUserFavorites, getMe })(SingleTV)