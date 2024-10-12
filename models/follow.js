import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema({
  serverId: { type: String, required: true }, // Discord server ID
  followedGames: [{ type: String }], // List of followed game slugs 
});

const Follow = mongoose.model('Follow', FollowSchema);

export default Follow;
