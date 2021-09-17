import { NextPageContext } from 'next'
import React from 'react'
import SEO from '../../components/SEO'
import { MovieDetailContainerProps } from '../../interfaces/movie-detail'
import { requestApi } from '../../utils/request'
import {Row, Col, Container} from 'reactstrap'
import styled from 'styled-components'
const ImageContainer = styled.div`
display:flex;
`

const PosterImage = styled.img`
margin: auto
`

 const MovieDetail = (props: MovieDetailContainerProps) => {
    const {movieDetail} = props

    return (
      <React.Fragment>
        <SEO title={movieDetail.title} description={movieDetail.overview} />
        <Container>
            <Row>
                <Col>
                    <ImageContainer>
                        <PosterImage alt={movieDetail.title} src={movieDetail.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : '/assets/images/noimage.jpg'} />
                    </ImageContainer>
                    <Row className='mt-5 mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Nama Film</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.title}
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Description</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.overview}
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Tanggal Rilis</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.release_date}
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Pendapatan</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.revenue}
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Durasi</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.runtime} Menit
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Rating</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.vote_average}
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col xs={12} sm={12} md={12} lg={3} xl={3} >
                            <h5>Jumlah Vote</h5>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={9} xl={9} >
                            {movieDetail.vote_count}
                        </Col>
                    </Row>
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