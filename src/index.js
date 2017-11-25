import React from 'react'; // importing a string (that is not a path) tells react to look in node_modules for the import
import {render} from 'react-dom'; // an export inclosed in {} is a single export
import {BrowserRouter, Match, Miss} from 'react-router';

import registerServiceWorker from './registerServiceWorker';

import './css/style.css'; // importing a path tells react to follow the file structure to find the import

import App from './components/App'; // an export without {} is a default export
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const basename = window.location.origin.includes(`github.io`)
	? `/${window.location.pathname.split(`/`)[1]}`
	: ``;

const Root = () => {
	return (
		<BrowserRouter basename={basename}>
			<div>
				<Match
					exactly
					pattern="/"
					component={StorePicker}
				/>
				<Match
					pattern="/store/:storeId"
					component={App}
				/>
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	);
};

render(<Root />, document.querySelector(`#main`));

registerServiceWorker();
