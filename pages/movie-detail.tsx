import { NextPageContext } from 'next'
import React from 'react'
import SEO from '../components/SEO'

import { MovieDetailContainerProps } from '../interfaces/movie-detail'
import { requestApi } from '../utils/request'
import {Row, Col, Container} from 'reactstrap'
 const MovieDetail = (props: MovieDetailContainerProps) => {
    const {movieDetail} = props

    console.log(movieDetail, 'salik')

    return (
      <React.Fragment>
        <SEO title={movieDetail.title} description={movieDetail.overview} />
        <Container>
            <Row>
                <Col>
                    {movieDetail.title}
                </Col>
            </Row>
        </Container>  
      </React.Fragment>
    )
 }
 
 MovieDetail.getInitialProps = async (ctx:NextPageContext) => {
     const {query} = ctx
     let isError = false
     const url = `/movie/${query.id}?api_key=${process.env.apiKey}`
     const movieDetail = await requestApi(url, 'GET', null, null)
     if(!movieDetail) {
         isError = true
     }
     return {
         movieDetail,
         isError
     }
 }

 export default MovieDetail