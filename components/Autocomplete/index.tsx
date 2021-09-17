import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
type AutocompleteProps = {
    name?: string,
    results: object[],
    onChange: any,
    onEnter: any,
    placeholder?:string,
    renderComponent:any
}

const AutoCompleteCustom = styled(Autocomplete)`
width: 100%
`

const AutocompleteComponent = (props:AutocompleteProps) => {

    const { onChange, results = [], renderComponent, onEnter} = props

    const onEnterSearch = (event:any) => {
        if (event.charCode === 13) {
            onEnter(event)
          }
    }
    
    return(
        <div>
            <AutoCompleteCustom
                id="free-solo-search"
                freeSolo
                options={results}
                disableClearable
                renderInput={(params) =><TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    onKeyPress={onEnterSearch}

                  />}
                onInputChange={onChange}
                renderOption={renderComponent}
                />            
        </div>
    )
}


export default AutocompleteComponent