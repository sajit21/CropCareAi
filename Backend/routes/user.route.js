import express from 'express';
import { getAllUsers, searchUsers, filterUsersByRole, sortUsersByDate, getUserDiagnoses, getUserReviews, changeUserRole, getUserByUsername } from '../controllers/user.controller.js';

const Router=express.Router();




Router.get('/', getAllUsers);

Router.get('/search', searchUsers); 

Router.get('/role/:role', filterUsersByRole); 

Router.get('/sort/:order', sortUsersByDate);

Router.get('/:username', getUserByUsername); 

Router.get('/:id/diagnoses', getUserDiagnoses); 

Router.get('/:id/reviews', getUserReviews); 

Router.put('/:id/role', changeUserRole); 


export default Router;