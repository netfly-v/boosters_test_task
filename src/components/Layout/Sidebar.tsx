import {List, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {route} from '../../constants/route';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    navigate(url);
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: '#a9c3ba',
        paddingTop: 0,
        '@media (max-width: 1024px)': {maxWidth: 180},
        '@media (max-width: 640px)': {maxWidth: '100%', display: 'flex'},
      }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton sx={{'@media (max-width: 640px)': {textAlign: 'center'}}} onClick={() => handleClick(route.main)}>
        <ListItemText primary="Main" />
      </ListItemButton>
      <ListItemButton
        sx={{'@media (max-width: 640px)': {textAlign: 'center'}}}
        onClick={() => handleClick(route.about)}>
        <ListItemText primary="About" />
      </ListItemButton>
    </List>
  );
};
