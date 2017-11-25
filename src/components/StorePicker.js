import React from 'react';
import PropTypes from 'prop-types';

class StorePicker extends React.PureComponent {
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
			<form
				className="store-selector"
				onSubmit={(e) => this.goToStore(e)}
			>
				{/* inline binding above */}
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					placeholder="Store Name"
					ref={(input) => {
						this.storeInput = input;
					}}
					required
				/>
				<button type="submit">Visit Store 🡒</button>
			</form>
		);
	}
}

// access BrowserRouter from index.js
StorePicker.contextTypes = {
	router : PropTypes.object,
};

export default StorePicker;
