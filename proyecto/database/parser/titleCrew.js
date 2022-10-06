const {parser}=require('./utils')
const Crew=require('../../models/crew')

class TitleCrew{
    static #INITIALIZE=false
    static #ROWS=[]
    static get(path){
        if(TitleCrew.#INITIALIZE){
            return TitleCrew.#ROWS
        }else{
            let rows=parser(path,'\t')
            for(let i=0;i<rows.length;i++){
                if(rows[i].length!=3){
                    continue
                }
                const tconst=rows[i][0]
                const directors=rows[i][1]=='NULL'?null:rows[i][1].split(',')
                const writers=rows[i][2]=='NULL'?null:rows[i][2].split(',')
                TitleCrew.#ROWS.push(new Crew(tconst,directors,writers))
            }
            return TitleCrew.#ROWS
        }
    }
}

module.exports=TitleCrew