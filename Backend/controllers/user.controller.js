import Review from '../model/review.model.js';
import History from '../model/imageRecord.model.js';

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ Fullname: username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({
            id: user._id,
            name: user.Fullname,
            email: user.Email,
            avatar: user.Photo,
            role: user.role,
            joinedAt: user.createdAt
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user', details: err.message });
    }
};

export const getUserDiagnoses = async (req, res) => {
    try {
        const { id } = req.params;
        const diagnoses = await History.find({ user: id });
        const mapped = diagnoses.map(d => ({
            id: d._id,
            plant: { name: d.plantName, imageUrl: d.imageUrl },
            disease: d.disease,
            remedy: d.remedy,
            confidence: d.confidence
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch diagnoses', details: err.message });
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.find({ UserId: id }).populate('UserId','Fullname Photo');
        const mapped = reviews.map(r => ({
            id: r._id,
            reviewer: {
                name: r.UserId?.Fullname || 'Anonymous',
                avatar: r.UserId?.Photo || ''
            },
            plant: r.PlantName,
            disease: r.DiseaseName,
            Accuracy: r.Accuracy,
            Suggestion: r.Suggestion,
            comment: r.comment,
            date: r.createdAt
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews', details: err.message });
    }
};

export const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({
            id: user._id,
            name: user.Fullname,
            email: user.Email,
            avatar: user.Photo,
            role: user.role,
            joinedAt: user.createdAt
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to change user role', details: err.message });
    }
};

import ImageRecord from '../model/imageRecord.model.js';
import User from '../model/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
       const diagnosesCounts = await ImageRecord.aggregate([
      {
        $group: {
          _id: '$user', 
          totalDiagnoses: { $sum: 1 } 
        }
      }
    ]);

     const countMap = {};
    diagnosesCounts.forEach(d => {
      countMap[d._id.toString()] = d.totalDiagnoses;
    });
        const mapped = users.map(u => ({
            id: u._id,
            name: u.Fullname,
            email: u.Email,
            avatar: u.Photo,
            joinedAt: u.createdAt,
            role: u.role,
            totalDiagnoses: countMap[u._id.toString()]  || 0
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', details: err.message });
    }
};

export const searchUsers = async (req, res) => {
    try {
        const { q = '' } = req.query;
        const users = await User.find({
            $or: [
                { Fullname: { $regex: q, $options: 'i' } },
                { Email: { $regex: q, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        const mapped = users.map(u => ({
            id: u._id,
            name: u.Fullname,
            email: u.Email,
            avatar: u.Photo,
            joinedAt: u.createdAt,
            role: u.role,
            totalDiagnoses: u.totalDiagnoses || 0
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search users', details: err.message });
    }
};

export const filterUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;
        const users = await User.find({ role }).sort({ createdAt: -1 });
        const mapped = users.map(u => ({
            id: u._id,
            name: u.Fullname,
            email: u.Email,
            avatar: u.Photo,
            joinedAt: u.createdAt,
            role: u.role,
            totalDiagnoses: u.totalDiagnoses || 0
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to filter users', details: err.message });
    }
};

export const sortUsersByDate = async (req, res) => {
    try {
        const { order } = req.params; 
        const sortOrder = order === 'oldest' ? 1 : -1;
        const users = await User.find().sort({ createdAt: sortOrder });
        const mapped = users.map(u => ({
            id: u._id,
            name: u.Fullname,
            email: u.Email,
            avatar: u.Photo,
            joinedAt: u.createdAt,
            role: u.role,
            totalDiagnoses: u.totalDiagnoses || 0
        }));
        res.json(mapped);
    } catch (err) {
        res.status(500).json({ error: 'Failed to sort users', details: err.message });
    }
};