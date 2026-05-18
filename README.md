#Инструкция по запуску на windows

##С Docker


##Без Docker
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