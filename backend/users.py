"""
connect user infomation with database
"""
import os
import json
from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
SECRET_PW = os.getenv("SECRET_PW")

class User:
    """
    insert user infomation into database
    """
    def __init__(self):
        try:
            self.client = MongoClient("mongodb+srv://"+SECRET_KEY+":"+SECRET_PW+
                                      "@cluster0-dfeu0.mongodb.net/test?retryWrites=true&w=majority")
            self.db = self.client.cluster0
            self.db_users = self.db.users

        except ConnectionAbortedError:
            print("Connection Error")

    def get_db_users(self):
        """
        insert user infomation into database
        @return: database collection
        """
        return self.db_users

    def from_csv_to_database(self, df, number):
        """
        insert user infomation from csv into database
        @return: data added into database
        """
        data_csv = []
        for name, pw in zip(df['Username'], df['Password']):
            data_csv.append({"Username": name, "Password": pw})
        self.db_users.insert_many(data_csv[0:number])
        return data_csv[0:number]

    def export_json_from_database(self):
        """
        export user infomation from json file into database
        """
        cursor = self.db_users.find({})
        data = []
        for item in cursor:
            del item["_id"]
            data.append(item)
        with open("users.json", "w", encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4)

    def insert_users(self, data):
        """
        insert user infomation into database
        """
        self.db_users.insert_many(data)

# user = User()
# df = pandas.read_excel('../users.csv')
# user.from_csv_to_database(df)
