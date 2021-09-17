import React from 'react'
import Head from 'next/head';

const defaultProps = {
    title: 'Movie Gallery',
    description: 'Movie Gallery is the best movie collection in the world'
}

type SeoProps = {
    title: string,
    description: string,
    image?:string
} & typeof defaultProps

const SEO = (props:SeoProps) => {
    const {title, description, image} = props
    return (
    <Head>
        <title>{title} </title>
        <meta name="description" content={description} />
        <meta key="og:type" property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta key="og:title" name="og:title" property="og:title" content={title} />
        <meta
            name="og:description"
            property="og:description"
            content={description}
            key="og:description"
        />
        {image ? <meta property="og:image" key="og:image" content={`${image}`} /> : null}
        <meta name='mobile-web-app-capable' content='yes' />
    </Head>

    )
}

SEO.defaultProps = defaultProps


export default SEO