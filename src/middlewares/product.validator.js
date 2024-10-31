export const productValidator = (req, res, next) => {
    if (
        req.body.title === undefined || typeof req.body.title !== 'string' ||
        req.body.description === undefined || typeof req.body.description !== 'string' ||
        req.body.code === undefined || typeof req.body.code !== 'string' ||
        req.body.price === undefined || typeof req.body.price == isNaN ||
        req.body.status === undefined || typeof req.body.status !== Boolean ||
        req.body.stock === undefined || typeof req.body.stock == isNaN ||
        req.body.category === undefined || typeof req.body.category!== 'string'
    ) 
    
    { res.status(400).json({message: 'All fields must be completed in order to upload a new product | Use te correct type of data for each input'}); } 
    else { next(); }
}