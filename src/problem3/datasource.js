// class that defines 2 methods
// mid() - takes the price in between buy and sell, converts to dollars
// quote() - returns quote currency
let Price = class {
  constructor(buy, sell, pair, id, timestamp) {
    this.buy = buy;
    this.sell = sell;
    this.pair = pair;
    this.id = id;
    this.timestamp = timestamp;
  }
  mid() {
    return (this.buy + this.sell) / 2 / 100;
  }

  quote() {
    return this.pair.substring(3);
  }
};

// Utility class with async method getPrices
class Datasource {
  constructor() {}

  // Fetch data from endpoint and map into Price to access methods
  async getPrices() {
    const res = await fetch("https://static.ngnrs.io/test/prices");
    let data = await res.json();
    let newData = await data.data.prices.map((price) => {
      const { buy, sell, pair, id, timestamp } = price;
      return new Price(buy, sell, pair, id, timestamp);
    });

    return newData;
  }
}

// Instatiating new instance of utility class
const ds = new Datasource();

ds.getPrices()
  .then((prices) => {
    prices.forEach((price) => {
      console.log(
        `Mid price for ${price.pair} is ${price.mid()} ${price.quote()}.`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
