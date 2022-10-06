const TitleRatings=require('./parser/titleRatings')

let ratingsPersistance={}

ratingsPersistance.getTitleRating=(tconst)=>{
    let titleRatings=TitleRatings.get('./datasets/title_ratings.csv')
    let rating=titleRatings.filter(rating=>rating.tconst==tconst)
    return rating.length==1?rating[0]:null
}

module.exports=ratingsPersistance