import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  tabs: [String],
  faqGroups: [
    {
      tab: String,
      faqTitle: String
    }
  ],
  personImage: String,
  businessLogo: String,
  personName: String,
  businessName: String,
  businessCategory: String,
  category: String,
  companyName: String,
  phoneNumber: String,
  emailId: String,
  website: String,
 role: String,
  inductions: String,
  businessGiveninRupees: String,
  businessGiven: String,
  referrals: Number,
  visitors: Number,
  aboutheading: String,
  aboutPara: String,
  statistics: [
    {
      number: String,
      text: String
    }
  ],
  services: [
    {
      icon: String,
      name: String,
      description: String
    }
  ],
  photos: [String],
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Member', memberSchema, 'members');
