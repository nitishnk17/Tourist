const express = require('express');
const router = express.Router();
const tours = require('../controllers/tours');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateTour } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Tour = require('../models/tour');

router.route('/')
    .get(catchAsync(tours.index))
    .post(isLoggedIn, upload.array('image'), validateTour, catchAsync(tours.createTour))


router.get('/new', isLoggedIn, tours.renderNewForm)

router.route('/:id')
    .get(catchAsync(tours.showTour))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateTour, catchAsync(tours.updateTour))
    .delete(isLoggedIn, isAuthor, catchAsync(tours.deleteTour));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(tours.renderEditForm))



module.exports = router;