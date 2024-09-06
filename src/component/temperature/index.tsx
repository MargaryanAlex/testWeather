import { CSSProperties } from "react";
import styles from "./style.module.css";

interface Iprops {
  className: string;
  style: CSSProperties;
  date: string;
  innerText: string;
  icon: string;
}

const Temperature = ({ className, style, date, innerText, icon }: Iprops) => {
  return (
    <div className={className || ""} style={style || {}}>
      <p>
        {date} <span>{innerText}&deg;c</span>
      </p>
      <div className={styles.arrow}>
        <img src={icon} alt="icon" />
        <span>&#9660; </span>
      </div>
    </div>
  );
};

export default Temperature;
