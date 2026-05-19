## Инструкция по запуску на windows
Должен быть установлен Python и npm

Открыть консоль, перейти в /backend
<br>
python -m venv .venv
<br>
.venv/scripts/activate
<br>
pip install -r ./requirements.txt
<br>
flask run
<br>

Новое окно консоли, перейти во /frontend
<br>
npm install
<br>
npm run dev
<br>

Приложение на localhost:5173

## Архитектура
Backend Flask
<br>
GET /api/status
{
	"status": value 
}
value: OK, OFFLINE

<br>

GET /api/parameters
{
	"temperature": <number>,
	"humidity": <number>,
	"pressure": <number>,
}

<br>

POST /api/commands 
{
	"command": <string>
}
<br>
Допустимая команда: "onoff"

WS /ws
Для связи монитора параметров

