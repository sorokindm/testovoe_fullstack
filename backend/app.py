import json

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sock import Sock
import emulator

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
sock = Sock(app)


@app.route("/api/status", methods=['GET'])
def status():
    try:
        status = emulator.status()
    except ConnectionError:
        app.logger.exception("Произошла ошибка проверки статуса устройства")
    return jsonify(status)

@app.route("/api/parameters", methods=['GET'])
def parameters():
    result = emulator.fetch_parameters()
    if result == "error":
        app.logger.error("Произошла ошибка чтения с датчиков")
        return {}
    
    return result

@app.route("/api/commands", methods=['POST'])
def commands():
    data = request.get_json()
    command = data["command"]
    app.logger.info(f"Принята команда {command}")
    if validate_command(command):
        emulator.parse_command(command)
        return {"response": "Команда исполнена"}
    return {"response": "Команда не найдена"}

def validate_command(command):
    """Проверяет правильность введённой команды"""
    return True if command == "onoff" else False

@sock.route('/ws')
def echo(ws):
        while True:
            data = ws.receive()
            if data == "parameters":
                ws.send(json.dumps(parameters()))
            else:
                ws.send("Неизвестный запрос")
