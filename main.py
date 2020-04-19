import argparse
from backend.scraper import Scraper


def __main__():
    """
    give commandline parser and start scraping
    @return: NA
    """
    parser = argparse.ArgumentParser(description='Take one integer as the number of recipes to be scrapped ',
                                     epilog='Please enter one integer, and an recipe url')
    parser.add_argument('integer1', metavar='N', type=int,
                        help='an integer for the number of recipes')
    parser.add_argument('URL', metavar='URL', type=str,
                        help='a recipe URL to start scrapping')
    args = parser.parse_args()
    print("========================")
    print("You are requesting " + str(args.integer1) + " recipes to be scraped")
    print(args.URL + " as a starting recipe url")
    print()

    if args.integer1 > 2000:
        print("========WARNING=========")
        print("please enter an integer that is less than 2000")
        print("========WARNING=========")
    else:
        X = Scraper(args.URL, args.integer1)
        X.loop()
        print("Finished!")

    # source .venv/bin/activate
    # time python main.py 101 'https://www.chinasichuanfood.com/spicy-crispy-potatoes/'

__main__()