import express from 'express';
import Referral from '../models/Referral.js';

const router = express.Router();

// GET /api/referrals — fetch all referrals
router.get('/', async (req, res) => {
  try {
    const referrals = await Referral.find();
    res.status(200).json(referrals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

// POST /api/referrals — save a new referral
router.post('/', async (req, res) => {
  try {
    const newReferral = new Referral({
      membership: req.body.membership,
      referredBy: req.body.referredBy,
      referrerName: req.body.referrerName,
      referrerEmail: req.body.referrerEmail,
      referrerPhone: req.body.referrerPhone,
      gender: req.body.gender,
      referralText: req.body.referralText,
      referralBusiness: req.body.referralBusiness,
      referralDate: req.body.referralDate,
      agreed: req.body.agreed
    });

    await newReferral.save();
    res.status(201).json({ message: 'Referral saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save referral.' });
  }
});

export default router;
