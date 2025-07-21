const { default: mongoose } = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;
mongoose
  .connect('mongodb://localhost:27017/relationshipDemo')
  .then(() => {
    console.log('connected to mongdb');
  })
  .catch(error => {
    console.log('error connecting to mongo');
    console.log(error);
  });

const tweeterSchema = new Schema({
  username: {
    type: String,
  },  
});

const tweetSchema = new Schema({
  text: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: { type: Schema.Types.ObjectId, ref: 'Tweeter' },
});

const Tweeter = model('Tweeter', tweeterSchema);
const Tweet = model('Tweet', tweetSchema);

const makeTweet = async () => {
//   await Tweet.deleteMany({});
//   await Tweeter.deleteMany({});
  const tweeter = new Tweeter({ username: 'john_doe' });
  await tweeter.save();
  if (tweeter) {
    const tweet1 = new Tweet({
      text: 'This is my first tweet!',
    });
    tweet1.user = tweeter._id; // Associate the tweet with the user

    await tweet1.save();
    console.log('Tweet created:', tweet1);
  } else {
    console.log('User not found');
  }
};

// makeTweet();

const findTweets = async () => {
  const tweets = await Tweet.find({}).populate('user', 'username');
  console.log('Tweets with user info:', tweets);
};

findTweets();
