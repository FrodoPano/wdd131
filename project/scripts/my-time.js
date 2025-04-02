document.addEventListener('DOMContentLoaded', function() {
    // Set current year and last modified date
    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    // Mobile navigation - same as map.js
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const hamburgerIcon = hamburgerBtn.querySelector('i');

    function toggleMenu() {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        if (mainNav.classList.contains('active')) {
            hamburgerIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            hamburgerIcon.classList.replace('fa-times', 'fa-bars');
        }
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
        hamburgerIcon.classList.replace('fa-times', 'fa-bars');
    }

    hamburgerBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') && !mainNav.contains(e.target) && e.target !== hamburgerBtn) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Clock functionality
    const hourHand = document.querySelector('.hour-hand');
    const minuteHand = document.querySelector('.minute-hand');
    const secondHand = document.querySelector('.second-hand');
    const digitalClock = document.querySelector('.digital-clock');
    const timezoneInfo = document.querySelector('.timezone-info');
    const locationInfo = document.querySelector('.location-info');
    const dateInfo = document.querySelector('.date-info');

    function updateClock() {
        const now = new Date();
        
        // Analog clock
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours() % 12;
        
        const secondsDegrees = (seconds / 60) * 360 + 90;
        const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
        const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30 + 90;
        
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
        
        // Digital clock and info
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString(undefined, { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        digitalClock.textContent = timeString;
        dateInfo.textContent = dateString;
        
        // Timezone and location
        try {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            timezoneInfo.textContent = `Timezone: ${timezone}`;
            
            // Get location if permission is granted
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        fetch(`https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`)
                            .then(response => response.json())
                            .then(data => {
                                const city = data.city || 'Unknown City';
                                const country = data.country || 'Unknown Country';
                                locationInfo.textContent = `Location: ${city}, ${country}`;
                            })
                            .catch(() => {
                                locationInfo.textContent = 'Location: Unknown (service unavailable)';
                            });
                    },
                    () => {
                        locationInfo.textContent = 'Location: Permission not granted';
                    }
                );
            } else {
                locationInfo.textContent = 'Location: Geolocation not supported';
            }
        } catch (e) {
            timezoneInfo.textContent = 'Timezone: Unknown';
            locationInfo.textContent = 'Location: Unknown';
        }
    }

    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
});