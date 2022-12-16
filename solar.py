import requests

x = requests.get(
    'http://192.168.0.111/SolarMDApi/auth', 
    headers={'Authorization':'Apikey ED1A018FFAE74B00BBA4C81F17E72C89C18E90F80BDB0ADFDCFFC1BDBAF0FD5B'}
)
print(x)