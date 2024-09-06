import { IWheatherResponse } from "../../../models/wheatherApiResponse.model";
import RequestService from "../request-service";

class CordinatesApi {
  static getCordinates = (latitude: number, longitude: number) => {
    return RequestService.GET<null, IWheatherResponse>(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
  };
}

export default CordinatesApi;
