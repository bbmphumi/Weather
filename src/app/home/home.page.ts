import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  cityName: string = '';
  weatherData: any = null;
  favorites: string[] = [];

  constructor(private weatherService: WeatherService) {
    this.loadFavorites();
  }

  getWeather() {
    if (!this.cityName.trim()) return;

    this.weatherService.getWeather(this.cityName).subscribe({
      next: (data: any) => {
        this.weatherData = data;
      },
      error: (err: any) => {
        console.error('Error fetching weather:', err);
        this.weatherData = null;
      },
    });
  }

  saveToFavorites() {
    if (this.cityName && !this.favorites.includes(this.cityName)) {
      this.favorites.push(this.cityName);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  selectFavorite(city: string) {
    this.cityName = city;
    this.getWeather();
  }
}


