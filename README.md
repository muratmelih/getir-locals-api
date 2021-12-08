## getir-locals-api
node server to get data from getir local database hosted MongoDb cloud. Handles card processes like add, update delete and get
App url :
https://getir-local-api.herokuapp.com/

## Dependencies
cors, express, mongodb

## /card/add

inserts new item to card.
Model:
```javascript
interface CardType {
  name: string;
  slug: string;
  quantity: number;
  price: number;
}

 ```
 
 
## /card/update

updates the item quantity in the card .
Model:
```javascript
interface CardType {
  name: string;
  slug: string;
  quantity: number;
  price: number;
}

 ```
 
  
## /card/delete?slug=item.slug

finds the item in card by slug and deletes item
Model:
```javascript
slug:string

 ```
