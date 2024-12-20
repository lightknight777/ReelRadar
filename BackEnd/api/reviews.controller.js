import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview (req, res,next) {
        try {
            const movieId=req.body.movie_id // Get information from the request's body parameter
            const review=req.body.review // Data from frontend will be passed in as the request's body
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview( //Send the information to ReviewsDAO.addReview
                movieId,
                userInfo,
                review,
                date
            )
            res.json({status: "success "}) // Return success if the post works and an error if it didn't
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try{
            const reviewId = req.body.review_id
            const review = req.body.review
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                req.body.user_id,
                review,
                date
            )
            var {error} = ReviewResponse
            if (error) {
                res.status.json({error})
            }
            if(ReviewResponse.modifiedCount === 0){
                throw new Error ("unable to update review. User may not be original poster")
            }
            res.json({status: "success "})
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }
}