export default () => ({
  database: {
    uri: process.env.DATABASE_URI || 'mongodb+srv://nontapatb:110020103431a@trainee-bot.fnniy7q.mongodb.net/?retryWrites=true&w=majority&appName=Trainee-Bot',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'bright_secret',
  },
});
