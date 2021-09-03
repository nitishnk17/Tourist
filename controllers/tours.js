const Tour = require('../models/tour');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const tours = await Tour.find({}).populate('popupText');
    res.render('tours/index', { tours })
}

module.exports.renderNewForm = (req, res) => {
    res.render('tours/new');
}

module.exports.createTour = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.tour.location,
        limit: 1
    }).send()
    const tour = new Tour(req.body.tour);
    tour.geometry = geoData.body.features[0].geometry;
    tour.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    tour.author = req.user._id;
    await tour.save();
    console.log(tour);
    req.flash('success', 'Successfully made a new tour!');
    res.redirect(`/tours/${tour._id}`)
}

module.exports.showTour = async (req, res,) => {
    const tour = await Tour.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!tour) {
        req.flash('error', 'Cannot find that tour!');
        return res.redirect('/tours');
    }
    res.render('tours/show', { tour });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const tour = await Tour.findById(id)
    if (!tour) {
        req.flash('error', 'Cannot find that tour!');
        return res.redirect('/tours');
    }
    res.render('tours/edit', { tour });
}

module.exports.updateTour = async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const tour = await Tour.findByIdAndUpdate(id, { ...req.body.tour });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    tour.images.push(...imgs);
    await tour.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await tour.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated tour!');
    res.redirect(`/tours/${tour._id}`)
}

module.exports.deleteTour = async (req, res) => {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted tour')
    res.redirect('/tours');
}