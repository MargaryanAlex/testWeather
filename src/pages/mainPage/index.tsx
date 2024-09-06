import { Fragment, useCallback, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { IWheatherResponse } from "../../models/wheatherApiResponse.model";
import WeatherAPI from "../../utils/api/wheatherApi";
import { AxiosError, AxiosResponse } from "axios";
import CordinatesApi from "../../utils/api/cordinatesApi";
import NextDays from "../../component/nextDays";
import styles from "./style.module.css";

const wheatersByIndex = [
  { min: 1000, max: 1000, name: "clear" },
  { min: 1003, max: 1009, name: "cloudy" },
  { min: 1030, max: 1030, name: "foggy" },
  { min: 1067, max: 1087, name: "storm" },
  { min: 1114, max: 1117, name: "snow" },
  { min: 1135, max: 1147, name: "foggy" },
  { min: 1150, max: 1200, name: "rain" },
  { min: 1201, max: 1237, name: "snow" },
  { min: 1243, max: 1252, name: "rain" },
  { min: 1255, max: 1264, name: "snow" },
  { min: 1273, max: 1282, name: "storm" },
];

const MainPage = () => {
  const [error, setErrorMassege] = useState<AxiosError | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [items, setItems] = useState<IWheatherResponse | null>(null);
  const [city, setCity] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<string>("");
  let timeout: NodeJS.Timeout;
  const setError = (err: AxiosError) => {
    setErrorMassege(err);
    timeout = setTimeout(() => setErrorMassege(null), 5000);
  };

  const success = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    try {
      const {
        data: { city },
      }: AxiosResponse = await CordinatesApi.getCordinates(latitude, longitude);
      try {
        const response: AxiosResponse<IWheatherResponse> =
          await WeatherAPI.getWheather(city);

        setItems(response.data);
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      setError(err as AxiosError);
      console.error(err);
    }
  };

  const onEnter = useCallback(
    (e: KeyboardEvent) => {
      setErrorMassege(null);

      if (e.key === "Enter") {
        setCity(value);
        setValue("");
      }
    },
    [value]
  );

  useEffect(() => {
    (async () => {
      if (city) {
        try {
          const response: AxiosResponse<IWheatherResponse> =
            await WeatherAPI.getWheather(city);
          setItems(response.data);
        } catch (err) {
          console.error(err);

          setError(err as AxiosError);
        }
      } else {
        try {
          navigator.geolocation.getCurrentPosition(success, async (error) => {
            const response: AxiosResponse<IWheatherResponse> =
              await WeatherAPI.getWheather("yerevan");
            setItems(response.data);
          });
        } catch (err) {
          console.error(err);

          setError(err as AxiosError);
        }
      }

      setIsLoaded(true);
    })();
  }, [city]);

  useEffect(() => {
    window.addEventListener("keypress", onEnter);
    clearTimeout(timeout);
    return () => {
      window.removeEventListener("keypress", onEnter);
    };
  }, [value]);

  if (!isLoaded) {
    return (
      <div className={styles.loader}>
        <Oval color="#00BFFF" height={200} width={200} />
      </div>
    );
  } else {
    return (
      <div
        className={styles.background}
        style={{
          backgroundImage: `url( "https://s.yimg.com/os/mit/media/m/weather/images/fallbacks/lead/${
            items
              ? wheatersByIndex.find(
                  (wheater) =>
                    items.current.condition.code >= wheater.min &&
                    items.current.condition.code <= wheater.max
                )?.name
              : ""
          }_${items && items.current.is_day === 1 ? "d" : "n"}-e618500.jpg")`,
        }}
      >
        <div className={styles.container}>
          <p className={styles.city}>{items?.location.name}</p>
          <p className={styles.data}>
            Last updated {items?.current.last_updated}
          </p>
          <div className={styles.inputArea}>
            <input
              type={"text"}
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              placeholder="Search"
            />
            <FaSearch />
            {!!error ? <p className={styles.error}>it's not found</p> : null}
          </div>

          <span className={styles.icon}>
            <img src={items?.current.condition.icon} alt="icon" />
            {items?.current.condition.text}
          </span>
          <p className={styles.celsius}>{items?.current.feelslike_c} &deg;c</p>
          {items?.forecast.forecastday?.map((day, index) => {
            return (
              <Fragment key={index}>
                <NextDays id={day.date + index} day={day} />
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  }
};

export default MainPage;
