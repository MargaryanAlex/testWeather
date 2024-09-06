import React, { useState } from "react";
import Temperature from "../temperature";
import Graph from "../graph";
import { IForecastDay } from "../../models/wheatherApiResponse.model";
import styles from "./style.module.css";
const NextDays = ({ id, day }: { id: string; day: IForecastDay }) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div
      id={id}
      className={visible ? styles.active : styles.perDay}
      onClick={() => {
        setVisible(!visible);
      }}
    >
      <Temperature
        className={styles.currentDay}
        style={{ cursor: "pointer" }}
        date={day.date}
        icon={day.day.condition.icon}
        innerText={`${day.day.maxtemp_c}/${day.day.mintemp_c}`}
      />
      <div className={styles.perHour}>
        <Graph hours={day.hour} />
      </div>
    </div>
  );
};

export default NextDays;
