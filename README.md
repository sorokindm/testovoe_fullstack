#Инструкция по запуску на windows
Должен быть установлен Python и npm

Открыть консоль, перейти в /backend
python -m venv .venv
.venv/scripts/activate
pip install -r ./requirements.txt
flask run

Новое окно консоли, перейти во /frontend
npm install
npm run dev

Приложение на localhost:5173

#Архитектура
Backend Flask
GET /api/status
{
	"status": value 
}
value: OK, OFFLINE

GET /api/parameters
{
	"temperature": <number>,
	"humidity": <number>,
	"pressure": <number>,
}

POST /api/commands 
{
	"command": <string>
}
Допустимая команда: "onoff"

WS /ws
Для связи монитора параметров

