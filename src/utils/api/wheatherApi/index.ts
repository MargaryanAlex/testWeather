import { IWheatherResponse } from "../../../models/wheatherApiResponse.model";
import RequestService from "../request-service";

class WeatherAPI {
  static getWheather = (city: string) => {
    return RequestService.GET<null, IWheatherResponse>(
      `http://api.weatherapi.com/v1/forecast.json?key=18726df76ae44721a19201346222501&q=${city}&days=5&aqi=no&alerts=no`
    );
  };
}

export default WeatherAPI;
