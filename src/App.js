import React, { Component } from 'react'
import './assets/css/fishy-words.css'
import './assets/css/style.css'
class App extends Component {
	constructor (props) {
		super(props)
		this.state = {
			adjectives: ["cool", "good", "big", "smart", "gay", "sweet", "clever", "lovely"],
			nouns: ["fish", "starfish", "sponge", "squid", "crab", "plankton"],
			fishName: ["sweet", "gay", "crab"],
			keepFirst: false,
			keepSecond: false,
			keepNoun: false
		}
		this.handleChange = this.handleChange.bind(this)
		this.getNewFish = this.getNewFish.bind(this)
	}
	componentDidMount () {
		this.getNewFish()
		this.fetchWords()
	}

	handleChange (event) {
		const target = event.target
		const value = (target.type === 'checkbox') ? target.checked : target.value
		const name = target.name
		this.setState({[name]: value})
	}

	fetchWords () {
		this.fetchAdjectives()
		this.fetchNouns()
	}

	async fetchAdjectives () {
		let response = await fetch("https://raw.githubusercontent.com/dizzy-labs/FishyWords/master/adjectives.txt")
		let responseText = await response.text()
		let adjectives = responseText.split("\n");
		//trim off trailing blank lines
		while (!adjectives[adjectives.length-1]) {
			adjectives.pop();
		}
		this.setState({"adjectives": adjectives})
	}
	async fetchNouns () {
		let response = await fetch("https://raw.githubusercontent.com/dizzy-labs/FishyWords/master/nouns.txt")
		let responseText = await response.text()
		let nouns = responseText.split("\n");
		//trim off trailing blank lines
		while (!nouns[nouns.length-1]) {
			nouns.pop();
		}
		this.setState({"nouns": nouns})
	}

	getNewFish () {
		let adjectives = this.state.adjectives
		let nouns = this.state.nouns
		let oldName = this.state.fishName
		let newName = []

		if (this.state.keepFirst) {
			newName.push(oldName[0])
		} else {
			newName.push(adjectives[Math.floor(Math.random() * adjectives.length)])
		}
		if (this.state.keepSecond) {
			newName.push(oldName[1])
		} else {
			newName.push(adjectives[Math.floor(Math.random() * adjectives.length)])
		}
		if (this.state.keepNoun) {
			newName.push(oldName[2])
		} else {
			newName.push(nouns[Math.floor(Math.random() * nouns.length)])
		}

		this.setState({"fishName": newName})
	}

	render () {
		return (
			<div className="content fishy-app flex flex--wrap-col">
				<FishName name={this.state.fishName.join(" ")}></FishName>
				<Controls handleChange={this.handleChange}
				getNewFish={this.getNewFish}
				keepFirst={this.state.keepFirst}
				keepSecond={this.state.keepSecond}
				keepNoun={this.state.keepNoun}>
				</Controls>
			</div>
		)
	}
}

function FishName (props) {
	return (
		<div className="fish-name flex-item--grow">
			<span>{props.name}</span>
		</div>
	)
}

function Controls (props) {
	return (
		<div>
			<button className="button button--action"
			onClick={props.getNewFish}>
				<i className="fas fa-fw fa-lg fa-fish"></i>
				{" Get a New Fish"}
			</button>
			<div>
				<label>
					<input type="checkbox"
					name="keepFirst"
					onChange={props.handleChange}
					checked={props.keepFirst}/>
					Keep First Adjective
				</label>

				<label>
					<input type="checkbox"
					name="keepSecond"
					onChange={props.handleChange}
					checked={props.keepSecond}/>
					Keep Second Adjective
				</label>

				<label>
					<input type="checkbox"
					name="keepNoun"
					onChange={props.handleChange}
					checked={props.keepNoun}/>
					Keep Noun
				</label>
			</div>
		</div>
	)
}
export default App
