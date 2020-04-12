"""
CRUD user infomation into database
"""
from pymongo import MongoClient
import datetime
import pandas
import json
from dotenv import load_dotenv
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
SECRET_PW = os.getenv("SECRET_PW")

class User:
    def __init__(self):
        try:
            self.client = MongoClient("mongodb+srv://"+SECRET_KEY+":"+SECRET_PW+"@cluster0-dfeu0.mongodb.net/test?retryWrites=true&w=majority")
            self.db = self.client.cluster0
            self.db_users = self.db.users

        except ConnectionAbortedError:
            print("Connection Error")
            pass

    def get_db_users(self):
        return self.db_users

    def from_csv_to_database(self, df, number):
        data_csv = []
        for name,pw in zip(df['Username'],df['Password']):
            data_csv.append({"Username": name, "Password": pw})
        self.db_users.insert_many(data_csv[0:number])
        return data_csv[0:number]

    def export_json_from_database(self):
        cursor = self.db_users.find({})
        data = []
        for item in cursor:
            del item["_id"]
            data.append(item)
        with open("users.json", "w", encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4)
        


# user = User()
# df = pandas.read_excel('../users.csv')
# user.from_csv_to_database(df)