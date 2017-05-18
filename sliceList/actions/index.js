import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const NAVIGATE_TO = 'NAVIGATE_TO';

const data = require('./../../responses/data.json');
console.log(data);
export function navigateTo(pageNumber){
  return {
    pageNumber,
    type: NAVIGATE_TO
  }
}

function requestPosts(pageNumber) {
  return {
    type: REQUEST_POSTS,
    pageNumber,
  };
}

function receivePosts(pageNumber, json) {
  return {
    type: RECEIVE_POSTS,
    pageNumber,
    posts: json.data, //.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts(pageNumber) {
  // const URL = 'http://172.16.1.67:8086/slicemodelview/listdata/';
  const URL = 'http://localhost:8000/response/data.json';

  return dispatch => {
    // dispatch(requestPosts(pageNumber));
    // return fetch(URL)
      // .then(response => response.data)
      // .then(json => dispatch(receivePosts(pageNumber, json)));

    return ( dispatch(receivePosts(pageNumber, data )))
  };
}

// TODO:
// function shouldFetchPosts(state, pageNumber) {
//   const posts = state.postsBypageNumber[pageNumber];
//   if (!posts) {
//     return true;
//   }
//   if (posts.isFetching) {
//     return false;
//   }
//   return posts.didInvalidate;
// }

export function fetchPostsIfNeeded(pageNumber) {
  return (dispatch, getState) => {
    //TODO:
    // if (shouldFetchPosts(getState(), pageNumber)) {
    //   return dispatch(fetchPosts(pageNumber));
    // }
    // return null;

    return dispatch(fetchPosts(pageNumber));

  };
}
