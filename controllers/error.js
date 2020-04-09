exports.get404 = (req, res, next) =>{
    res.status(404).render('404', {
        pageTitle: 'error',
        isAuthenticated: req.session.isLoggedIn
    });
}