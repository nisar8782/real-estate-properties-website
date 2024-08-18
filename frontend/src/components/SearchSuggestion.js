
import classes from './SearchSuggestion.module.css'

export default function SearchSuggestion({ suggestionsList, handleSuggestionClick }) {
    const classnames = `col p-0 ${classes['list-container']}`
    return (
        <div className={classnames}>
            <ul className={classes.list}>
                {suggestionsList.map((address) => <li className={classes['list-item']} key={address.CITY} onClick={() => handleSuggestionClick(address.CITY + ', ' + address.REGION.toUpperCase() + ', ' + address.POSTCODE)}>{address.CITY}, {address.REGION.toUpperCase()}, {address.POSTCODE}</li>)}
            </ul>
        </div>

    )
}
