import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import MovieIcon from '@mui/icons-material/Movie';
import HomeFilledIcon from '@mui/icons-material/HomeFilled';
import SearchIcon from '@mui/icons-material/Search';

export default function BottomNav() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        display: { xs: 'flex', md: 'none' },
        backgroundColor:'#1e1e1e',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
      showLabels
    >
      <BottomNavigationAction label="Home" icon={<HomeFilledIcon />} sx={{color:'gray'}} />
      <BottomNavigationAction label="Catalog" icon={<MovieIcon />} sx={{color:'gray'}} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} sx={{color:'gray'}} />
    </BottomNavigation>
  );
}
