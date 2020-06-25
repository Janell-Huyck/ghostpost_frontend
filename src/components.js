import React from 'react'
import axios from 'axios'

export class IndividualPost extends React.Component {

    render() {
        return (
            <React.Fragment>
                <h3 className="card-header">{this.props.is_boast ? "Boast" : "Roast"}</h3>
                <h5>Text: {this.props.text}</h5>
                <div>
                    <div className="btn">
                        <UpVote id={this.props.id} />
                    </div>
                    <div className="btn">
                        <DownVote id={this.props.id} />
                    </div>
                </div>
                <h5>Score: {this.props.score}</h5>
                <div className="card-footer text-muted">
                    <div>
                        <div>
                            ID: {this.props.id} <br />
                        </div>
                        <div>
                            Posting time: {this.props.time} <br />
                        </div>
                        <div>
                            Up Votes: {this.props.up_votes} <br />
                        </div>
                        <div>
                            Down Votes: {this.props.down_votes} <br /><br />
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}


class UpVote extends React.Component {

    up_link = "http://127.0.0.1:8000/api/ghostpost/" + this.props.id.toString() + "/likePost/"

    vote_up = async () => {
        try {
            return axios.post(this.up_link)
        }
        catch (err) {
            return console.log(err)
        }
    }

    render() {
        return (
            <form onSubmit={() => this.vote_up()}>
                <button type="submit">Upvote This</button>
            </form>
        )
    }
}

class DownVote extends React.Component {

    down_link = "http://127.0.0.1:8000/api/ghostpost/" + this.props.id.toString() + "/dislikePost/"

    vote_down = async () => {
        try {
            return axios.post(this.down_link)
        }
        catch (err) {
            return console.log(err)
        }
    }

    render() {
        return (
            <form onSubmit={() => this.vote_down()}>
                <button type="submit">Downvote This</button>
            </form>
        )
    }
}


export class MakePost extends React.Component {

    post_link = "http://127.0.0.1:8000/api/ghostpost/"

    state = {
        value: "",
    }

    keyPress = event => {
        if (
            event.target.value.trim().length < 1 ||
            event.target.value.trim().length > 280
        ) {
            event.target.style.color = "red";
        } else {
            event.target.style.color = "gray";
        }
        this.setState({ value: event.target.value });
    };


    handleFormSubmit = (event) => {

        const is_boast = event.target.elements.is_boast.value
        const text = event.target.elements.text.value
        return axios.post(this.post_link, {
            is_boast: is_boast,
            text: text
        })
            .then(this.setState({ value: "" }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <form className="d-flex flex-column " onSubmit={(event) => this.handleFormSubmit(event)}>
                <div className="d-flex justify-content-around ">
                    <div>
                        <input type="radio" id="true" name="is_boast" value="true" defaultChecked />
                        <label htmlFor="true">Boast</label><br />
                    </div>
                    <div>
                        <input type="radio" id="false" name="is_boast" value="false" />
                        <label htmlFor="false">Roast</label><br />
                    </div>
                </div>
                <textarea name="text"
                    type="textarea"
                    placeholder="What's Happening . . .  (max 280 chrs)"
                    rows="2"
                    columns="500"
                    onChange={this.keyPress}
                    onKeyDown={this.keyPress}
                    value={this.state.value}
                ></textarea>
                <br />
                <div className="align-self-center">
                    <input
                        type="submit"
                        value="Post It!"
                    ></input>
                    <br /><br />
                </div>
            </form>)
    }
}

