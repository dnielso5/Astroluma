import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { WiDaySunny, WiDaySunnyOvercast, WiCloud, WiSmog, WiDayRain, WiNightSnow, WiDaySnowThunderstorm } from "react-icons/wi";
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, weatherDataState } from '../../atoms';
import ApiService from '../../utils/ApiService';

const WeatherWidget = () => {
    const loginData = useRecoilValue(loginState);
    const [weatherData, setWeatherData] = useRecoilState(weatherDataState);
    const [weatherIcon, setWeatherIcon] = useState(<WiCloud size={64} />);

    const loadWeatherData = useCallback(() => {
        ApiService.get("/api/v1/weather", loginData ? loginData?.token : null, null)
            .then(data => {
                setWeatherData(data?.message);
            })
            .catch(() => {
                //toast.error("Error loading data...");
            })
    }, [loginData, setWeatherData]);

    useEffect(() => {
        loadWeatherData();
    }, [loadWeatherData]);

    const weatherCodeToIcon = useMemo(() => ({
        0: <WiDaySunny size={64} />,  // Clear sky
        1: <WiDaySunnyOvercast size={64} />,  // Mainly clear
        2: <WiCloud size={64} />,  // Partly cloudy
        3: <WiCloud size={64} />,  // Overcast
        45: <WiSmog size={64} />,  // Fog
        48: <WiSmog size={64} />,  // Depositing rime fog
        51: <WiDayRain size={64} />,  // Light drizzle
        53: <WiDayRain size={64} />,  // Moderate drizzle
        55: <WiDayRain size={64} />,  // Dense drizzle
        56: <WiDayRain size={64} />,  // Freezing Drizzle: Light and dense intensity
        57: <WiDayRain size={64} />,  // Freezing Drizzle: Light and dense intensity
        61: <WiDayRain size={64} />,  // Slight rain
        63: <WiDayRain size={64} />,  // Moderate rain
        65: <WiDayRain size={64} />,  // Heavy rain
        66: <WiDayRain size={64} />,  // Freezing Rain: Light and heavy intensity
        67: <WiDayRain size={64} />,  // Freezing Rain: Light and heavy intensity
        71: <WiNightSnow size={64} />,  // Snow fall: Slight, moderate, and heavy intensity
        73: <WiNightSnow size={64} />,  // Snow fall
        75: <WiNightSnow size={64} />,  // Snow fall
        77: <WiNightSnow size={64} />,  // Snow fall
        80: <WiDayRain size={64} />,  // Slight showers
        81: <WiDayRain size={64} />,  // Moderate showers
        82: <WiDayRain size={64} />,  // Violent showers
        85: <WiDayRain size={64} />,  // Violent showers
        86: <WiDayRain size={64} />,  // Violent showers
        95: <WiDaySnowThunderstorm size={64} />,  // Thunderstorm
        96: <WiDaySnowThunderstorm size={64} />,  // Thunderstorm
        99: <WiDaySnowThunderstorm size={64} />  // Thunderstorm
    }), []); // Empty dependency array since icons never change

    useEffect(() => {
        setWeatherIcon(weatherCodeToIcon[weatherData?.weatherCode]);
    }, [weatherData, weatherCodeToIcon]);

    return (
        <div className="hidden md:flex items-center space-x-4 mb-4">
            <div>
                <h2 className="text-2xl sm:text-3xl Orbitron text-weatherTemperatureText">{weatherData?.temperature} {weatherData?.unit}</h2>
                <p className="text-xs sm:text-sm text-weatherStatusText">{weatherData?.weatherDescription}</p>
            </div>
            <div>
                <h2 className="text-4xl text-weatherIconTintColor">{weatherIcon}</h2>
            </div>
        </div>
    );
};

const MemoizedComponent = React.memo(WeatherWidget);
export default MemoizedComponent;