import { useState } from "react";
import MonitorPanel from "./MonitorPanel";
import RestComponent from "./RestComponent";

export default MainPage;

function MainPage() {

    const [monitor, setMonitor] = useState<boolean>(false);


  return (
  <>
    <div className="main-page">
        <button onClick={()=>setMonitor(prev=>!prev)}>{monitor?"Скрыть ":"Показать "}панель мониторинга</button>
        {monitor?<MonitorPanel/>:null}
        <RestComponent/>
    </div>
  </>);
}
