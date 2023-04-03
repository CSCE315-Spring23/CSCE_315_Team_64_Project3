import csv
import datetime
import random

items = ["theshredderchocolate", "theshredderstrawberry", "theshreddervanilla", "mangofest", "metabolismboostbananapassionfruit", "metabolismbooststrawberrypineapple", "slim-n-trimblueberry", "slim-n-trimchocolate", "slim-n-trimstrawberry", "slim-n-trimvanilla", "purerechargemangostrawberry", "purerechargepineapple", "originalhighproteinbanana", "powerpunchplus", "theactivatorrecoverypineapple", "thehulkvanilla", "gladiatorstrawberry", "originalhighprotienbanana", "thehulkchocolate", "highintensity"]

sizes = ["small", "medium", "large"]
prices = [6.19, 8.59, 10.59]
costs = [3.45, 6.53, 7.76]
daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
currDay = 0
currDate = datetime.datetime(2022, 2, 27)
transactionID = 1
days = 0
with open('transactions.csv', 'w', newline='') as transactions, open('transactions_summary.csv', 'w', newline='') as summary:
    writer = csv.writer(transactions)
    writer2 = csv.writer(summary)
    totSales = 0
    writer.writerow(["ID", "Date", "Day of Week", "Smoothie", "Size", "Price", "Cost"])
    writer2.writerow(["Date", "Day of Week", "Revenue", "Expenditures", "Profit"])
    while (days < 366):
        daySales = 0
        salesTarget = 2800
        if ((currDate.date().day == 27 and currDate.date().month == 11) or (currDate.date().day == 10 and currDate.date().month == 9)):
            salesTarget = 6000
        totCosts = 0
        totPrice = 0
        while daySales < salesTarget:
            currSmoothie = items[random.randint(0, 19)]
            i = random.randint(0, 2)
            currSize = sizes[i]
            currPrice = prices[i]
            currCost = costs[i]
            writer.writerow([transactionID, currDate.date().strftime('%m/%d/%Y'), daysofweek[currDay], currSmoothie, currSize, currPrice, currCost])
            daySales+=currPrice
            totCosts+=currCost
            totPrice+=currPrice
            transactionID+=1
        days+=1
        writer2.writerow([currDate.date(), daysofweek[currDay], totPrice, totCosts, totPrice-totCosts])
        totSales+=daySales
        currDate+=datetime.timedelta(days=1)
        currDay = (currDay+1)%7    
    