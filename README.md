# Peritus Assignment

This is a coding assignement for Peritus. The App uses a Springboot Java applicaiton. The App has an embedded h2 Database that servers the BSE and DJI Data from Ticker Table. 

## Usage
Clone the source code into a folder and then execute the following:

```mvn springboot:run```

This would start the springboot application. 

To view the api use the following URL:
1. To get __All__ data of a index use ```http://localhost:8080/v1/indicies/{index}```
2. To get data of a index between a date range use ```http://localhost:8080/v1/indicies/{index}?from={}&to={}```

## REACT APP
First start the Java server and make sure the Java server is running.
now change the directory to react app and use comand ```npm run start``` to start the react server which will render the graphs.

Note: Please wait as lodaing data might take time.
