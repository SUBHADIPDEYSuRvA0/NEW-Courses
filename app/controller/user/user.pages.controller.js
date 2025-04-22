const User = require("../../models/user");
const ReferalBonus = require("../../models/refaralbouns")


class userpagesController{
login(req, res){
        const message = req.session.message;
        req.session.message = null;
        res.render('user/login', { message });
    }
    index(req, res){
        const user = req.user


        console.log(user)
        const message = req.session.message;
        req.session.message = null;
        res.render('user/index',{message,user});
    }
    profile=async(req, res)=>{
        const user = req.user?.id || null;
        const refferalbonus = await ReferalBonus.findOne()
        const me = await User.findById(user);
        const message = req.session.message;
        req.session.message = null;
        res.render('user/profile',{message,user,me,refferalbonus});
    }
    contact(req, res){
        const user = req.user

        const message = req.session.message;
        req.session.message = null;
        res.render('user/contactus',{message,user});
    }
    about(req, res){
        const user = req.user

        const message = req.session.message;
        req.session.message = null;
        res.render('user/aboutus',{
            message,
            user
        });
    }
    courses(req, res){
        const user = req.user

        const message = req.session.message;
        req.session.message = null;
        res.render('user/courses',{
            message,
            user
        });
    }
}

module.exports = new userpagesController();