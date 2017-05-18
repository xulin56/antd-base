import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class App extends Component {
  constructor(props) {
    super(props);
    // console.log('inside constructor of app: props: ', props)
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    console.log('执行componentDidMount');
    const { dispatch, selectedReddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  componentWillReceiveProps(nextProps) {
    console.log('执行componentWillReceiveProps', nextProps);
    if (nextProps.selectedReddit !== this.props.selectedReddit) {
      const { dispatch, selectedReddit } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedReddit));
    }
  }

  handleChange(nextReddit) {
    this.props.dispatch(selectReddit(nextReddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedReddit } = this.props;
    dispatch(invalidateReddit(selectedReddit));
    dispatch(fetchPostsIfNeeded(selectedReddit));
  }

  render() {
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;
    const message = isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>;

    // console.log('inside render of app: props: ', this.props)
    return (
      <div>
        <Picker
          value={selectedReddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}  />

        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span> }
            
          {!isFetching &&
            <a
              href="#"
              onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>

          {isEmpty ? message : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
          }
      </div>
    );
  }
}

App.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;

  console.log( 'in mapStateToProps:1：', state );

  const {
    isFetching,
    lastUpdated,
    items: posts,
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: [],
  };

  const obj = {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated,
  };

  console.log( 'in mapStateToProps:2：', obj );

  return obj;
}

export default connect(mapStateToProps)(App);
