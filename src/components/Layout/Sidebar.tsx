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
      sx={{width: '100%', maxWidth: 360, bgcolor: '#a9c3ba', paddingTop: 0}}
      component="nav"
      aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={() => handleClick(route.main)}>
        <ListItemText primary="Main" />
      </ListItemButton>
      <ListItemButton onClick={() => handleClick(route.about)}>
        <ListItemText primary="About" />
      </ListItemButton>
    </List>
  );
};
