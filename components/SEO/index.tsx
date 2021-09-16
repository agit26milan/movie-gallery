import React from 'react'
import Head from 'next/head';

const defaultProps = {
    title: 'Movie Gallery',
    description: 'Movie Gallery is the best movie collection in the world'
}

type SeoProps = {
    title: string,
    description: string
} & typeof defaultProps

const SEO = (props:SeoProps) => {
    const {title, description} = props
    return (
    <Head>
        <title>{title} </title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    )
}

SEO.defaultProps = defaultProps


export default SEO