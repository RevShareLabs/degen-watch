import type { LoadingButtonProps } from '@mui/lab';
import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { useMetaMask, useRequestSnap } from '../hooks';
import { shouldDisplayReconnectButton } from '../utils';

const ButtonText = styled.span`
  margin-left: 1rem;
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background?.inverse};
  background-color: ${(props) => props.theme.colors.background?.inverse};
  color: ${(props) => props.theme.colors.text?.inverse};
  font-weight: bold;
  padding: 1.2rem;
`;

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

export const InstallFlaskButton = () => (
  <a href="https://metamask.io/flask/" target="_blank">
    <Button style={{ flexGrow: 1 }} size="large" variant="contained">
      <span>Install MetaMask Flask</span>
    </Button>
  </a>
);

export const MuiLoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <LoadingButton size="large" variant="contained" {...rest}>
      {children}
    </LoadingButton>
  );
};

export const HeaderButtons = () => {
  const [requestSnap, { isLoading }] = useRequestSnap();
  const { isFlask, installedSnap } = useMetaMask();

  if (!isFlask && !installedSnap) {
    return <InstallFlaskButton />;
  }

  if (!installedSnap) {
    return (
      <MuiLoadingButton
        disabled={isLoading}
        loading={isLoading}
        onClick={requestSnap}
      >
        <span>Install snap</span>
      </MuiLoadingButton>
    );
  }

  if (shouldDisplayReconnectButton(installedSnap)) {
    return (
      <MuiLoadingButton
        disabled={isLoading}
        onClick={requestSnap}
        loading={isLoading}
      >
        <span>Reconnect</span>
      </MuiLoadingButton>
    );
  }

  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Connected</ButtonText>
    </ConnectedContainer>
  );
};
