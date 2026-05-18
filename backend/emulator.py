import random
import time

online = True
temperature = 10
humidity = 50
pressure = 750

def random_lag():
    """Получение значения и запуск случайной задёржки"""
    lag= random.uniform(0.05,0.35)
    time.sleep(lag)

def check_random_error():
    """Проверка шанса случайной ошибки"""
    chance = 0.05
    return random.random() <= chance

def get_temperature():
    """Получает значение температуры"""
    
    global temperature
    temperature = max(-20, min(temperature + random.randint(-5,5), 40))
    return temperature

def get_humidity():
    """Получает значение влажности"""
    
    global humidity
    humidity = max(0, min(humidity + random.randint(-5,5), 100))
    return humidity

def get_pressure():
    """Получает значение давления"""

    global pressure
    pressure = max(700, min(pressure + random.randint(-10,10), 780))
    return pressure



def fetch_parameters():
    """Получает значения параметров"""

    if not online or check_random_error():
        return "error"
    
    dict = {
        "temperature": get_temperature(),
        "humidity": get_humidity(),
        "pressure": get_pressure()
    }
    random_lag()
    return dict

def status():
    """Статус устройства"""
    if check_random_error():
        raise ConnectionError("Устройство не найдено")
    random_lag()
    status = {
        "status": "OK" if online else "OFFLINE"
    }
    return status

def parse_command(command):
    """Определяет и исполняет команду устройству"""
    random_lag()
    global online
    match command:
        case "onoff":
            online = not online
        case _:
            return