const worldDisplay: HTMLElement = document.querySelector(".world")!;
const scoreDisplay: HTMLElement = document.querySelector(".score")!;
const buildingListEl: HTMLElement = document.querySelector(".buildings")!;

// CONSTRUCTOR ATTRIBUTE TYPES

type gameWorldConstructorAttrs = {
  name: string;
  score: number;
};

type buildingConstructorAttrs = {
  name: string;
  image: string;
  amount: number;
  cost: number;
  world: gameWorld;
  baseIncome: number;
  income: number;
  speed: number;
  hasManager: boolean;
  isRunning: boolean;
};
// CLASSES

class gameWorld {
  constructor(attrs: gameWorldConstructorAttrs) {
    this.name = attrs.name;
    this.score = attrs.score;
  }
  name: string;
  score: number;

  updateDisplay() {
    if (worldDisplay && scoreDisplay !== null) {
      worldDisplay.innerText = this.name;
      scoreDisplay.innerText = "Score: $" + this.score;
    } else {
      alert("error: gameWorld is null!");
    }
  }
}

class building {
  constructor(attrs: buildingConstructorAttrs) {
    this.name = attrs.name;
    this.image = attrs.image;
    this.amount = attrs.amount;
    this.cost = attrs.cost;
    this.world = attrs.world;
    this.income = attrs.income;
    this.baseIncome = attrs.baseIncome;
    this.speed = attrs.speed;
    this.hasManager = attrs.hasManager;
    this.isRunning = attrs.isRunning;
  }

  name;
  image;
  amount;
  cost;
  world;
  baseIncome;
  income;
  speed;
  hasManager;
  isRunning;

  buildingEl = document.createElement("li");
  buildingAmountEl = document.createElement("p");
  buildingImageEl = document.createElement("img");
  buildingNameEl = document.createElement("p");
  buildingBarContainerEl = document.createElement("div");
  buildingProgressBarEl = document.createElement("div");
  buildingBuyButtonEl = document.createElement("button");

  buy(quantity: number) {
    let costMul = this.cost * quantity;
    let incomeMul = this.baseIncome * quantity;
    if (this.cost <= this.world.score) {
      this.world.score = Math.round((this.world.score - costMul) * 100) / 100;
      this.amount = this.amount + quantity;
      this.income = this.income + incomeMul;
      this.cost = this.cost * 1.15;
      this.cost = Math.round(this.cost * 100) / 100;
      this.world.updateDisplay();
      this.updateDisplay();
    } else {
      alert("broke");
    }
  }

  render() {
    this.buildingEl.classList.add("building");

    this.buildingImageEl.classList.add("building-image");
    this.buildingImageEl.src = this.image;
    this.buildingImageEl.alt = this.name;
    this.buildingEl.append(this.buildingImageEl);

    this.buildingNameEl.classList.add("building-name");
    this.buildingNameEl.innerText = this.name;
    this.buildingEl.append(this.buildingNameEl);

    this.buildingBarContainerEl.classList.add("bar-container");
    this.buildingEl.append(this.buildingBarContainerEl);

    this.buildingProgressBarEl.classList.add("bar");
    this.buildingProgressBarEl.innerText = "$" + this.income;
    this.buildingBarContainerEl.append(this.buildingProgressBarEl);

    this.buildingAmountEl.classList.add("building-amount");
    this.buildingAmountEl.innerText = "Amount: " + this.amount;
    this.buildingEl.append(this.buildingAmountEl);

    this.buildingBuyButtonEl.classList.add("building-buy");
    this.buildingBuyButtonEl.innerText = "Buy: $" + this.cost;
    this.buildingEl.append(this.buildingBuyButtonEl);

    buildingListEl.append(this.buildingEl);

    // wont render progress bar if you don't have any
    if (this.amount === 0) {
      this.buildingProgressBarEl.classList.add("hidden");
      this.buildingAmountEl.classList.add("hidden");
    }

    // EVENT LISTENERS
    this.buildingImageEl.addEventListener("click", (e: Event) => {
      if (this.amount !== 0) {
        e.preventDefault();
        this.run();
        this.isRunning = true;
      } else return;
    });

    this.buildingBuyButtonEl.addEventListener("click", (e: Event) => {
      e.preventDefault();
      this.buy(1);
    });
  }
  updateDisplay() {
    this.buildingProgressBarEl.innerText = "$" + this.income;
    this.buildingAmountEl.innerText = "Amount: " + this.amount;
    this.buildingBuyButtonEl.innerText = "Buy: $" + this.cost;
    this.buildingAmountEl.innerText = "Amount: " + this.amount;
    this.buildingProgressBarEl.innerText = "$" + this.income;
    if (this.amount !== 0) {
      this.buildingProgressBarEl.classList.remove("hidden");
      this.buildingAmountEl.classList.remove("hidden");
    }
  }

  run() {
    if (this.hasManager === false && this.isRunning === false) {
      this.buildingProgressBarEl.animate({ width: "100%" }, this.speed);
      setTimeout(() => {
        this.world.score = this.world.score + this.income;
        this.world.updateDisplay();
        this.updateDisplay();
        this.isRunning = false;
      }, this.speed);
    } else if (this.hasManager === true) {
      setInterval(() => {
        console.log("test");
      }, this.speed);
    } else {
      return;
    }
  }
}

// main part
//

const earth = new gameWorld({
  name: "Earth",
  score: 0,
});

let buildingsArr = [
  new building({
    name: "Watermelons",
    image: "./images/watermelons.png",
    amount: 1,
    cost: 1,
    world: earth,
    baseIncome: 1,
    income: 1,
    speed: 2500,
    hasManager: false,
    isRunning: false,
  }),
  new building({
    name: "Bananas",
    image: "./images/bananas.png",
    amount: 0,
    cost: 5,
    world: earth,
    baseIncome: 5,
    income: 0,
    speed: 5000,
    hasManager: false,
    isRunning: false,
  }),
  new building({
    name: "Coconuts",
    image: "./images/coconuts.png",
    amount: 0,
    cost: 15,
    world: earth,
    baseIncome: 15,
    income: 0,
    speed: 10000,
    hasManager: false,
    isRunning: false,
  }),
  new building({
    name: "Fracking",
    image: "./images/fracking.png",
    amount: 0,
    cost: 100,
    world: earth,
    baseIncome: 100,
    income: 0,
    speed: 25000,
    hasManager: false,
    isRunning: false,
  }),
];

let currentWorld = {
  world: earth,
  renderBuildings() {
    for (let i = 0; i < buildingsArr.length; i++) {
      if (buildingsArr[i].world === currentWorld.world) {
        buildingsArr[i].render();
      }
    }
  },
};

currentWorld.renderBuildings();
earth.updateDisplay();
