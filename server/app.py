from flask import Flask,jsonify

app=Flask(__name__)

import requests
import time
import pickle
import statsmodels
import pandas as pd
import os
from dotenv import load_dotenv
import sklearn
from flask_cors import CORS
print(sklearn.__version__)

from datetime import timedelta
from joblib import load
# import matplotlib.pyplot as plt
# from matplotlib.animation import FuncAnimation
# Define your API URL, city, and API key
CORS(app)
load_dotenv()

api_url = "http://api.openweathermap.org/data/2.5/weather"
city = "Delhi"
api_key = os.getenv('WEATHER_API')  # Replace with your actual API key

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

def update_predictions(actual_temp, actual_humidity, start_date, days=30):
    updated_predictions = []
    predicted_temp = [] 
    predicted_humidity = []
    current_date = start_date
    current_temp = actual_temp
    current_humidity = actual_humidity

    with open('humidity_model.joblib', 'rb') as f:
        model_humid = load(f)


    with open('temperature_model.joblib', 'rb') as f:
        model_temp = load(f)

    
    for i in range(days):
        updated_predictions.append((current_date, current_temp, current_humidity))
        predicted_temp.append(current_temp) 
        predicted_humidity.append(current_humidity)
        next_temp_1_day_ago = current_temp
        next_humidity_1_day_ago = current_humidity
        next_temp_7_days_ago = next_temp_1_day_ago if i < 6 else updated_predictions[i - 6][1]
        next_humidity_7_days_ago = next_humidity_1_day_ago if i < 6 else updated_predictions[i - 6][2]

        current_date += timedelta(days=1)
        # Using the predict method of the models
        current_temp = model_temp.predict([[next_temp_1_day_ago, next_temp_7_days_ago, current_date.dayofyear, current_date.month]])[0]
        current_humidity = model_humid.predict([[next_humidity_1_day_ago, next_humidity_7_days_ago, current_date.dayofyear, current_date.month]])[0]

        
    return predicted_temp, predicted_humidity

@app.route('/')
def index():
    return "<h1>Hello world</h1>"

@app.route('/api/Rice/<date>/<int:days>')
def home(date,days):
    #actual_temp,  actual_humidity = get_temperature_and_humidity()
    actual_temp=20.5
    actual_humidity=10.5
    with open('price_pred_model.pkl', 'rb') as f:
        model_price = pickle.load(f)
    start_date = pd.to_datetime(date)
    predicted_temp, predicted_humidity = update_predictions(actual_temp, actual_humidity, start_date, days)
    predicted_prices = []
    pred_price=predict_rice_price(model_price, actual_temp, actual_humidity)
    for i in range(len(predicted_temp)) :
    # y.append(predicted_temp[i])
    # ax.plot(x[:i+1], y, color='g')
    # fig.canvas.draw()
    
    # y1.append(predicted_humidity[i])
    # ax1.plot(x[:i+1], y1, color='b')
    # fig1.canvas.draw()
    
        predicted_price = predict_rice_price(model_price, predicted_temp[i], predicted_humidity[i])
        predicted_prices.append(predicted_price) 
    # y2.append(predicted_price)
    # ax2.plot(x[:i+1], y2, color='r')
    # fig2.canvas.draw()
    #return "hit"
    #time.sleep(5)
    #return jsonify({"predicted_prices": predicted_prices,"predicted_temperature":predicted_temp,"predicted_humidity":predicted_humidity})
    return jsonify({"commodity":"Rice","predicted_prices": predicted_prices,"predicted_temperature":predicted_temp,"predicted_humidity":predicted_humidity})

if __name__=='__main__':
    app.run(host='0.0.0.0',debug=True)