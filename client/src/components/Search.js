import React, { Component } from 'react';
import '../css/search.css';
import '../css/home.css';
import Loader from 'react-loader-spinner'
import axios from 'axios'
import background from '../images/bg.png';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: props.props.searchTerm,
            data: props.props.data.data,
            loading: false,
        }
        //console.log(this.state.data)
        this.filterData();
    }

    filterData = () => {
        var data2 = this.state.data

        data2.sort((a, b) => b.score - a.score)
        this.setState({
            data: data2
        })

        this.render()
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    search = (e) => {
        this.setState({
            loading: true,
            searchTerm: this.state.searchTerm,
        })

        const term = {
            searchTerm: this.state.searchTerm
        }

        //Render new component/SetDirect to
        axios.post('/', term)
            .then(res => {

                //If data is empty, reset loading screen, and show error
                console.log(res);

                //Else render new Search page and send search term & data with props
                this.setState({
                    searchTerm: this.state.searchTerm,
                    data: res.data,
                    loading: false
                })
                this.filterData();

            }).catch((error) => {
                console.log("Problem submitting New Post", error);
            });
    }

    handleKeyPress = e => {
        if (e.keyCode === 13) {
            if (this.state.searchTerm.length > 1) {
                this.search();
            }
        }
    };

    renderResults = () => {

        if (this.state.loading) {
            return <div><Loader type="Puff" color="#00BFFF" height={100} width={100}></Loader> <h>Loading time: 2 to 3 minutes</h> </div>
        } else {
            if (this.state.data.length == 0) {
                return <h>Invalid or empty subreddit</h>
            } else {
                return <div>{this.state.data.map(function (d, idx) {
                    if (idx % 2 == 0) {
                        return (
                            <div class="grid-container3">
                                <div class="grid-container5">
                                    <a class="item1" href={'https://reddit.com/' + d.url} key={idx}>{d.title}</a>
                                    <p class="comments">{d.comments}</p>
                                        </div>
                                <p class="item2" >{d.score}</p>
                            </div>)
                    }
                    else {
                        return (
                            <div class="grid-container4">
                                <a class="item1" href={'https://reddit.com/' + d.url} key={idx}>{d.title}</a>
                                <p class="item2" >{d.score}</p>
                            </div>)
                    }
                })}</div>
            }
        }
    }


    render() {
        return (
            <div className="grid-container">
                <div className="maincontent2 grid-item">
                    <input className="search" placeholder={"r/" + this.state.searchTerm} name="searchTerm" onChange={this.handleChange} onKeyDown={this.handleKeyPress} lists="subreddits" />
                    <datalist id="subreddits">
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Health">Health</option>
                        <option value="Law">Law</option>
                        <option value="Environment">Environment</option>
                        <option value="Golf">Golf</option>
                        <option value="Compsci">Compsci</option>
                        <option value="LifeProTips">LifeProTips</option>
                        <option value="Parenting">Parenting</option>
                        <option value="Coronavirus">Coronavirus</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Startups">Startups</option>
                        <option value="Shutupandtakemymoney">Shutupandtakemymoney</option>
                        <option value="Relationships">Relationships</option>
                    </datalist>
                    <button class="btn" onClick={this.search}><b>Search</b></button>
                </div>
                {/* Results */}
                <div className="wrapper">
                    <div className="wrapper2">
                        <div class="grid-container3">
                            <h4 class="item1">Question</h4>
                            <p class="item2">Upvotes</p>
                        </div>
                        {this.renderResults()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;