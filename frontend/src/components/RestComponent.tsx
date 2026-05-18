import { useState } from "react";

export default RestComponent;

function RestComponent() {
  const [result, setResult] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const handleChange = (event:React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setCommand(event.target.value);
    event.preventDefault();
  };

  function fetchStatus() {
    fetch("http://127.0.0.1:5000/api/status")
      .then((x) => x.json())
      .then((x) => setResult(JSON.stringify(x)));
  }

  function fetchParameters() {
    fetch("http://127.0.0.1:5000/api/parameters")
      .then((x) => x.json())
      .then((x) => setResult(JSON.stringify(x)));
  }

  function sendCommand() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command: command }),
    };
    fetch("http://127.0.0.1:5000/api/commands", requestOptions)
      .then((x) => x.json())
      .then((x) => setResult(JSON.stringify(x)));
  }

  return (
    <>
      <div className="rest-wrapper">
        <div className="controls">
          <div>
            <button onClick={fetchStatus}>Получить статус</button>
          </div>
          <div>
            <button onClick={fetchParameters}>Получить параметры</button>
          </div>
          <div>
            <button onClick={sendCommand}>Отправить команду</button>
            <input type="text" onChange={handleChange} value={command} />
          </div>
        </div>
        <fieldset className="result">
          <legend>Результат</legend>
          <p>{result}</p>
        </fieldset>
      </div>
    </>
  );
}
