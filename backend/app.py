from flask import Flask, request
from flask_socketio import SocketIO
import emulator

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/api/status", methods=['GET'])
def status():
    return emulator.status()

@app.route("/api/parameters", methods=['GET'])
def parameters():
    return emulator.fetch_parameters()

@app.route("/api/commands", methods=['POST'])
def commands():
    data = request.get_json()
    command = data["command"]
    if validate_command(command):
        emulator.parse_command(command)
        return "OK"
    return "NOT OK"

def validate_command(command):
    """Проверяет правильность введённой команды"""
    return True if command == "onoff" else False

if __name__ == '__main__':
    socketio.run(app)