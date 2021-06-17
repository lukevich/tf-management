import { createContext } from 'react';

export default createContext({ screen: { width: window.innerWidth, height: window.innerHeight } });
