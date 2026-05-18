import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { parameters } from "./MonitorPanel";

export default MonitorPanelData;

export interface Props {
  data: parameters[];
  setData: Dispatch<SetStateAction<parameters[]>>;
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
}

function MonitorPanelData({ data, setData, setStatus }: Props) {
  const socket = useRef<WebSocket>(null);

  const [reconnectAttempts, setAttempts] = useState<number>(0)

  function fetchParameters() {
    socket?.current !=null?socket.current.send("parameters"):null;
  }

  function appendNewData(newData: parameters) {
    if (!validateNewData(newData)) return;
    newData.key = crypto.randomUUID();
    let now = new Date();
    newData.time = now.toLocaleTimeString();
    setData((prevData) => [...prevData, newData]);
  }

  function validateNewData(newData: parameters): Boolean {
    return (
      typeof newData === "object" &&
      newData != null &&
      typeof newData.temperature === "number" &&
      typeof newData.humidity === "number" &&
      typeof newData.pressure === "number"
    );
  }

  useEffect(() => {
    if (data.length > 15) setData((prevData) => [...prevData].slice(1));
  }, [data]);

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000/ws");
    socket.current.onopen = () => {
      console.log("Connected");
      setStatus("ОК");
    };
    socket.current.onmessage = (event) => appendNewData(JSON.parse(event.data));
    socket.current.onclose = () => {
      console.log("Disconnected");
      setStatus("OFFLINE");
    };
  }

  useEffect(() => {
    if (socket.current === null || socket.current.readyState === socket.current.CLOSED) {
      connect();
      return () => {
        if (socket.current) {
          socket.current.close();
        }
      };
    }
  }, [reconnectAttempts]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (socket?.current!=null&&socket.current.readyState === socket.current.OPEN) {
        fetchParameters();
      }

      if (socket?.current!=null&&socket.current.readyState === socket.current.CLOSED) {
        setStatus("OFFLINE");
        setAttempts(attempts=>attempts+1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <></>;
}
