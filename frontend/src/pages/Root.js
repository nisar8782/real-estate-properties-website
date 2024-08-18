import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
// import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function RootLayout() {
    // const navigation = useNavigation();
    // navigation.state === ''

    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}