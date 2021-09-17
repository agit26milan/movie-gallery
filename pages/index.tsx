import type { NextPageContext } from 'next'
import React, {useState, useEffect, ChangeEvent} from 'react'
import SEO from '../components/SEO'
import { HomepageProps } from '../interfaces/homepage'
import { requestApi } from '../utils/request'
import {useRouter} from 'next/router'
import InfiniteScroll from '../components/InfiniteScroll'
import { Spinner,  Card, CardText, CardBody,
  CardTitle, 
  Container,
  Row,
  Col,
  CardImg,
  Button} from 'reactstrap'
import styled from 'styled-components'
import Autocomplete from '../components/Autocomplete'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faVoteYea} from '@fortawesome/free-solid-svg-icons'
import { formatMoney } from '../utils/common'
import Box from '@mui/material/Box';

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

`

const CustomCardText = styled(CardText)`
overflow: hidden;
white-space: pre-wrap;
line-height: 1.5;
-webkit-line-clamp: 4;
-webkit-box-orient: vertical;
word-break: break-all;
text-overflow:ellipsis;
height: 210px
`

const RatingContainer = styled.div`
background-color: white;
padding: 5px 0px;
display:flex;
align-items: center;
margin-right: 10px
`

const StarIcon = styled(FontAwesomeIcon)`
margin-right: 10px
`

const AdditionalInfoContainer = styled.div`
display:flex;
flex-wrap: wrap
`
const ButtonResult = styled(Button)`
background-color: transparent;
color: black;
width: 100%;
text-align: left,
border-color:none;
border-bottom: 1px solid #f2f2f2

`

const Result = styled.div`
padding: 5px 10px
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
  const [querySearch, setQuerySearch] = useState('')
    const getMovieList = async (page:number) => {
        setLoading(true)
        let url = `/movie/top_rated?api_key=${process.env.apiKey}&page=${page}`
        const processGetMovie = await requestApi(url, 'GET', null, null)
        if(processGetMovie) {
            if(page <=1) {
              setListMovie(processGetMovie.results)
            } else {
              setListMovie([...listMovie, ...processGetMovie.results])
            }

        }
        setLoading(false)
    }

    const searchKeyword = async (query:string = '') => {
      let url = `/search/keyword?api_key=${process.env.apiKey}&page=1&query=${query}`
      if(query.length > 0) {
        const searchMovieRes = await requestApi(url, 'GET', null, null)
        if(searchMovieRes) {
          const mappingMovie = searchMovieRes.results.map((movie:AutoCompleteDataProps) => ({label: movie.name, id: movie.id}))
          setAutocompleteResult(mappingMovie)
        }
      } else {
        setAutocompleteResult([])
      }
     
    }

    const onNextPage = () => {
      setActivePage((prevState) => prevState + 1)

    }

    const goToDetailPage = (id:number) => {
        router.push({
            pathname: '/movie-detail',
            query: {...query, id}
        })
    }

    const renderOption = (props:any, option:any) => {
      return (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.label}
        </Box>
       
      )
    }

    const searchMovie = async (page:number = 1, value:string = '') => {
      const url = `/search/movie?api_key=${process.env.apiKey}&page=${page}&query=${value}`
      if(value.length > 0) {
        setLoading(true)
        const processSearchMovie = await requestApi(url, 'GET', null, null)
        if(processSearchMovie) {
          if(page <= 1) {
            setListMovie(processSearchMovie.results)
          } else {
            setListMovie([...listMovie, ...processSearchMovie.results])
          }
          setLoading(false)
        } else {
          setLoading(false)
        }
      } 
 
    }

    const onSearch = (event:ChangeEvent<HTMLInputElement>) => {
      const {target} = event
      const { value} = target
      searchKeyword(value)
    }

    const onEnter = (event:any) => {
      const {value} = event.target
      setQuerySearch(value)
      setActivePage(1)
      if(value !== '') {
        searchMovie(1, value)
      } else {
        getMovieList(1)
      }
    }

    useEffect(() => {
      if(activePage <= maxPage && !loading && !querySearch) {
        getMovieList(activePage)
      } else {
        searchMovie(activePage, querySearch)
      }
    }, [activePage])


      return (
        <React.Fragment >
        <SEO />
          <main >
          <Container>
            <Row>
              <Col className='mt-3' xs={12} >
              <Autocomplete renderComponent={renderOption} placeholder='Search Movie..' name='query' onChange={onSearch} results={autocompleteResult} onEnter={onEnter} />
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
                            <CardImg className='mb-3' top width="100%" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                              <CardTitle tag='h5' >
                                {movie.title}
                              </CardTitle>
                              <CustomCardText>
                                {movie.overview}
                              </CustomCardText>
                              <div>
                                <AdditionalInfoContainer>
                                <RatingContainer>
                                <StarIcon width={'20px'} icon={faStar} color='#f5c518' />
                                {movie.vote_average}
                                </RatingContainer>
                                <RatingContainer>
                                <StarIcon width={'20px'} icon={faVoteYea} color='#f5c518' />
                                {formatMoney(movie.vote_count)}
                                </RatingContainer>
                                </AdditionalInfoContainer>
                              
                            </div>
                            </CardBody>
                           
                        </CustomCard>
                        </Col>
                    ))}
                  </Row>
                  
                </React.Fragment>
            </InfiniteScroll> : <div className='flex mt-3' ><Spinner className='m-auto' /></div>}
              </Col>
            </Row>

          </Container>
         
          </main>
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
