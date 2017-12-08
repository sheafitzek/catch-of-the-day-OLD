import React from 'react';
import PropTypes from 'prop-types';

class StorePicker extends React.PureComponent {
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

StorePicker.contextTypes = {
	router : PropTypes.object,
};

export default StorePicker;
