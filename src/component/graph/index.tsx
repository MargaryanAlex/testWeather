import { useEffect, useState } from "react";
import {
  CartesianGrid,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from "recharts";
import { IHour } from "../../models/wheatherApiResponse.model";

interface IData {
  name: string;
  pv: string;
}

const Graph = ({ hours }: { hours: IHour[] }) => {
  const [data, setData] = useState<IData[]>([]);
  useEffect(() => {
    hours.map((hour) =>
      setData((prevData) => [
        ...prevData,
        {
          name: hour.time.split("").splice(-5, 5).join(""),
          pv: hour.temp_c,
        } as unknown as IData,
      ])
    );
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
