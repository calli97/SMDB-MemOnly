const UserOpinion=require('../models/userOpinion')

class UsersOpinions{
    static #ROWS=[]
    static add=(idUser,tconst,rating,favorite,state)=>{
        const aux=UsersOpinions.#ROWS.filter(opinion=>(opinion.idUser==idUser&&opinion.tconst==tconst))
        if(aux.length>0){
            throw new Error('Opinion Already Exist')
        }else{
            const newOpinion=new UserOpinion(idUser,tconst,rating,favorite,state)
            UsersOpinions.#ROWS.push(newOpinion)
            return newOpinion
        }
    }
    static get=(idUser,tconst)=>{
        const opinion=UsersOpinions.#ROWS.filter(opinion=>(opinion.idUser==idUser&&opinion.tconst==tconst))
        if(opinion.length==1){
            return opinion[0]
        }else{
            throw new Error('Opinion Not Found')
        }
    }
    static delete=(idUser,tconst)=>{
        let length=UsersOpinions.#ROWS.length
        UsersOpinions.#ROWS=UsersOpinions.#ROWS.filter(opinion=>!(opinion.idUser==idUser&&opinion.tconst==tconst))
        if(UsersOpinions.#ROWS.length==length){
            //La opinion que se busca eliminar no se encuentra
            throw new Error('Opinion Not Found')
        }else{
            return null
        }
    }
    static update=(idUser,tconst,rating,favorite,state)=>{
        for(let i=0;i<UsersOpinions.#ROWS.length;i++){
            if(UsersOpinions.#ROWS[i].idUser==idUser&&UsersOpinions.#ROWS[i].tconst==tconst){
                let updateOpinion=new UserOpinion(idUser,tconst,rating,favorite,state)
                UsersOpinions.#ROWS[i]=updateOpinion
                return updateOpinion
            }
        }
        //No se encontro la opinion previamente
        throw new Error('Opinion Not Found')
    }
}

module.exports=UsersOpinions