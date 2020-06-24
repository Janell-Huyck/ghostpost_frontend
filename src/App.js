import React from 'react';
import './App.css';
import IndividualPost from './post.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    console.log("i'm in component did mount")
    fetch('http://127.0.0.1:8000/api/ghostpost/')
      .then(res => res.json())
      .then(data => this.setState({ posts: data, isLoaded: true }))
    console.log("data received is:", this.state.posts)
  }

  time_sort = () => {
    console.log("i'm sorting by time")
    this.setState({ isLoaded: false })
    let time_sorted = [...this.state.posts]
    time_sorted.sort(function (a, b) {
      return b.submission_time - a.submission_time
    })
    this.setState({ posts: time_sorted, isLoaded: true })
  }

  score_sort = () => {
    console.log("i'm sorting by score")
    this.setState({ isLoaded: false })
    let score_sorted = [...this.state.posts]
    score_sorted.sort(function (a, b) {
      return b.score - a.score
    })
    this.setState({ posts: score_sorted, isLoaded: true })
  }



  show_all = () => {
    console.log("i'm getting all posts")
    this.setState({ isLoaded: false })
    fetch('http://127.0.0.1:8000/api/ghostpost/')
      .then(res => res.json())
      .then(data => this.setState({ posts: data, isLoaded: true }))
  }


  show_boasts = () => {
    console.log("i'm getting all boasts")
    this.setState({ isLoaded: false })
    fetch('http://127.0.0.1:8000/api/boasts/')
      .then(res => res.json())
      .then(data => this.setState({ posts: data, isLoaded: true }))
  }

  show_roasts = () => {
    console.log("i'm getting all roasts")
    this.setState({ isLoaded: false })
    fetch('http://127.0.0.1:8000/api/roasts/')
      .then(res => res.json())
      .then(data => this.setState({ posts: data, isLoaded: true }))
  }



  render() {
    if (this.state.isLoaded !== true) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    else if (this.state.posts === []) {
      return (
        <div>
          <h2>No Posts Available.</h2>
        </div>
      )
    }
    else {
      return (

        < div >
          <div>
            <button onClick={this.show_all}>Show All Posts</button>
            <button onClick={this.show_boasts}>Show All Boasts</button>
            <button onClick={this.show_roasts}>Show All Roasts</button>
          </div>
          <div>
            <button onClick={this.time_sort}>Sort by Time</button>
            <button onClick={this.score_sort}>Sort by Score</button>
          </div>

          <ul>
            {this.state.posts.map(post => {
              return (
                < li key={post.id} >
                  <IndividualPost id={post.id}
                    is_boast={post.is_boast}
                    text={post.text}
                    time={post.submission_time}
                    score={post.score}
                    up_votes={post.up_votes}
                    down_votes={post.down_votes} />
                </li>
              )
            })
            }
          </ul>
        </div >
      )
    }
  }
}

export default App;
