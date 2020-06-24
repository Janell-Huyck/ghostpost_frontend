import React from 'react'
import path from 'path'

class IndividualPost extends React.Component {
    // constructor (props) {
    //     super(props)
    // }

    up_link = path.join("http://127.0.0.1:8000/api/ghostpost", this.props.id.toString(), "likePost")
    down_link = path.join("http://127.0.0.1:8000/api/ghostpost", this.props.id.toString(), "dislikePost")

    vote_up = () => {
        fetch(this.up_link, {
            method: 'POST',
            body: JSON.stringify({
                pk: this.props.id
            })
        })
    }
    // const response = fetch("endpoint_url",
    //     {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             this.state.name,
    //             this.state.email
    //             // Other body stuff
    //         }),
    //         headers: {
    //             'X-Api-Key': API_KEY,
    //             'Content-Type': 'application/json'
    //             // Other possible headers
    //         }
    //     }
    // );




    render() {
        return (
            <React.Fragment>
                <h2>{this.props.is_boast ? "Boast" : "Roast"}</h2>
                ID: { this.props.id} <br />
                <h4>Text: {this.props.text}</h4>
                Posting time: { this.props.time} <br />
                <h4>Score: {this.props.score}</h4>
                Up Votes: { this.props.up_votes} <br />
                Down Votes: { this.props.down_votes} <br /><br />
                <button onClick={this.vote_up}>Upvote This</button>
            </React.Fragment >
        )
    }
}

export default IndividualPost