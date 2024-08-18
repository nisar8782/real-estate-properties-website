import React from 'react'
import classes from './PropertyDetails.module.css'
import { fetchPropertyDetails } from '../util/http'
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';


export default function PropertyDetails() {
    const { slug } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: [slug],
        queryFn: ({ signal }) => fetchPropertyDetails({ signal, slug }),
        enabled: slug !== '',
        refetchOnWindowFocus: false,
    });
    let description;
    let insideFeatures;
    let outsideFeatures;
    let dateAdded;
    if (data) {
        description = data.description.split(';')
        if (data.insideFeatures) {
            insideFeatures = data.insideFeatures.split(';')
        }
        if (data.outsideFeatures) {
            outsideFeatures = data.outsideFeatures.split(';')
        }
        // Given datetime string
        const datetimeStr = data.createdAt;
        const datetimeObj = new Date(datetimeStr);
        const localDatetime = new Date(datetimeObj.getTime() + datetimeObj.getTimezoneOffset() * 60000);
        dateAdded = localDatetime.toISOString().split('T')[0];
    }
    return (
        <>
            <div className={classes["my-container"]}>
                <div id="carouselExample" className="carousel slide h-100">
                    <div className="carousel-inner carousel-container h-100">
                        {data && data.images && data.images.map(((img, index) => (
                            <div key={img.url} className={`carousel-item ${index === 0 ? 'active' : ''} h-100`}>
                                <img src={img.url} className="d-block w-100 h-100" alt="..." style={{ objectFit: 'cover' }} />
                            </div>
                        )))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


            </div>
            <div className={classes['details-section']}>
                {isLoading && <span>Loading</span>}
                {data && <div className={classes['properties-details']}>
                    <div className={classes.price}>
                        <div>{data.fkaddress.displayAddress}</div>
                        <p>
                            Guide Price
                        </p>
                        {data.price !== 'None' && <span>{data.price}</span>}
                        {data.price === 'None' && <span>Ask Agent</span>}
                    </div>

                    <div className={classes['property-features']}>
                        <div className={classes.feature}>
                            <div className={classes['feature-title']}>Property Type</div>
                            <div className={classes['feature-value']}>{data.propertyType}</div>
                        </div>
                        <div className={classes.feature}>
                            <div className={classes['feature-title']}>Bedrooms</div>
                            <div className={classes['feature-value']}>{data.bedRooms}</div>
                        </div>
                        <div className={classes.feature}>
                            <div className={classes['feature-title']}>Bathrooms</div>
                            <div className={classes['feature-value']}>{data.bathRooms}</div>
                        </div>
                        {data.landArea && <div className={classes.feature}>
                            <div className={classes['feature-title']}>Area</div>
                            <div className={classes['feature-value']}>{data.landArea}m²</div>
                        </div>}
                    </div>
                    {insideFeatures && <div className={classes['property-inside-feature']}>
                        <h2>Inside Features</h2>
                        <ul className={classes['inside-feature-items']}>
                            {insideFeatures.map((item) => <li key={item} className={classes['inside-feature-item']}>{item}</li>)}
                        </ul>
                    </div>}
                    {outsideFeatures && <div className={classes['property-inside-feature']}>
                        <h2>Outside Features</h2>
                        <ul className={classes['inside-feature-items']}>
                            {outsideFeatures.map((item) => <li key={item} className={classes['inside-feature-item']}>{item}</li>)}
                        </ul>
                    </div>}
                    <div className={classes.description}>
                        <div className={classes['description-heading']}>Description</div>
                        <div className={classes['description-title']}>{data.headline}.</div>
                        <div className={classes['description-text']}>
                            {description.map((desc => <p key={Math.random()}>{desc}</p>))}
                            {/* <p>{data.description}</p> */}
                        </div>
                    </div>

                </div>}

                {data && <div className={classes['agent-details']} >
                    <div className={classes["agent-basic-details"]}>
                        <div>
                            <img src={data.fkuser?.[0].photoURL} alt="" />
                        </div>
                        <div>
                            <div>
                                <Link to={`/agent/${data.fkuser?.[0].username}`}>{data.fkuser?.[0].first_name} {data.fkuser?.[0].last_name}</Link>
                            </div>
                            <span>{data.fkuser?.[0].fkcompanyid?.companyName}</span>
                        </div>
                    </div>
                    <div className={classes['phone-number']}>
                        <span>Call Agent</span>
                    </div>
                    <div className={classes.email}>
                        <span>Email</span>
                    </div>
                    <div className={classes['company-logo']} style={{ backgroundColor: data.fkuser?.[0].fkcompanyid?.primaryAgencyColor }}>
                        <img src={data.fkuser?.[0].fkcompanyid?.logo} alt="" />
                    </div>
                </div>}
            </div >
        </>




    )
}
