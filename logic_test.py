import unittest
from backend.users import User
from backend.scraper import Scraper
import pymongo
import pandas
import json

class Test(unittest.TestCase):

    def test_write_to_database(self):
        """
        test whether it is able to write to database without errors
        """
        user = User()
        db_users = user.get_db_users()
        ori = db_users.count_documents({})
        db_users.insert_one({"Username": "TESTUSER", "Password": "TESTPW"})
        now = db_users.count_documents({})
        db_users.find_one_and_delete({"Username": "TESTUSER"})
        self.assertEqual(ori+1, now)

    def test_read_from_database(self):
        """
        test whether it is able to read from database without errors
        """
        user = User()
        db_users = user.get_db_users()
        db_users.insert_one({"Username": "TESTUSER", "Password": "TESTPW"})
        document = db_users.find_one_and_delete({"Username": "TESTUSER"})
        self.assertEqual(document['Username'], "TESTUSER")
        self.assertEqual(document['Password'], "TESTPW")

    def test_import_from_csv(self):
        """
        test whether it is able to write into database from a csv file
        """
        user = User()
        db_users = user.get_db_users()
        ori = db_users.count_documents({})
        print(ori)
        df = pandas.read_excel('users.csv')
        number = 2
        data_csv = user.from_csv_to_database(df, number)
        now = db_users.count_documents({})
        print(now)
        for data in data_csv:
            db_users.find_one_and_delete({"Username": data["Username"]})
        print(db_users.count_documents({}))
        self.assertEqual(now, ori + number)

    def test_export_json_from_database(self):
        """
        test whether it is able to export data from database into json file
        """
        user = User()
        db_users = user.get_db_users()
        data_test = [{"Username": "TESTUSER_0", "Password": "TESTPW_0"},
                {"Username": "TESTUSER_1", "Password": "TESTPW_1"},
                {"Username": "TESTUSER_2", "Password": "TESTPW_2"}]
        db_users.insert_many(data_test)
        total = db_users.count_documents({})
        # export to json
        user.export_json_from_database()
        with open("users.json") as json_file:
            new_data = json.load(json_file)
        self.assertEqual(len(new_data), total)
        # delete the inserted test from database
        for data in data_test:
            db_users.find_one_and_delete({"Username": data["Username"]})

    def test_get_recipe_info(self):
        """
        test getting recipe information
        """
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 1)
        item = scrap.get_recipe_info('https://www.chinasichuanfood.com/spicy-crispy-potatoes/')
        self.assertEqual(item['dish_name'], 'Spicy Crispy Potatoes')
        self.assertEqual(item['calories'], '442 kcal')

    def test_add_recommendation(self):
        """
        test getting related recipes
        """
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 3)
        scrap.loop()
        with open("recipes.json") as json_file:
            data = json.load(json_file)
        self.assertEqual(len(data), 3)



if __name__ == '__main__':
    unittest.main()

