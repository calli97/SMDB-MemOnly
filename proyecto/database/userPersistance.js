const User=require('../models/user')

class Users{
    static #ROWS=[]
    static #NEXTID=0
    static add=(username,pass,fullname,email)=>{
        //Valido que sea unico
        const aux=Users.#ROWS.filter(user=>(user.username==username||user.email==email))
        if(aux.length>0){
            //Ya existe el usuario o el email
            throw new Error('Invalid User or Email')
        }else{
            const newUser=new User(Users.#NEXTID,username,pass,fullname,email)
            Users.#NEXTID++
            Users.#ROWS.push(newUser)
            return newUser
        }
    }
    static verifyUser=(username,pass)=>{
        let user=Users.#ROWS.filter(user=>user.username==username)
        if(user.length!=1){
            //No existe el usuario
            throw new Error('Invalid User')
        }else{
            if(user[0].pass!=pass){
                //Contrasenia Incorrecta
                throw new Error('Invalid Password')
            }else{
                //Contrasenia y usuario correctos
                return user[0]
            }
        }
        
    }
}

module.exports=Users