import type { NextPageContext } from 'next'
import dynamic from 'next/dynamic'
import React, {useState, useEffect, ChangeEvent} from 'react'
import SEO from '../components/SEO'
import Footer from '../features/Footer'
import { HomepageProps } from '../interfaces/homepage'
import { requestApi } from '../utils/request'
import {useRouter} from 'next/router'
import InfiniteScroll from '../components/InfiniteScroll'
import { Spinner,  Card, CardText, CardBody,
  CardTitle } from 'reactstrap'
import styled from 'styled-components'
import Autocomplete from '../components/Autocomplete'

type ListMovieProps = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: string[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

const CustomCard = styled(Card)`
cursor: pointer
`

type AutoCompleteDataProps = {
  name:string,
  id: number
}

const DynamicNavbar = dynamic(() => import('../features/Navbar'))
const Home = (props:HomepageProps) => {
  const {responseData, isError} = props
  const [listMovie, setListMovie] = useState<any>(responseData.results)
  const router = useRouter()
  const {query} = router
  const [loading, setLoading] = useState(false)
  const [activePage, setActivePage] = useState(1)
  const [autocompleteResult, setAutocompleteResult] = useState([])
  const [maxPage] = useState(responseData.total_pages)
    const getMovieList = async (page:number) => {
        setLoading(true)
        let url = `/movie/top_rated?api_key=${process.env.apiKey}&page=${page}`
        const processGetMovie = await requestApi(url, 'GET', null, null)
        if(processGetMovie) {
            setListMovie([...listMovie, ...processGetMovie.results])

        }
        setLoading(false)
    }

    const searchMovie = async (query:string = '') => {
      let url = `/search/movie?api_key=${process.env.apiKey}&page=1&query=${query}`
      console.log(url, 'salakio')
      if(query.length > 0) {
        const searchMovieRes = await requestApi(url, 'GET', null, null)
        if(searchMovieRes) {
          setAutocompleteResult(searchMovieRes.results)
        }
      } else {
        setAutocompleteResult([])
      }
     
    }

    const onNextPage = () => {
      console.log(activePage, 'sunat')
      setActivePage((prevState) => prevState + 1)

    }

    const goToDetailPage = (id:number) => {
        router.push({
            pathname: '/movie-detail',
            query: {...query, id}
        })
    }

    const onSearch = (event:ChangeEvent<HTMLInputElement>) => {
      const {target} = event
      const { value} = target
      searchMovie(value)
      console.log(name, value, 'sasa')
    }

    console.log(activePage, maxPage, loading, 'lalak')
    useEffect(() => {
      if(activePage <= maxPage && !loading) {
        getMovieList(activePage)
      }
    }, [activePage])


      return (
        <React.Fragment >
        <SEO />
        <DynamicNavbar />
          <main >
          <Autocomplete name='query' onChange={onSearch} results={autocompleteResult} labelKey='title' onClick={(data:AutoCompleteDataProps) => goToDetailPage(data.id)} />
          {responseData && !isError ?  
            <InfiniteScroll onNextPage={onNextPage} >
                <React.Fragment>
                    {listMovie && listMovie.map((movie: ListMovieProps, index: number) => (
                        <CustomCard onClick={() => goToDetailPage(movie.id)} key={index} >
                            <CardBody>
                              <CardTitle tag='h5' >
                                {movie.title}
                              </CardTitle>
                              <CardText>
                                {movie.overview}
                              </CardText>
                            </CardBody>
                        </CustomCard>
                    ))}
                </React.Fragment>
            </InfiniteScroll> : <Spinner/>}
          </main>
          <Footer />
        </React.Fragment>
      )
    }

Home.getInitialProps = async (ctx:NextPageContext) => {
  let responseData = {}
  let isError = false
  const url = `/movie/top_rated?api_key=${process.env.apiKey}&page=1`
  const processGetMovie = await requestApi(url, 'GET', null, null)
  if(processGetMovie) {
    responseData = {...responseData, ...processGetMovie}
  } else {
    isError = true
  }
  return {
    responseData,
    isError
  }

}

export default Home
