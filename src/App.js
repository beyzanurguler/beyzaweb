import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState('default');
  const [error, setError] = useState(null);
  const [showAbout, setShowAbout] = useState(false); // Hakkında bilgilerini gösterme durumu

  const API_KEY = 'BNJGMJ29VY29Y3C45A9RECQEQ';

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );  // Şablon dizesi düzeltildi
      setWeatherData(response.data);
      setError(null);
      const condition = response.data.currentConditions.conditions.toLowerCase();
      if (condition.includes('rain')) {
        setBackground('rainy');
      } else if (condition.includes('cloud')) {
        setBackground('cloudy');
      } else if (condition.includes('sun') || condition.includes('clear')) {
        setBackground('sunny');
      } else {
        setBackground('default');
      }
    } catch (error) {
      setError('Şehir bulunamadı. Lütfen doğru bir şehir girin.');
      setWeatherData(null);
    }
  };

  const toggleAbout = () => {
    setShowAbout(!showAbout);
  };

  return (
      <div className={`app ${background}`}> {/* className düzenlendi */}
        <div className="container circular-design">
          <h1>🌍 Hava Durumu Uygulaması 🌧️</h1>
          <input
              type="text"
              placeholder="Şehir Giriniz"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={fetchWeather}>Ara</button>

          {/* Hakkında Butonu */}
          <button className="about-btn" onClick={toggleAbout}>
            Hakkında
          </button>

          {showAbout && (
              <div className="about-info">
                <p>🌟 Tasarımcı: Beyzanur Güler</p>
                <p>🔧 Uygulama, hava durumu verilerini Visual Crossing API'siyle çekmektedir.</p>
              </div>
          )}

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {weatherData ? (
              <div className="weather-info">
                <h2>📍 {weatherData.address}</h2>
                <p>🌡️ Derece: {weatherData.currentConditions.temp}°C</p>
                <p>🌈 Durum: {weatherData.currentConditions.conditions}</p>
                <p>💨 Rüzgar: {weatherData.currentConditions.windspeed} km/sa</p>
              </div>
          ) : (
              !error && <p>Şehir aratınız.</p>
          )}
        </div>
      </div>
  );
};

export default App;
