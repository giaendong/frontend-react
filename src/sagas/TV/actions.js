export const GET_CONFIG_START = 'GET_CONFIG_START';
export const GET_CONFIG_ERROR = 'GET_CONFIG_ERROR';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';

export const GET_GENRE_START = 'GET_GENRE_START';
export const GET_GENRE_ERROR = 'GET_GENRE_ERROR';
export const GET_GENRE_SUCCESS = 'GET_GENRE_SUCCESS';

export const GET_DISCOVER_START = 'GET_DISCOVER_START';
export const GET_DISCOVER_ERROR = 'GET_DISCOVER_ERROR';
export const GET_DISCOVER_SUCCESS = 'GET_DISCOVER_SUCCESS';

export const GET_SINGLE_TV_START = 'GET_SINGLE_TV_START';
export const GET_SINGLE_TV_ERROR = 'GET_SINGLE_TV_ERROR';
export const GET_SINGLE_TV_SUCCESS = 'GET_SINGLE_TV_SUCCESS';

export function getConfig() {
    return {
      type: GET_CONFIG_START
    };
  }

export function getGenre() {
    return {
      type: GET_GENRE_START
    };
  }

export function getDiscover(page, genre) {
  return {
    type: GET_DISCOVER_START,
    page,
    genre
  };
}

export function getSingleTV(id, season, episode) {
    return {
      type: GET_SINGLE_TV_START,
      id,
      season,
      episode
    };
  }