import Property from "./Property";
import { useParams, Form } from 'react-router-dom';
import BreadCrumb from "./BreadCrumb";
import { fetchProperties } from "../util/http";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import classes from './Properties.module.css'

import { useSelector, useDispatch } from "react-redux";
import { filterSliceActions } from "../store/index";
import { DropDownIcon } from "./SvgIcons";


export default function Properties() {
    const dispatch = useDispatch();
    const selectedBeds = useSelector((state) => state.selectedBedsNo)
    const activeBed = useSelector((state) => state.activeBed)
    const selectedPropertyType = useSelector((state) => state.selectedPropertyType)
    const activePropertyType = useSelector((state) => state.activePropertyType)
    const addressSearched = useSelector((state) => state.searchAddress)



    const { type, address } = useParams();
    const [pageParam, setPageParam] = useState(1)
    // const [bedsctiveClass, setBedsActiveClass] = useState(null)
    // const [typeActiveClass, setTypeActiveClass] = useState(null)
    // const [selectedBedsNo, setSelectedBedsNo] = useState(null)
    // const [selectedPropertyType, setSelectedPropertyType] = useState(null)
    const { data, isLoading, error, isError, refetch } = useQuery({
        queryKey: [address],
        queryFn: ({ signal }) => fetchProperties({ signal, address, type, pageParam }),
        refetchOnWindowFocus: false,
    });
    if (isError) {
        console.log(error)
    }
    function hanlePrevPageClick() {
        if (data.previous && pageParam > 1) {
            setPageParam(pageParam - 1)
            refetch()
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: adds smooth scrolling behavior
            })
        }
    }
    function hanleNextPageClick() {
        if (data.next) {
            setPageParam(pageParam + 1)
            refetch()
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Optional: adds smooth scrolling behavior
            })
        }
    }
    function handleFilterClick(event) {
        event.preventDefault()
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        if (data.hasOwnProperty('bedrooms')) {
            dispatch(filterSliceActions.selectBed(data.bedrooms))
        }
        if (data.hasOwnProperty('type')) {
            dispatch(filterSliceActions.selectPropertyType(data.type))
        }
        console.log(data)
    }
    function handleRadioButtonClick(event) {
        // setBedsActiveClass(event.target.value)
        dispatch(filterSliceActions.activeBed(event.target.value))
    }
    function handleTypeRadioButtonClick(event) {
        dispatch(filterSliceActions.activePropertyType(event.target.value))
    }
    const activeClassName = classes['radio-button'] + ' ' + classes.active
    function ClearBedFilterHandler() {
        dispatch(filterSliceActions.resetBeds())
    }
    return (
        <div className="properties">
            <BreadCrumb type={type} address={address} />
            <hr width="100%" size="2" />
            <Form onSubmit={handleFilterClick} className={classes['form-container']}>
                <div className={classes["search-container"]}>
                    <input type="search" id="search" name="search" className={classes['search-input']} placeholder="Search city or zipCode" value={addressSearched} />
                    <button type="submit" className={classes['search-button']}>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <symbol id="search-icon">
                                <path d="M11 15.1021C9.30566 15.1021 7.84827 14.069 7.22345 12.6H14.7766C14.1517 14.069 12.6943 15.1021 11 15.1021Z" fill="#f8f9fa"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11C20 13.1216 19.2577 15.0706 18.025 16.6109L22.207 20.793L20.793 22.207L16.6109 18.025C15.0706 19.2577 13.1216 20 11 20C6.0376 20 2 15.9624 2 11C2 6.0376 6.0376 2 11 2C15.9624 2 20 6.0376 20 11ZM4 11C4 14.8599 7.14014 18 11 18C14.8599 18 18 14.8599 18 11C18 7.14014 14.8599 4 11 4C7.14014 4 4 7.14014 4 11Z" fill="#f8f9fa"></path>
                            </symbol>
                            <use xlinkHref="#search-icon" />
                        </svg>
                    </button>
                </div>
                <div className={classes["dropdown"]}>

                    <span className={selectedBeds ? classes['filter-title'] + ' ' + classes.active : classes['filter-title']}>{selectedBeds ? selectedBeds == 'Studio' ? 'Studio' : selectedBeds == 1 ? selectedBeds + ' ' + 'bed' : selectedBeds + ' ' + 'beds' : 'Beds'} <DropDownIcon /></span>

                    <div className={classes["dropdown-content"]}>
                        <span className={classes.title}>Bedrooms</span>
                        <div className={classes['radio-buttons']}>
                            <div className={activeBed == 'Studio' ? activeClassName + ' ' + classes.studio : classes['radio-button'] + ' ' + classes.studio}>
                                <input type="radio" id="studio" name="bedrooms" readOnly checked={activeBed === 'Studio'} value="Studio" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="studio">Studio</label>
                            </div>
                            <div className={activeBed == 1 ? activeClassName : classes['radio-button']}>
                                <input type="radio" id="1-bedroom" name="bedrooms" readOnly checked={activeBed === '1'} value="1" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="1-bedroom">1</label>
                            </div>
                            <div className={activeBed == 2 ? activeClassName : classes['radio-button']}>
                                <input type="radio" id="2-bedroom" name="bedrooms" readOnly checked={activeBed === '2'} value="2" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="2-bedroom">2</label>
                            </div>
                            <div className={activeBed == 3 ? activeClassName : classes['radio-button']}>
                                <input type="radio" id="3-bedroom" name="bedrooms" readOnly checked={activeBed === '3'} value="3" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="3-bedroom">3</label>
                            </div>
                            <div className={activeBed == 4 ? activeClassName : classes['radio-button']}>
                                <input type="radio" id="4-bedroom" name="bedrooms" readOnly checked={activeBed === '4'} value="4" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="4-bedroom">4</label>
                            </div>
                            <div className={activeBed == 5 ? activeClassName : classes['radio-button']}>
                                <input type="radio" id="5-bedroom" name="bedrooms" readOnly checked={activeBed === '5'} value="5" className={classes.html} onClick={handleRadioButtonClick} />
                                <label htmlFor="5-bedroom">5</label>
                            </div>
                        </div>
                        <button className={classes['submit-button']} type="submit">Apply</button>
                        <button className={classes['submit-button']} type="button" onClick={ClearBedFilterHandler}>Clear</button>
                    </div>
                </div>
                <div className={classes["dropdown"]}>
                    <span className={classes['filter-title'] + ' ' + classes.active}>{selectedPropertyType ? selectedPropertyType : 'Type'} <DropDownIcon /></span>
                    <div className={classes["dropdown-content"]}>
                        <div className={classes['radio-buttons']}>
                            <div className={activePropertyType == 'Buy' ? activeClassName + ' ' + classes['type-radio-button'] : classes['type-radio-button']}>
                                <input type="radio" id="buy" name="type" readOnly value="Buy" checked={activePropertyType === 'Buy'} className={classes.html} onClick={handleTypeRadioButtonClick} />
                                <label htmlFor="buy">Buy</label>
                            </div>
                            <div className={activePropertyType == 'Rent' ? activeClassName + ' ' + classes['type-radio-button'] : classes['type-radio-button']}>
                                <input type="radio" id="rent" name="type" readOnly value="Rent" checked={activePropertyType === 'Rent'} className={classes.html} onClick={handleTypeRadioButtonClick} />
                                <label htmlFor="rent">Rent</label>
                            </div>
                            <div className={activePropertyType == 'Sold' ? activeClassName + ' ' + classes['type-radio-button'] : classes['type-radio-button']}>
                                <input type="radio" id="sold" name="type" readOnly value="Sold" checked={activePropertyType === 'Sold'} className={classes.html} onClick={handleTypeRadioButtonClick} />
                                <label htmlFor="sold">Sold</label>
                            </div>

                        </div>
                        <button className={classes['submit-button']} type="submit">Apply</button>
                    </div>
                </div>

                {/* <div className={classes['form-container']}>
                    <select name="beds" id="beds" className={classes['bed-options']}>
                        <option selected>Beds</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>

                    </select>
                </div> */}


                {/* <div className="col-1">
                    <select className="form-select form-select-sm" style={{ width: '5rem' }} aria-label="Small select example" name="beds">
                        <option selected>Beds</option>
                        <option value="Studio">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    <button type="submit">Submit</button>
                </div>
                <div className="col-1">
                    <select className="form-select form-select-sm" style={{ width: '5rem' }} aria-label="Small select example" name="price">
                        <option selected>Price</option>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="50000">50000</option>
                        <option value="100000">100000</option>
                    </select>
                </div>
                <div className="col-1">
                    <select name="test" id="test">
                        <option value='t'>t</option>
                        <option value='r'>r</option>
                    </select>
                </div> */}



            </Form>
            <hr width="100%" size="2" />

            {data && <div className="row row-cols-1 row-cols-md-3 g-4">
                {data.results.map((property) => <Property key={property.slug} img={property.images[0]?.url} price={property.price} address={property.fkaddress.displayAddress} beds={property.bedRooms} baths={property.bathRooms} carParks={property.carSpaces} propertyType={property.propertyType} slug={`${property.saleStatus}/${property.propertyType.replace(/\//g, '-').replace(/ /g, '').toLowerCase()}/${property.slug}`} dateAdded={property.createdAt} />)}

            </div>}
            {isLoading && <h1>loading data</h1>}
            {isError && <h2>Some thing went wrong. Please try again.</h2>}
            {data && data.next && <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg justify-content-center mt-4">
                    <li className="page-item">
                        <button className="page-link" onClick={hanlePrevPageClick} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">{pageParam}</a></li>
                    <li className="page-item">
                        <button className="page-link" onClick={hanleNextPageClick} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>}
        </div >
    )
}


// export default function Properties({ data }) {
//     const { type, address } = useParams();
//     // console.log(data)
//     return (
//         <div className="properties">
//             <BreadCrumb type={type} address={address} />
//             <div className="row row-cols-1 row-cols-md-3 g-4">
//                 {data.map((property) => <Property key={property._id} img={property.media[0]?.url} price={property.priceDetails} address='6 Floret Lane, DONNYBROOK VIC 3064' beds={property.propertyDetails.features.bedRooms} baths={property.propertyDetails.features.bathRooms} carParks={property.propertyDetails.features.carSpaces} propertyType={property.propertyType} slug={`${property.saleStatus}/${property.propertyType}/${property.slug}`} />)}

//             </div>
//         </div>
//     )
// }


// export async function loader({ params, query }) {

//     let url = 'http://127.0.0.1:8000/api/properties/list/'
//     if (query) {
//         url += '?latest=true'
//     }
//     if (params.address) {
//         const address = params.address.split(',')[0];
//         url += `?loc=${address}`
//     }
//     // const propertyType = params.type;
//     // console.log(propertyType, address)
//     const response = await fetch(url)
//     const data = await response.json();
//     if (!response.ok) {
//         throw json({ message: 'Could not fetch details for selected event' }, { status: 500 })
//     } else {
//         const parsedResponse = data.map(item => {
//             return {
//                 ...item,
//                 datasource: JSON.parse(item.datasource),
//                 propertyDetails: {
//                     ...JSON.parse(item.propertyDetails),
//                     features: JSON.parse(JSON.parse(item.propertyDetails).features),
//                     description: JSON.parse(JSON.parse(item.propertyDetails).description)
//                 },
//                 media: JSON.parse(item.media)
//             };
//         });
//         return parsedResponse
//     }
// }