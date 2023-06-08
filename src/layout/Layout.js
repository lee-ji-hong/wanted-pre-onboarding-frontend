import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Outlet />
        </Box>
    );
}

export default Layout;