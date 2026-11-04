import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import CookieBanner from '@/components/CookieBanner';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<App />
		<CookieBanner />
	</>
);
