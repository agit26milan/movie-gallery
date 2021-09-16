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
  CardTitle, 
  Container,
  Row,
  Col} from 'reactstrap'
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
cursor: pointer;
box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
height: 300px;
overflow: hidden;
white-space: pre-wrap;
display: -webkit-box;
line-height: 1.5;
-webkit-box-orient: vertical;
word-break: break-all;
text-overflow:ellipsis

`

const CustomCardText = styled(CardText)`
height: 170px;
overflow: hidden;
white-space: pre-wrap;
line-height: 1.5;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
word-break: break-all;
text-overflow:ellipsis;
`

type AutoCompleteDataProps = {
  name:string,
  id: number
}

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
          <main >
          <Container>
            <Row>
              <Col className='mt-3' xs={12} >
              <Autocomplete placeholder='Search Movie..' name='query' onChange={onSearch} results={autocompleteResult} labelKey='title' onClick={(data:AutoCompleteDataProps) => goToDetailPage(data.id)} />
              </Col>
              <Col xs={12} >
              {responseData && !isError ?  
            <InfiniteScroll onNextPage={onNextPage} >
                <React.Fragment>
                  <Row className='mt-3' >
                    
                    {listMovie && listMovie.map((movie: ListMovieProps, index: number) => (
                      <Col key={index} className='mb-3' xs={12} sm={12} md={6} lg={4} xl={3} >
                        <CustomCard onClick={() => goToDetailPage(movie.id)} >
                            <CardBody>
                              <CardTitle tag='h5' >
                                {movie.title}
                              </CardTitle>
                              <CustomCardText>
                                {movie.overview}
                              </CustomCardText>
                            </CardBody>
                        </CustomCard>
                        </Col>
                    ))}
                  </Row>
                  
                </React.Fragment>
            </InfiniteScroll> : <Spinner/>}
              </Col>
            </Row>

          </Container>
         
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
