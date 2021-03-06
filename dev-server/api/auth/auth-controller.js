import { StringUtil } from '../../utilities/string-util';
import User from '../../model/user-model';
import bcrypt from 'bcrypt-nodejs';
import {generateJWT} from '../../services/auth-service';

export function index(req,res){
    const validation = validateIndex(req.body);
    if(!validation.isValid) {
        return res.status(400).json({message: validation.message });
    }

    User.findOne({ username: req.body.username.toLowerCase() }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }

        if (!user) {
            return res.status(500).json();
        }
        
       
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(result){
                const token = generateJWT(user);
                console.log(token);
                return res.status(200).json({token: token});
            }else{
                return res.status(401).json();
            }
        });
        //const passwordsMatch = User.passwordMatches(req.body.password, user.password);
        //  if(!passwordsMatch){
        //    return res.status(401).json();
        //  }
        //  return res.status(200).json();
    })
}

function validateIndex(body) {
    let errors = '';
    if(StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. ';
    }
    if(StringUtil.isEmpty(body.password)){
        errors += 'Password is required. ';
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}