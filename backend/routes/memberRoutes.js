import express from 'express';
const router = express.Router();
import Member from '../models/Members.js';  // Note the .js extension

router.get('/', async (req, res) => {
  try {
    const members = await Member.find({});
    console.log('📦 Members:', members); // <- Full array output
    console.log('📦 Found members:', members.length);
    res.json(members);
  } catch (err) {
    console.error('❌ Error fetching members:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/api/members', async (req, res) => {
   console.log("Incoming member data:", req.body); 
  try {
    const member = new Member(req.body);
    const saved = await member.save();
    res.status(201).json(saved);
  } catch (err) {
     console.error("Error during save:", err); // 👈 Add this for better debugging
    res.status(500).json({ error: 'Failed to save member' });
  }
});


router.get('/active', async (req, res) => {
  try {
    const activeMembers = await Member.find({ isActive: true });
    res.status(200).json(activeMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch active members' });
  }
});

router.get('/inactive', async (req, res) => {
  try {
    const inactiveMembers = await Member.find({ isActive: false });
    res.json(inactiveMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inactive members' });
  }
});

// In your server-side code (e.g., server.js or routes file)
router.put('/api/members/:id', async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



router.put("/members/:id", async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});


// In routes or controller file (e.g., routes/members.js)
router.get("/categories", async (req, res) => {
  try {
    const categories = await Member.distinct("businessCategory");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});







router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send('Member not found');
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});


export default router;
