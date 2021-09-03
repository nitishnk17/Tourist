const Tour = require('../models/tour');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const tour = await Tour.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    tour.reviews.push(review);
    await review.save();
    await tour.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/tours/${tour._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Tour.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/tours/${id}`);
}
