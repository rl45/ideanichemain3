import React, { Component } from 'react';
import '../css/home.css';
import background from '../images/bg.png';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Search from './Search'
import { Route, Switch, BrowserRouter } from 'react-router-dom';


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
            goToSearch: false,
            loading: false,
            data: null,
            subreddits: null
        }
        //this.renderSubreddits()
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    search = (e) => {
        this.setState({
            loading: true
        })

        const term = {
            searchTerm: this.state.searchTerm
        }

        //Render new component/SetDirect to
        axios.post('https://ideaniche.herokuapp.com/', term)
            .then(res => {

                //If data is empty, reset loading screen, and show error
                console.log("Done Rendering");

                //Else render new Search page and send search term & data with props
                this.setState({
                    goToSearch: true,
                    searchTerm: this.state.searchTerm,
                    data: res
                })

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

    renderSubreddits = () => {

        axios.get('https://ideaniche.herokuapp.com/')
            .then(res => {
                //console.log(res.data)

                this.setState({
                    subreddits: res.data
                })

            }).catch((error) => {
                console.log("Problem submitting New Post", error);
            });
    }


    renderRedirect = () => {
        if (this.state.goToSearch) {
            return <Search props={this.state} />
        } else {
            return <div class="container">
                <img src={background} className="bg"></img>
                <div class="container2">
                    {this.state.loading && <div className="loader"  ><Loader type="Puff" color="#00BFFF" height={100} width={100}></Loader> <h>Loading time: 2 to 3 minutes</h> </div>}
                    <h1 className="header">Find questions people are asking about on each subreddit…</h1>
                    <div className="maincontent">
                        <input className="search" placeholder="r/" name="searchTerm" onChange={this.handleChange} onKeyDown={this.handleKeyPress} list="subreddits" />
                        <datalist id="subreddits">
                            <option value="Entrepreneur">Entrepreneur</option>
                            <option value="Health">Health</option>
                            <option value="Law">Law</option>
                            <option value="Smallbusiness">Smallbusiness</option>
                            <option value="Smallbusiness">Blogger</option>
                            <option value="Youtube">Youtube</option>
                            <option value="SaaS">SaaS</option>
                            <option value="SEO">SEO</option>
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
                </div>
            </div>
        }
    }


    render() {


        return (
            <div>
                {this.renderRedirect()}
            </div>
        );
    }
}

export default Home;