module.exports = {
   ensureAuth: (req, res, next) => {
      //Ensure icant go tothe next page by adding the route on the URL
      
      if(req.isAuthenticated()){
         return next()
      }else{
         res.redirect('/')
      }
   },
   
   ensureGuest: (req, res, next) => {
      if(req.isAuthenticated()){
         res.redirect('/dashboard')
      }else{
         return next()
      }
   }
}