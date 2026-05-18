import { useState } from "react";
import MonitorPanelData from "./MonitorPanelData";

export default MonitorPanel;

export interface parameters {
  temperature: number;
  humidity: number;
  pressure: number;
  key: string;
  time: string;
}

function MonitorPanel() {
  const [data, setData] = useState<parameters[]>([]);
  const [status, setStatus] = useState<string>("OFFLINE")

  function getHeightPercentTemp(temp:number): number {
    let min = data.map((item) => item.temperature).reduce((a, b) => Math.min(a, b));
    let max = data.map((item) => item.temperature).reduce((a, b) => Math.max(a, b));
    return Math.max((temp - min) / (max - min)*100, 10) ;
  }

  function getHeightPercentPressure(pressure:number): number {
    let min = data.map((item) => item.pressure).reduce((a, b) => Math.min(a, b));
    let max = data.map((item) => item.pressure).reduce((a, b) => Math.max(a, b));
    return Math.max((pressure - min) / (max - min)*100, 10);
  }

  function getHeightPercentHumidity(humidity:number): number {
    return humidity;
  }

  return (
    <>
        <h1>Статус подключения:{status}</h1>
      <div className="panel-container">
        <MonitorPanelData data={data} setData={setData} setStatus={setStatus} status={status} />

        <h1 className="center">Температура</h1>
        <div className="history">
          {data.map((item) => (
            <>
            <div className="column">
                <div key={item.key} className="temp-column" style={{ height: `${getHeightPercentTemp(item.temperature)}%` }}>
              </div>
                {`${item.time}`}
                <br/>
                <strong>{`${item.temperature}°`}</strong>
            </div>

            </>
          ))}
        </div>

         <h1 className="center">Влажность</h1>
        <div className="history">
          {data.map((item) => (
            <>
            <div className="column">
                <div key={item.key} className="hum-column" style={{ height: `${getHeightPercentHumidity(item.humidity)}%` }}>
              </div>
                {`${item.time}`}
                <br/>
                <strong>{`${item.humidity}°`}</strong>
            </div>
            </>
          ))}
        </div>

          <h1 className="center">Давление</h1>
        <div className="history">
          {data.map((item) => (
            <>
            <div className="column">
                <div key={item.key} className="pres-column" style={{ height: `${getHeightPercentPressure(item.pressure)}%` }}>
              </div>
                {`${item.time}`}
                <br/>
                <strong>{`${item.pressure}°`}</strong>
            </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
