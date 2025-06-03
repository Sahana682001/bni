import mongoose from 'mongoose';

const referralSchema = new mongoose.Schema({
  membership: String,
  referredBy: String,
  referrerName: String,
  referrerEmail: String,
  referrerPhone: String,
  gender: String,
  referralText: String,
  referralBusiness: String,
  date: String,
  agreement: Boolean,
}, { timestamps: true });

const Referral = mongoose.model('Referral', referralSchema);
export default Referral;
