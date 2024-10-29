export const userValidator = (req, res, next) => {
    if (
        req.body.name === undefined || req.body.email === undefined || req.body.password === undefined 
    ) { res.status(500).json({message: 'Please use a correct username/password/email'}); } 
    else { next(); }
}