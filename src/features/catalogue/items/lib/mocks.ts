import { IItemModel } from "./interfaces";

export const itemsMock: IItemModel[] = [
  {
    $id: "001",
    title: "Hammer",
    description: "Heavy-duty claw hammer for construction use.",
    image: "https://example.com/images/hammer.jpg",
    purchasePrice: 15.00,
    sellingPrice: 25.00,
    minThreshold: 10,
    maxThreshold: 50,
    isStockable: true
  },
  {
    $id: "002",
    title: "Power Drill",
    description: "Cordless power drill with variable speed settings.",
    image: "https://example.com/images/power-drill.jpg",
    purchasePrice: 120.00,
    sellingPrice: 150.00,
    minThreshold: 5,
    maxThreshold: 20,
    isStockable: true
  },
  {
    $id: "003",
    title: "Safety Helmet",
    description: "Durable safety helmet for construction site protection.",
    image: "https://example.com/images/safety-helmet.jpg",
    purchasePrice: 20.00,
    sellingPrice: 35.00,
    minThreshold: 15,
    maxThreshold: 100,
    isStockable: true
  },
  {
    $id: "004",
    title: "Measuring Tape",
    description: "25-foot retractable steel measuring tape.",
    image: "https://example.com/images/measuring-tape.jpg",
    purchasePrice: 10.00,
    sellingPrice: 18.00,
    minThreshold: 20,
    maxThreshold: 100,
    isStockable: true
  },
  {
    $id: "005",
    title: "Screwdriver Set",
    description: "Set of 6 screwdrivers with magnetic tips.",
    image: "https://example.com/images/screwdriver-set.jpg",
    purchasePrice: 25.00,
    sellingPrice: 40.00,
    minThreshold: 10,
    maxThreshold: 60,
    isStockable: true
  },
  // ... Add more items here ...
];

// Generate additional items to reach a total of 100
for (let i = 6; i <= 100; i++) {
  itemsMock.push({
    $id: i.toString().padStart(3, '0'),
    title: `Item ${i}`,
    description: `Description for item ${i}.`,
    image: `https://example.com/images/item-${i}.jpg`,
    purchasePrice: Math.random() * 100,
    sellingPrice: Math.random() * 150,
    minThreshold: Math.floor(Math.random() * 20) + 1,
    maxThreshold: Math.floor(Math.random() * 100) + 20,
    isStockable: Math.random() > 0.5
  });
}