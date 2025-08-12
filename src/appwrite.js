import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = '6899c34d00253f159b9f'
const DATABASE_ID = '6899c532001b2f30a889';
const COLLECTION_ID = '6899c5940000627872a3';

const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

const database = new Databases(client)


export const updateSearchCount = async (searchTerm , movie) => {
        try{
            const result = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
                Query.equal('searchTerm' , searchTerm)
            ])

            if(result.documents.length > 0){
                const doc = result.documents[0]
                await database.updateDocument(DATABASE_ID , COLLECTION_ID , doc.$id , {count : doc.count + 1})
            }else{
                await database.createDocument(DATABASE_ID , COLLECTION_ID , ID.unique() , {
                    searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}` ,
                })
            }

        }catch(error){
            console.error(error)
        }
}


export const getTrendingMovies = async () => {
    try{
        const res = await database.listDocuments(DATABASE_ID , COLLECTION_ID , [
            Query.limit(5),
            Query.orderDesc("count")
        ])
        console.log(res)
        return res.documents
    }catch(error){
        console.error(error)
    }
}