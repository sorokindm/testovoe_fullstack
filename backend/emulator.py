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
    return random() <= chance

def get_temperature():
    """Получает значение температуры"""
    if check_random_error():
        return "error"
    
    temperature = max(-20, min(temperature + random.randint(-5,5), 40))
    return temperature

def get_humidity():
    """Получает значение влажности"""
    if check_random_error():
        return "error"
    
    humidity = max(0, min(temperature + random.randint(-5,5), 100))
    return humidity

def get_pressure():
    """Получает значение давления"""
    if check_random_error():
        return "error"
    
    pressure = max(700, min(temperature + random.randint(-10,10), 780))
    return pressure



def fetch_parameters():
    """Получает значения параметров"""

    if not online:
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
    random_lag()
    return "OK" if online else "OFFLINE"

def parse_command(command):
    """Определяет и исполняет команду устройству"""
    random_lag()
    match command:
        case "onoff":
            online = not online
        case _:
            return