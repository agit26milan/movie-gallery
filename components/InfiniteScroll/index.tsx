import React, {useEffect} from 'react'

const defaultProps = {
    onNextPage: () => null,
    children :null
}

type InfiniteScrollProps = {
    onNextPage: () => void,
    children?: object
} 

const InfiniteScroll  = (props:InfiniteScrollProps) => {
    const {onNextPage, children} = props
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
            if(el.getBoundingClientRect().bottom <= window.innerHeight) {
                console.log('masuk sini')
                onNextPage()
            }
        }
    }

    useEffect(() => {
        listenScroll()
    }, [])

    return (
        <div id='infinite-scroll' >
            {children}
        </div>
    )
}

InfiniteScroll.defaultProps = defaultProps

export default InfiniteScroll