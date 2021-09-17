import React, {useEffect, useState} from 'react'
import { Button } from 'reactstrap'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faArrowCircleUp} from '@fortawesome/free-solid-svg-icons'
const defaultProps = {
    onNextPage: () => null,
    children :null
}

type InfiniteScrollProps = {
    onNextPage: () => void,
    children?: object
} 

const RoundButton = styled(Button)`
position:fixed;
bottom: 80px;
right: 50px;
border-radius: 50%;
display: flex;
width:50px;
height: 50px;
align-items: center;
justify-content: center
`

const InfiniteScroll  = (props:InfiniteScrollProps) => {
    const {onNextPage, children} = props
    const [showScrollUp, setShowScrollUp] = useState(false)
    const listenScroll = () => {
        document.addEventListener('scroll', checkBottomDiv)
    }

    const checkBottomDiv = () => {
        const wrappedElement = document.getElementById('infinite-scroll')
        if(wrappedElement) {
            isBottomEl(wrappedElement)
        }
       
    }

    const isBottomEl = (el:any) => {
        if(el.getBoundingClientRect) {
            if(el.getBoundingClientRect().bottom - 10 <= window.innerHeight) {
                onNextPage()
            }
            if(el.getBoundingClientRect().y < 0) {
                setShowScrollUp(true)
            } else {
                setShowScrollUp(false)
            }
        }
    }

    const gotoTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }


    useEffect(() => {
        listenScroll()
    }, [])

    return (
        <div id='infinite-scroll' >
            {children}
            {showScrollUp ? <RoundButton onClick={gotoTop} ><FontAwesomeIcon icon={faArrowCircleUp} /> </RoundButton> : null}
        </div>
    )
}

InfiniteScroll.defaultProps = defaultProps

export default InfiniteScroll