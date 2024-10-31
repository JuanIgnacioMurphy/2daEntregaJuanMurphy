export const userValidator = (req, res, next) => {
    if (
        req.body.name === undefined || typeof req.body.name !== 'string' ||
        req.body.email === undefined || typeof req.body.email !== 'string' ||
        req.body.password === undefined || typeof req.body.password !== 'string'
    ) 
    
    { res.status(400).json({message: 'Please use a correct username/password/email'}); } 
    else { next(); }
}