import { createRoot } from 'react-dom/client';
import Blog from './Blog.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store.js';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<BrowserRouter>
			<Blog />
		</BrowserRouter>
	</Provider>,
);
