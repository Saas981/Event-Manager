import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs as MuiTabs, Tab as MuiTab, TabsList as BaseTabsList } from '@mui/base';
import { TabPanel as BaseTabPanel } from '@mui/base';
import { AccountCircle, Lock, Notifications, Brush, Language } from '@mui/icons-material';
import { buttonClasses } from '@mui/base/Button';
import {  tabClasses } from '@mui/base/Tab';


export default function StyledTabs({ selectedValue, onChange,theme }) {
  return (
    <MuiTabs value={selectedValue} onChange={onChange}>
      <TabsList>
        <StyledTab value={0} >
            <AccountCircle />
          Account Settings
        </StyledTab>
        <StyledTab value={1} >
            <Lock />
          Privacy
        </StyledTab>
        <StyledTab value={2} >
            <Notifications />
          Notifications
        </StyledTab>
        <StyledTab value={3} >
            <Brush />
          Customization
        </StyledTab>
        <StyledTab value={4}>
            <Language />
          Languages
        </StyledTab>
      </TabsList>
    </MuiTabs>
  );
}

const lightPurple = {
  50: '#EAE4F7',
  100: '#D3C8EF',
  200: '#B799E8',
  300: '#9F6BDF',
  400: '#8A4FD5',
  500: '#7529CC',
  600: '#6A25C3',
  700: '#5A1FAB',
  800: '#4B1993',
  900: '#3D146E',
};

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const StyledTab = styled(MuiTab)`
  font-family: 'Poppins', sans-serif;
  color: #000; /* Change text color to black */
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 16px 10px;
  margin: 0px;
  border: none;
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${lightPurple[50]};
  }

  &:focus {
    color: #000;
        background-color: ${lightPurple[50]};

  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${lightPurple[600]};
            background-color: ${lightPurple[50]};

  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
};
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  width: 100%;
  font-family: 'Poppins', sans-serif;
  font-size: 0.875rem;
  padding: 20px 12px;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  `,
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  
  border-radius: 16px;
  margin-bottom: 0px;
  background-color:none;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin:0px;
  padding-top:0px;
  padding-bottom:0px;
 box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  `,
);
