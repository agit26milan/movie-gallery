import React from 'react'
import styled from 'styled-components'
const NoDataContent = styled.div`
height: 90vh;
display: flex;
align-items: center;
justify-content: center
`
const NoDataImage = styled.img`
height: 512px;
width: 512px
`

type NoDataProps = {
    title: string,
    subtitle: string
}

const NoDataComponent = (props: NoDataProps) => {
    const {title, subtitle} = props
    return (
        <NoDataContent>
            <div>
            <NoDataImage src={'/assets/images/nodata.jpg'} />
            <h3 className='text-center' >
                {title}
            </h3>
            <div className='mt-3 text-center' >
                <p>{subtitle} </p>
            </div>
            </div>     
        </NoDataContent>
    )
}


export default NoDataComponent