
const jsonExamples = 
[
  {
    name: "John Silva",
    age: 30,
    email: "john.silva@example.com",
    address: {
      street: "Flower Street",
      number: 123,
      city: "New York",
      state: "NY"
    },
    phone: ["+1-555-999-9999", "+1-555-888-8888"]
  },

  {
    product: "Gaming Laptop",
    price: 5899.90,
    specs: {
      processor: "Intel Core i7",
      memory: "16GB RAM",
      storage: "512GB SSD"
    },
    available: true,
    categories: ["electronics", "computers"]
  },

  {
    task: "Study Vue.js",
    priority: "high",
    completed: false,
    deadline: "2025-04-20"
  },

  {
    event: "Tech Conference",
    date: "2025-05-10",
    location: {
      name: "Convention Center",
      city: "San Francisco",
      state: "CA"
    },
    participants: 350
  },

  {
    type: "Dog",
    name: "Rex",
    age: 4,
    breed: "Labrador",
    vaccinated: true,
    owner: {
      name: "Carlos",
      phone: "+1-555-000-1234"
    }
  },

  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    year: 1954,
    genres: ["Fantasy", "Adventure"],
    available: false
  },

  {
    name: "Pizza & Co.",
    type: "Pizzeria",
    openingHours: {
      monday: "6:00 PM - 11:00 PM",
      friday: "6:00 PM - 1:00 AM",
      sunday: "6:00 PM - 10:00 PM"
    },
    acceptsReservations: true,
    location: {
      city: "Chicago",
      state: "IL"
    }
  }
];

export default jsonExamples;
