import React from 'react'
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type AutocompleteProps = {
    name?: string,
    results: object[],
    labelKey: string,
    onChange: any,
    onClick: any,
    placeholder?:string
}

const CustmButtom = styled(Button)`
width: 50px

`

const SearchResult = styled.div`
box-shadow: rgb(49 53 59 / 12%) 0px 1px 6px 0px;
margin-top:15px;
`

const Result = styled.div`
padding: 5px 10px
`

const Autocomplete = (props:AutocompleteProps) => {

    const {name, onChange, results = [], labelKey, onClick, placeholder} = props

    return(
        <div>
            <InputGroup>
            <Input placeholder={placeholder} onChange={onChange} name={name} />
            <InputGroupAddon addonType="append"><CustmButtom aria-label='search' > <FontAwesomeIcon icon={faSearch} color='white' size={'1x'} /> </CustmButtom></InputGroupAddon>
            </InputGroup>
            <SearchResult>
            {results.length > 0 ? <React.Fragment>
                {results.map((res:any, index:number) => (
                    <Result key={index} >
                        <Button onClick={() => onClick(res)} >{res[labelKey]} </Button>
                    </Result>
                ))}
            </React.Fragment> : null}
            </SearchResult>
       
            
        </div>
    )
}


export default Autocomplete