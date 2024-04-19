import Movie from "./movie"

export default function MovieList(props){
    return(
        <div className="row">
            <div className="column s12">
                {
                    props.movies.map((movie, i) => {
                        return <Movie key={i} img={movie.poster_path} title={movie.original_title}/>
                    }) 
                }
            </div>
        </div>
    )
}