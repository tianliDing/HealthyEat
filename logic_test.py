"""
test function of scraper and user class
"""
import unittest
import json
import requests
import pandas
from bs4 import BeautifulSoup
from backend.users import User
from backend.scraper import Scraper


class Test(unittest.TestCase):
    """
    a class for test
    """
    def test_insert_users(self):
        """
        test function of inserting users
        """
        user = User()
        db_users = user.get_db_users()
        data_test = [{"Username": "TESTUSER_0", "Password": "TESTPW_0"},
                     {"Username": "TESTUSER_1", "Password": "TESTPW_1"},
                     {"Username": "TESTUSER_2", "Password": "TESTPW_2"}]
        before = db_users.count_documents({})
        user.insert_users(data_test)
        total = db_users.count_documents({})
        self.assertEqual(total, before+3)
        # delete the inserted test from database
        for data in data_test:
            db_users.find_one_and_delete({"Username": data["Username"]})
        print(db_users.count_documents({}))

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
        data_file = pandas.read_excel('users.csv')
        number = 2
        data_csv = user.from_csv_to_database(data_file, number)
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

    def test_add_calories(self):
        """
        test function of adding calories
        """
        html_doc = requests.get('https://www.chinasichuanfood.com/spicy-crispy-potatoes/')
        soup = BeautifulSoup(html_doc.text, 'html.parser')
        info = soup.find("script").string
        info = json.loads(info)
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 3)
        item = {}
        scrap.add_calories(item, info)
        self.assertEqual(item["calories"], "442 kcal")

    def test_add_cooking_methods(self):
        """
        test getting cooking methods of a recipe
        """
        html_doc = requests.get('https://www.chinasichuanfood.com/spicy-crispy-potatoes/')
        soup = BeautifulSoup(html_doc.text, 'html.parser')
        info = soup.find("script").string
        info = json.loads(info)
        raw_method = info['recipeInstructions']
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 3)
        item = {}
        item["cooking_methods"] = []
        scrap.add_cooking_methods(raw_method, item)
        self.assertEqual(len(item["cooking_methods"]), 5)

    def test_add_recommendation(self):
        """
        test getting related recipes
        """
        html_doc = requests.get('https://www.chinasichuanfood.com/spicy-crispy-potatoes/')
        soup = BeautifulSoup(html_doc.text, 'html.parser')
        item = {}
        item['recommendation'] = []
        all_rec = soup.find("section", {"id": "featured-post-20"}).findAll("a")
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 3)
        scrap.add_recommendation(item['recommendation'], all_rec)
        self.assertEqual(len(item['recommendation']), 3)

    def test_get_recipe_info(self):
        """
        test getting recipe information
        """
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 1)
        item = scrap.get_recipe_info('https://www.chinasichuanfood.com/spicy-crispy-potatoes/')
        self.assertEqual(item['dish_name'], 'Spicy Crispy Potatoes')
        self.assertEqual(item['calories'], '442 kcal')

    def test_loop(self):
        """
        test function of looping to get recipes
        """
        scrap = Scraper('https://www.chinasichuanfood.com/spicy-crispy-potatoes/', 3)
        scrap.loop()
        with open("recipes.json") as json_file:
            data = json.load(json_file)
        self.assertEqual(len(data), 3)

if __name__ == '__main__':
    unittest.main()
