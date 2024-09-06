export interface IWheatherResponse {
  current: {
    last_updated: string;
    last_updated_epoch: number;
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    condition: { text: string; icon: string; code: number };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    is_day: 1 | 0;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  forecast: {
    forecastday: IForecastDay[];
  };
  location: {
    lat: number;

    lon: number;
    name: string;
    region: string;
    country: string;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
}

export interface IHour {
  ime_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  condition: { text: string; icon: string; code: number };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  snow_cm: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: 1 | 0;
  will_it_snow: 1 | 0;
  is_day: 1 | 0;
  vis_km: number;
  vis_miles: number;
  chance_of_rain: number;
  chance_of_snow: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
  short_rad: number;
  diff_rad: number;
  air_quality: IAirQuality;
}

export interface IAirQuality {
  co: number;
  o3: number;
  no2: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

export interface IForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    condition: { text: string; icon: string; code: number };
    uv: number;
    daily_will_it_rain: 1 | 0;

    daily_will_it_snow: 1 | 0;

    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonriseL: string;
    moonset: string;
    moon_phase: string;
  };
  air_quality: IAirQuality;
  hour: IHour[];
}
