const categories = [
  {
    name: 'Eat/Drink',
    icon: 'food',
    color: '#00193D',
  },
  {
    name: 'Shopping',
    icon: 'shopping',
    color: '#415a77',
  },
  {
    name: 'Business',
    icon: 'business',
    color: '#778da9',
  },
  {
    name: 'Home',
    icon: 'home',
    color: '#e0e1dd',
  },
  {
    name: 'Bus/Train',
    icon: 'public-transport',
    color: '#EE4370',
  },
  {
    name: 'Car',
    icon: 'car',
    color: '#e4fde1',
  },
  {
    name: 'Taxi',
    icon: 'taxi',
    color: '#93c',
  },
  {
    name: 'Gas Station',
    icon: 'fuel',
    color: '#900',
  },
  {
    name: 'Bike',
    icon: 'bike',
    color: '#369',
  },
  {
    name: 'Going out',
    icon: 'drinks',
    color: '#909',
  },
  {
    name: 'Theatre',
    icon: 'theatre',
    color: '#123',
  },
  {
    name: 'Cinema',
    icon: 'cinema',
    color: '#f9c',
  },
  {
    name: 'Education',
    icon: 'education',
    color: '#0ff',
  },
  {
    name: 'Holiday',
    icon: 'holiday',
    color: '#f0f',
  },
  {
    name: 'Health',
    icon: 'health',
    color: '#f03',
  },
  {
    name: 'Sport',
    icon: 'sport',
    color: '',
  },
  {
    name: 'Children',
    icon: 'kids',
    color: '#4ecdc4',
  },
  {
    name: 'Pet',
    icon: 'pet',
    color: '#ff6b6b',
  },
  {
    name: 'Phone',
    icon: 'phone',
    color: '#3fa34d',
  },
  {
    name: 'Games',
    icon: 'games',
    color: '#228cdb',
  },
  {
    name: 'Gift',
    icon: 'gift',
    color: '#9fa2b2',
  },
  {
    name: 'Cash',
    icon: 'cash',
    color: '#902923',
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
    getCategoryColor(categoryName) {
      const category = this.findCategory(categoryName);
      return category.color;
    },
  },
};
