import React, {useState} from 'react'
import {Button, Input} from 'reactstrap'

type AutocompleteProps = {
    name: string,
    results: object[],
    labelKey: string,
    onChange: any,
    onClick: any,
    placeholder?:string
}



const Autocomplete = (props:AutocompleteProps) => {

    const {name, onChange, results = [], labelKey, onClick, placeholder} = props

    return(
        <div>
            <Input placeholder={placeholder} onChange={onChange} name={name} />
            {results.length > 0 ? <React.Fragment>
                {results.map((res:any, index:number) => (
                    <div key={index} >
                        <Button onClick={() => onClick(res)} >{res[labelKey]} </Button>
                    </div>
                ))}
            </React.Fragment> : null}
            
        </div>
    )
}


export default Autocomplete