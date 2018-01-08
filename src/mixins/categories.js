const categories = [
  {
    name: 'Eat/Drink',
    icon: 'food',
  },
  {
    name: 'Shopping',
    icon: 'shopping',
  },
  {
    name: 'Business',
    icon: 'business',
  },
  {
    name: 'Home',
    icon: 'home',
  },
  {
    name: 'Bus/Train',
    icon: 'public-transport',
  },
  {
    name: 'Car',
    icon: 'car',
  },
  {
    name: 'Taxi',
    icon: 'taxi',
  },
  {
    name: 'Gas Station',
    icon: 'fuel',
  },
  {
    name: 'Bike',
    icon: 'bike',
  },
  {
    name: 'Going out',
    icon: 'drinks',
  },
  {
    name: 'Theatre',
    icon: 'theatre',
  },
  {
    name: 'Cinema',
    icon: 'cinema',
  },
  {
    name: 'Education',
    icon: 'education',
  },
  {
    name: 'Holiday',
    icon: 'holiday',
  },
  {
    name: 'Health',
    icon: 'health',
  },
  {
    name: 'Sport',
    icon: 'sport',
  },
  {
    name: 'Children',
    icon: 'kids',
  },
  {
    name: 'Pet',
    icon: 'pet',
  },
  {
    name: 'Phone',
    icon: 'phone',
  },
  {
    name: 'Games',
    icon: 'games',
  },
  {
    name: 'Gift',
    icon: 'gift',
  },
  {
    name: 'Cash',
    icon: 'cash',
  },
];

export default {
  methods: {
    getCategories() {
      return categories;
    },
    findCategory(categoryName) {
      return categories.filter(category => category.name === categoryName)[0];
    },
    getIcon(categoryName) {
      const category = this.findCategory(categoryName);
      return category.icon;
    },
  },
};
