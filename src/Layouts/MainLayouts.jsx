import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import AllIssues from '../Pages/AllIssues';
import RecentIssues from '../Pages/RecentIssues';

const MainLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <RecentIssues></RecentIssues>
            <AllIssues></AllIssues>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayouts;