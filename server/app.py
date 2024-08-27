from flask import Flask

app=Flask(__name__)

import requests
import time
import pickle
import statsmodels
import pandas as pd
# import matplotlib.pyplot as plt
# from matplotlib.animation import FuncAnimation
# Define your API URL, city, and API key
api_url = "http://api.openweathermap.org/data/2.5/weather"
city = "Delhi"
api_key = "1031e82180981b48e6b9fba105594774"  # Replace with your actual API key

def get_temperature_and_humidity():
    """
    Function to make an API call and return the temperature.
    """
    # Construct the full URL
    url = f"{api_url}?q={city}&appid={api_key}&units=metric"
    
    # Make the request
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        
        # Extract temperature
        temperature = data['main']['temp']
        humidity = data['main']['humidity']
        
        return temperature,humidity
    else:
        print(f"Failed to retrieve data. Status code: {response.status_code}")
        return None


# # Load the temperature prediction model
# with open('temperature_model.pkl', 'rb') as f:
#     model_temp = pickle.load(f)

# # Load the humidity prediction model
# with open('humidity_model.pkl', 'rb') as f:
#     model_humid = pickle.load(f)

# # Load The price model
# with open('price_pred.pkl', 'rb') as f:
#     model_price = pickle.load(f)

def predict_rice_price(model_fit, temperature, humidity):
    temperature 
    humidity 
    inflation = 6.5
    sowing_area = 500
    exog_input = pd.DataFrame({
        'Temperature (°C)': [temperature],
        'Humidity (%)': [humidity],
        'Inflation Rate (%)': [inflation],
        'Sowing Area (hectares)': [sowing_area]
    })
    forecast = model_fit.get_forecast(steps=1, exog=exog_input)
    predicted_price = forecast.predicted_mean[0]
    return predicted_price


@app.route('/')
def home():
    #actual_temp,  actual_humidity = get_temperature_and_humidity()
    with open('price_pred_model.pkl', 'rb') as f:
        model_price = pickle.load(f)
    pred_price=predict_rice_price(model_price, actual_temp, actual_humidity)
    return f"The predicted Price is: {pred_price}" 

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)