import { useContext } from 'react';

import ScreenContext from 'contexts/screen';

const useScreen = () => useContext(ScreenContext);

export default useScreen;
