import { createTheme } from '@mui/material';
import { useMemo } from 'react';

import customShadows from './customShadows';
import palette from './pallete';

const BaseTheme = createTheme({
    palette,
    shape: { borderRadius: 6 }
});

export default BaseTheme;