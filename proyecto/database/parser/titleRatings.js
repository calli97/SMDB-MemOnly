const {parser}=require('./utils')
const Score=require('../../models/score')

class TitleRatings{
    static #INITIALIZE=false
    static #ROWS=[]
    static get(path){
        if(TitleRatings.#INITIALIZE){
            return TitleRatings.#ROWS
        }else{
            let rows=parser(path,'\t')
            for(let i=0;i<rows.length;i++){
                if((rows[i][0]=='NULL'&&rows[i][1]=='NULL'&&rows[i][2]=='NULL')||rows[i].length!=3){
                    continue
                }
                const titleId=rows[i][0]
                const averageRating=rows[i][1]=='NULL'?0:Number(rows[i][1])
                const numVotes=rows[i][2]=='NULL'?0:Number(rows[i][2])
                TitleRatings.#ROWS.push(new Score(titleId,averageRating,numVotes))
            }
            TitleRatings.#INITIALIZE=true
            return TitleRatings.#ROWS
        }
    }
}
module.exports=TitleRatings