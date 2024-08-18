

import { fetchProperties } from '../util/http';
import { useQuery } from '@tanstack/react-query';


import classes from './RecentlyPropertise.module.css'
import Property from './Property'

export default function RecentlyAddedPropertise() {
    // const data = useLoaderData();
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["events-images"],
        queryFn: ({ signal }) => fetchProperties({ signal, query: { latest: true } }),
    });

    if (isError) {
        console.log(error)
    }
    return (
        <div className={classes["recent-properties"]}>
            <p className={classes['section-title']}>Recently Added Properties</p>
            {data && <div className="row row-cols-1 row-cols-md-3 g-4">
                {data.map((property) => <Property key={property.slug} img={property.images[0]?.url} price={property.price} address={property.fkaddress.displayAddress} beds={property.bedRooms} baths={property.bathRooms} carParks={property.carSpaces} propertyType={property.propertyType} slug={`${property.saleStatus}/${property.propertyType.replace(/\//g, '-').replace(/ /g, '').toLowerCase()}/${property.slug}`} dateAdded={property.createdAt} />)}

            </div>}
            {isLoading && <h2>Loading data...</h2>}
            {isError && <h1>Some thing went wrong.</h1>}
        </div>
    )
}



