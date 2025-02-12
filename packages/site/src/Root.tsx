import {
  ThemeProvider as ThemeProviderMui,
  createTheme,
} from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { dark, light } from './config/theme';
import { StateProvider } from './contexts/StateContext';
import { MetaMaskProvider } from './hooks';
import { getDesignTokens } from './theme';
import { getThemePreference, setLocalStorage } from './utils';

export type RootProps = {
  children: ReactNode;
};

type ToggleTheme = () => void;

export const ToggleThemeContext = createContext<ToggleTheme>(
  (): void => undefined,
);

export const Root: FunctionComponent<RootProps> = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(getThemePreference());

  const queryClient = new QueryClient();

  const toggleTheme: ToggleTheme = () => {
    setLocalStorage('theme', darkTheme ? 'light' : 'dark');
    setDarkTheme(!darkTheme);
  };

  const theme = useMemo(
    () => createTheme(getDesignTokens(darkTheme ? 'dark' : 'light')),
    [darkTheme],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToggleThemeContext.Provider value={toggleTheme}>
        <ThemeProvider theme={darkTheme ? dark : light}>
          <ThemeProviderMui theme={theme}>
            <StateProvider>
              <MetaMaskProvider>{children}</MetaMaskProvider>
            </StateProvider>
          </ThemeProviderMui>
        </ThemeProvider>
      </ToggleThemeContext.Provider>
    </QueryClientProvider>
  );
};
