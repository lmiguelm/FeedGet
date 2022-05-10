import React from 'react';
import ReactDOM from 'react-dom/client';
import { Widget } from './components/Widget';

import './global.css';

ReactDOM.createRoot(document.getElementById('feedback')!).render(<Widget />);
