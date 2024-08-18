
import { useNavigate } from 'react-router-dom';
import classes from './Search.module.css'
import Button from './buttons/Button.js'
import { useState } from 'react'
import SearchSuggestion from './SearchSuggestion.js';
import { useDispatch, useSelector } from 'react-redux';
import { filterSliceActions } from '../store/index.js';

export default function Search() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectedPropertyType = useSelector((state) => state.selectedPropertyType)

    // const [selectedPropertyType, setSelectedPropertyType] = useState({ type: 'Sale', value: 1 })
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    function buttonClickHandle(event, buttonId) {
        // setSelectedPropertyType({ type: event.target.textContent, value: buttonId })
        dispatch(filterSliceActions.selectPropertyType(event.target.textContent))
    }

    const fetchSuggestions = async (input) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/addresses/suggestions/?city=' + input);
            const data = await response.json();

            setSuggestions(data);


        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    function submitHandler(event) {
        event.preventDefault()
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        const address = data.location
        const propertyType = data.type.toLowerCase()
        dispatch(filterSliceActions.searchAddress(address))
        // console.log(selectedPropertyType.value)
        navigate('properties/' + selectedPropertyType.toLowerCase() + '/' + encodeURIComponent(address))
    }

    function handleInputChange(event) {
        const value = event.target.value;
        setInputValue(value);
        fetchSuggestions(value);
    }
    function handleSuggestionClick(suggestion) {
        setInputValue(suggestion);
        setSuggestions([]); // Clear suggestions after selection
    }
    const classNames = `form-control form-control-lg form-control-borderless ${classes['search-input']}`
    return (
        <>
            <div className={classes["search-container"]}>
                <div className={classes["property-type"]}>
                    <Button type='button' onClick={(event) => buttonClickHandle(event, 1)} isSelected={selectedPropertyType == 'Buy'}>Buy</Button>
                    <Button type='button' onClick={(event) => buttonClickHandle(event, 2)} isSelected={selectedPropertyType == 'Rent'}>Rent</Button>
                    <Button type='button' onClick={(event) => buttonClickHandle(event, 3)} isSelected={selectedPropertyType == 'Sold'}>Sold</Button>
                </div>
                {/* <form className={classes["search-box"]} onSubmit={submitHandler}>
                <input type="text" name="location" id="location" autoComplete="off" placeholder='Enter city or zip code' onChange={handleInputChange} value={inputValue} />
                <input type="hidden" name='type' id='type' value={selectedPropertyType.value} />
                <Button type='submit' isSearchButton={true}>Search</Button>
            </form> */}

                <form onSubmit={submitHandler}>
                    <div className="row align-items-top w-100 m-auto">
                        <div className="col p-0 me-1">
                            <div>
                                <input name="location" id="location" autoComplete="off" className={classNames} type="search" placeholder="Search topics or keywords" onChange={handleInputChange} value={inputValue} />
                                <input type="hidden" name='type' id='type' value={selectedPropertyType} />
                            </div>
                            <div className="row align-items-top w-100 m-auto mt-2">
                                {suggestions.length !== 0 && <SearchSuggestion suggestionsList={suggestions} handleSuggestionClick={handleSuggestionClick} />}
                            </div>

                        </div>
                        <div className="col-auto p-0">
                            <button className="btn btn-lg btn-success" type="submit">Search</button>
                        </div>
                    </div>
                </form>

                <div className={classes['recent-search']}>Recent Searches</div>



            </div>

        </>

    )
}