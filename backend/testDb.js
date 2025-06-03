import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/bni', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('✅ Connected to MongoDB');

  const memberSchema = new mongoose.Schema({}, { strict: false });
  const Member = mongoose.model('TestMember', memberSchema, 'members');

  const members = await Member.find();
  console.log('📦 Found:', members.length, 'members');
  console.log('🧾 Sample document:', members[0]);
  process.exit();
}).catch(console.error);
