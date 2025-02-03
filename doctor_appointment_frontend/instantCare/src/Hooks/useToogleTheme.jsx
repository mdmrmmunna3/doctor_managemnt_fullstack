import React, { useEffect, useState } from 'react';

const useToogleTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('light');
            setIsDarkMode(false);
        }
    }, [])
    const handleToggleTheme = () => {
        const darkModeEnabled = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', darkModeEnabled ? 'dark' : 'light');
        setIsDarkMode(darkModeEnabled);
    };
    return [isDarkMode, handleToggleTheme];
};

export default useToogleTheme;