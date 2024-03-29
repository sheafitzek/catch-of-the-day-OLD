import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { formatPrice } from '../helpers';

class Order extends React.Component {
	constructor() {
		super();

		this.renderOrder = this.renderOrder.bind(this);
	}

	renderOrder(key) {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const removeButton = (
			<button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
		);

		if (!fish || fish.status === `unavailable`) {
			return (
				<li key={key}>
					Sorry, {fish ? fish.name : `fish`} is no longer available!
					{removeButton}
				</li>
			);
		}

		return (
			<li key={key}>
				<span>
					<CSSTransitionGroup
						className="count"
						component="span"
						transitionName="count"
						transitionEnterTimeout={250}
						transitionLeaveTimeout={250}
					>
						<span key={count}>{count.toString().padStart(3, `\u00a0`)}</span>
					</CSSTransitionGroup>
					&nbsp; lbs. {fish.name} {removeButton}
				</span>
				<span className="price">{formatPrice(count * fish.price)}</span>
			</li>
		);
	}

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((prevTotal, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === `available`;

			return isAvailable ? prevTotal + (count * fish.price || 0) : prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				<CSSTransitionGroup
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				</CSSTransitionGroup>
			</div>
		);
	}
}

Order.propTypes = {
	fishes: PropTypes.object.isRequired,
	order: PropTypes.object.isRequired,
	removeFromOrder: PropTypes.func.isRequired,
};

export default Order;
