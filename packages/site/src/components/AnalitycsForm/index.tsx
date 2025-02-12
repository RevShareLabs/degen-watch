import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import type { OptionType } from '../../types';

const FormWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.card?.default};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.default};
  padding: 2.4rem;
  align-self: stretch;
  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    padding: 1.6rem;
  }
`;
type CardProps<Type> = {
  content: {
    title?: string;
  };
  selectedValues: Type[];
  data: OptionType<Type>[];
  onChange: (val: Type) => void;
};

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  margin-bottom: 0.3rem;

  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;
// todo: form settings
const CheckboxIcoSize = 24;
const CheckboxLabelSize = 18;
const CheckboxLabelMb = 4;
const CheckboxLabelPosition = 'end';

export const AnalyticsForm = <Type,>({
  content,
  data,
  selectedValues,
  onChange,
}: CardProps<Type>) => {
  const { title } = content;
  return (
    <FormWrapper>
      <FormControl component="fieldset">
        <Title>{title}</Title>
        <Divider />
        <FormGroup
          sx={{
            marginTop: 1,
          }}
        >
          {data.map(({ label, value }, index) => (
            <FormControlLabel
              key={index}
              checked={selectedValues?.includes(value)}
              control={
                <Checkbox
                  color="primary"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: CheckboxIcoSize } }}
                />
              }
              onChange={() => onChange(value)}
              label={label}
              labelPlacement={CheckboxLabelPosition}
              sx={{ span: { fontSize: CheckboxLabelSize } }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </FormWrapper>
  );
};
