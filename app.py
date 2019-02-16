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
from flask import Response

app = Flask(__name__)

jsfile = file = open('./templates/shp.js', 'r')
myjs = jsfile.read()
df1 = pd.read_csv("data/shapefiles/State_wise_Tax_2019.csv")
df2 = pd.read_csv("data/shapefiles/demographic_data.csv")
df = pd.merge(df1, df2, how='inner', on='Name')


#################################################
# Database Setup
#################################################


@app.route('/shp')
def ajax_ddl():
      return Response(myjs, mimetype='text/javascript')

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/<state>")
def statename(state):
    state = state.lower()
    print(type(state)) 
    sample_data = df.loc[df['Abbreviation'] == state, ["Name", "Abbreviation", "TaxRate", "State_Tax","Fed_Tax","Social_Tax","Med_Tax",
"Total_Tax_Ded","Total_Take_Home"]]
    print(sample_data)
    data = {
       #"Name": sample_data.Name.values.tolist(),
       #"Abbreviation": sample_data.Abbreviation.values.tolist(),
    #    "State TaxRate": sample_data.TaxRate.tolist(),
       "Federal tax for 100K"        : sample_data.Fed_Tax.tolist()[0],
       "Medicare Witheld for 100K"   : sample_data.Med_Tax.tolist()[0],
       "State tax for 100K"          : sample_data.State_Tax.tolist()[0],
       "Social Security tax for 100K": sample_data.Social_Tax.tolist()[0],
    #    "Total tax for 100K USD"      : sample_data.Total_Tax_Ded.tolist()[0],
       "Take Home for 100K USD"      : sample_data.Total_Take_Home.tolist()[0]
   }
    return jsonify(data)

@app.rout("/<state>/race")
def statename(state):
    state = state.lower()
    print(type(state)) 
    sample_data = df.loc[df['Abbreviation'] == state, ["Name", "Abbreviation", "TaxRate", "State_Tax","Fed_Tax","Social_Tax","Med_Tax",
"Total_Tax_Ded","Total_Take_Home", "TotalPop", "Men", "Women", "Hispanic", "White", "Black", "Native", 
"Asian", "Pacific", "Professional", "Service", "Office", "Construction", "Production", 
"PrivateWork", "PublicWork", "SelfEmployed", "FamilyWork", "Unemployment"  ]]
    print(sample_data)
    data = {
       #"Name": sample_data.Name.values.tolist(),
       #"Abbreviation": sample_data.Abbreviation.values.tolist(),
    #    "State TaxRate": sample_data.TaxRate.tolist(),
       "% Hispanic": sample_data.Hispanice.tolist()[0],
       "% White"  : sample_data.White.tolist()[0],
       "% Black" : sample_data.Black.tolist()[0],
       "% Native": sample_data.Native.tolist()[0],
       "% Asian" :  sample_data.Asian.tolist()[0],
       "% Pacific": sample_data.Pacific.tolist()[0]

   }
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)
