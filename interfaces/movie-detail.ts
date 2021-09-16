import { NextPageContext } from "next";
export interface MovieDetailContainerProps extends NextPageContext {
    movieDetail: {
        title: string,
        adult: boolean,
        backdrop_path: string,
        budget: number,
        genres: object[],
        homepage:string,
        id: number,
        imdb_id: string,
        original_language: string,
        original_title: string,
        overview: string,
        popularity: number,
        poster_path: string,
        production_companies: object[],
        production_countries: object[],
        release_date: string,
        revenue: number,
        runtime: number,
        spoken_languages: object[],
        status: string
        tagline: string,
        video: boolean,
        vote_average: number,
        vote_count: number
    }
}
