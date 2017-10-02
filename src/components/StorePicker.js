import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
	// Use constructor for multiple use elements, use inline binding for single use elements
	// constructor() {
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }

	goToStore(e) {
		e.preventDefault();

		const storeId = this.storeInput.value;

		this.context.router.transitionTo(`/store/${storeId}`);
	}

	render() {
		return (
			<form className="store-selector" onSubmit={(e)=> this.goToStore(e)}> {/* inline binding */}
				<h2>Please Enter A Store</h2>
				<input type="text" placeholder="Store Name" defaultValue={getFunName()} ref={(input)=> {this.storeInput = input}} required/>
				<button type="submit">Visit Store 🡒</button>
			</form>
		)
	}
}

// access BrowserRouter from index.js
StorePicker.contextTypes = {
	router: React.PropTypes.object,
}

export default StorePicker;
