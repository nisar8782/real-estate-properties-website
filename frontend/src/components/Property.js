
import './property-styles.css'
import { BedroomIcon, BathroomIcon, CarParkingIcon } from './SvgIcons'
import { Link } from 'react-router-dom';
import { currencyFormatter } from '../util/formatting';

export default function Property({ img, price, address, beds, baths, carParks, propertyType, slug, dateAdded }) {
    // console.log(slug.replace(/\//g, '-').replace(/ /g, ''))
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
    let addedOn;
    // console.log(dateAdded)
    // const utcDatetime = new Date(dateAdded);
    // const localDatetime = new Date(utcDatetime.getTime() + (utcDatetime.getTimezoneOffset() * 60000));
    // addedOn = localDatetime.toISOString().split('T')[0];
    const dateTime = new Date(dateAdded);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    addedOn = dateTime.toLocaleDateString('en-US', options);
    return (
        <div className="col">
            <Link to={`/properties/${slug}`}>
                <div className="card h-100">
                    <div className='img-container'>
                        <img src={img} className="card-img-top" alt="..." />
                    </div>

                    <div className="card-body">
                        {price !== 'None' && <h5 className="card-title">{price}</h5>}
                        {price === 'None' && <h5 className="card-title">Ask Agent</h5>}
                        <p className="card-text">{address}</p>
                        {propertyType && <p>{capitalize(propertyType)}</p>}
                        <p className="card-text">Added on {addedOn}</p>
                    </div>
                    <div className="card-footer ps-0 h-100">
                        <div className="container text-center">
                            <div className="row row-cols-auto">
                                {beds && beds !== '0' && <div className="col p-2 d-flex align-items-end">
                                    <BedroomIcon />
                                    <span className='fs-6 ms-1'>{beds}</span>
                                </div>}
                                {baths && baths !== '0' && <div className="col p-2 d-flex align-items-end">
                                    <BathroomIcon />
                                    <span className='fs-6 ms-1 mt-auto'>{baths}</span>
                                </div>}
                                {carParks && carParks !== '0' && <div className="col p-2 d-flex align-items-end">
                                    <CarParkingIcon />
                                    <span className='fs-6 ms-1'>{carParks}</span>
                                </div>}
                                {beds === '0' && baths === '0' && <div className="col p-2 d-flex align-items-end">
                                    {propertyType && propertyType !== '0' && <span className='fs-6 ms-1'>{capitalize(propertyType)}</span>}
                                </div>}
                                {/* <div className="col p-2 d-flex align-items-end">
                                    <span className='fs-6 ms-1'>{addedOn}</span>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </Link>

        </div>

    )
}
