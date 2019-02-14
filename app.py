import os

import pandas as pd
import numpy as np
import json
import csv
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


df = pd.read_csv("data/shapefiles/State_wise_Tax_2019.csv")


#################################################
# Database Setup
#################################################



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/<state>")
def statename(state):
    print(type(state)) 
    sample_data = df.loc[df['Abbreviation'] == state, ["Name", "Abbreviation", "TaxRate", "State_Tax","Fed_Tax","Social_Tax","Med_Tax",
"Total_Tax_Ded","Total_Take_Home"]]
    print(sample_data)
    data = {
       #"Name": sample_data.Name.values.tolist(),
       #"Abbreviation": sample_data.Abbreviation.values.tolist(),
    #    "State TaxRate": sample_data.TaxRate.tolist(),
       "Federal tax for 100K"        : sample_data.Fed_Tax.tolist(),
       "Medicare Witheld for 100K"   : sample_data.Med_Tax.tolist(),
       "State tax for 100K"          : sample_data.State_Tax.tolist(),
       "Social Security tax for 100K": sample_data.Social_Tax.tolist(),
       "Total tax for 100K USD"      : sample_data.Total_Tax_Ded.tolist(),
       "Take Home for 100K USD"      : sample_data.Total_Take_Home.tolist()
   }
    return jsonify(data)



if __name__ == "__main__":
    app.run(debug=True)