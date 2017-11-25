import React from 'react';
import PropTypes from 'prop-types';

import base from '../base';

import AddFishForm from './AddFishForm';

class Inventory extends React.PureComponent {
	constructor() {
		super();

		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			uid   : null,
			owner : null,
		};
	}

	componentDidMount() {
		base.onAuth((user) => {
			if (user) {
				this.authHandler(null, {user});
			}
		});
	}

	handleChange(e, key) {
		const fish = this.props.fishes[key];
		const updatedFish = {
			...fish,
			[e.target.name]: e.target.value,
		};

		this.props.updateFish(key, updatedFish);
	}

	authenticate(provider) {
		console.log(`Trying to Log In with ${provider}`);
		base.authWithOAuthPopup(provider, this.authHandler);
	}

	logout() {
		base.unauth();
		this.setState({
			uid : null,
		});
	}

	authHandler(err, authData) {
		if (err) {
			console.error(err);

			return;
		}

		const storeRef = base.database().ref(this.props.storeId);

		storeRef.once(`value`, (snapshot) => {
			const data = snapshot.val() || {};

			if (!data.owner) {
				storeRef.set({
					owner : authData.user.uid,
				});
			}

			this.setState({
				uid   : authData.user.uid,
				owner : data.owner || authData.user.uid,
			});
		});
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to Manage your Store's Inventory</p>
				<button
					className="github"
					onClick={() => this.authenticate(`github`)}
				>
					Log In with Github
				</button>
				<button
					className="facebook"
					onClick={() => this.authenticate(`facebook`)}
				>
					Log In with Facebook
				</button>
				<button
					className="twitter"
					onClick={() => this.authenticate(`twitter`)}
				>
					Log In with Twitter
				</button>
				<button
					className="google"
					onClick={() => this.authenticate(`google`)}
				>
					Log In with Google
				</button>
			</nav>
		);
	}

	renderInventory(key) {
		const fish = this.props.fishes[key];

		return (
			<div className="fishEdit" key={key}>
				<input
					type="text"
					name="name"
					value={fish.name}
					placeholder="Fish Name"
					onChange={(e) => this.handleChange(e, key)}
				/>

				<input
					type="text"
					name="price"
					value={fish.price}
					placeholder="Fish Price"
					onChange={(e) => this.handleChange(e, key)}
				/>

				<select
					type="text"
					name="status"
					value={fish.status}
					placeholder="Fish Status"
					onChange={(e) => this.handleChange(e, key)}
				>
					<option value="available">Fresh!</option>
					<option value="unavailable">
						Sold Out!
					</option>
				</select>

				<textarea
					type="text"
					name="desc"
					value={fish.desc}
					placeholder="Fish Desc"
					onChange={(e) => this.handleChange(e, key)}
				/>

				<input
					type="text"
					name="image"
					value={fish.image}
					placeholder="Fish Image"
					onChange={(e) => this.handleChange(e, key)}
				/>

				<button
					onClick={() => this.props.removeFish(key)}
				>
					Remove Fish
				</button>
			</div>
		);
	}

	render() {
		const logout = (
			<button onClick={this.logout}>Log Out!</button>
		);

		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>;
		}

		if (this.state.uid !== this.state.owner) {
			return (
				<div>
					<p>
						Sorry, You aren't the Owner of this
						Store!
					</p>
					{logout}
				</div>
			);
		}

		return (
			<div>
				<h2>Inventory</h2>
				{logout}
				{Object.keys(this.props.fishes).map(
					this.renderInventory
				)}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadSamples}>
					Add Sample Fish
				</button>
			</div>
		);
	}
}

Inventory.propTypes = {
	addFish     : PropTypes.func.isRequired,
	updateFish  : PropTypes.func.isRequired,
	removeFish  : PropTypes.func.isRequired,
	loadSamples : PropTypes.func.isRequired,
	fishes      : PropTypes.object.isRequired,
	storeId     : PropTypes.string.isRequired,
};

export default Inventory;
