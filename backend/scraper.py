"""
a web scraper for recipes from "www.chinasichuanfood.com"
"""
from math import floor
import json
from bs4 import BeautifulSoup
import requests


class Scraper:
    """
        a class for scraping recipes from website into json file
    """

    def __init__(self, start_url, total_number):
        self.start = start_url
        self.number = total_number

    def get_recipe_info(self, url):
        """
        get recipe information of given url
        @param url: given recipe url to be scraped
        @return one recipe into dictionary
        """
        html_doc = requests.get(url)
        soup = BeautifulSoup(html_doc.text, 'html.parser')
        item = {}

        if soup.find("script").get("data-cfasync") == "false":
            return item

        info = soup.find("script").string
        info = json.loads(info)
        item['dish_name'] = info['name']
        item['dish_image'] = info['image']

        item["prep_time"] = "no details"
        if 'prepTme' in info:
            item['prep_time'] = info['prepTime']
        item["cooking_time"] = "no details"
        if 'cookTime' in info:
            item['cooking_time'] = info['cookTime']
        item["total_time"] = "no details"
        if 'totalTime' in info:
            item['total_time'] = info['totalTime']

        item['ratings'] = "no ratings yet"
        if 'aggregateRating' in info:
            item['ratings'] = info['aggregateRating']['ratingValue'] + " out of 5"
        # add calories
        self.add_calories(item, info)
        # add ingredients
        item['ingredients'] = info['recipeIngredient']
        # add cooking_methods
        item['cooking_methods'] = []
        raw_method = info['recipeInstructions']
        self.add_cooking_methods(raw_method, item)
        # add recommendations
        item['recommendation'] = []
        all_rec = soup.find("section", {"id": "featured-post-20"}).findAll("a")
        self.add_recommendation(item['recommendation'], all_rec)

        return item

    def add_calories(self, item, info):
        item['calories'] = "no details"
        if 'nutrition' in info:
            if 'calories' in info['nutrition']:
                item['calories'] = info['nutrition']['calories']

    def add_cooking_methods(self, raw_method, item):
        for method in raw_method:
            if 'itemListElement' in method:
                for ele in method['itemListElement']:
                    item['cooking_methods'].append(ele['text'])
            else:
                item['cooking_methods'].append(method['text'])

    def add_recommendation(self, rec_list, all_rec):
        """
        a helper function adding more links of the recipes
        """
        flag = 1
        for rec in all_rec:
            if flag == 1:
                rec_list.append(rec.get("href"))
                flag = 0
            else:
                flag = 1

    def loop(self):
        """
        a loop to scrape enough books and authors
        @return: none, insert the scraped data into json file
        """
        data_recipe = []
        total_number = self.number
        queue = []
        item = self.get_recipe_info(self.start)
        data_recipe.append(item)
        total_number -= 1

        if item['recommendation']:
            for rec in item['recommendation']:
                queue.append(rec)

        print("Now we start scraping the recipes")
        while total_number != 0:
            if total_number == floor(self.number*3/4):
                print("Scraped 25% already")
            if total_number == floor(self.number/2):
                print("Scraped 50% already")
            if total_number == floor(self.number/4):
                print("Scraped 75% already")

            if queue:
                url = queue[0]
                # print(url)
                queue = queue[1:]
                item = self.get_recipe_info(url)
                if item != {}:
                    data_recipe.append(item)
                    total_number -= 1
                    if item['recommendation']:
                        for rec in item['recommendation']:
                            queue.append(rec)
            else:
                print("not enough recipes!!")
                break

        print("Finished scrapping")
        print("Now writing into json format")
        with open("recipes.json", "w", encoding="utf-8") as write_json:
            json.dump(data_recipe, write_json, indent=4)
