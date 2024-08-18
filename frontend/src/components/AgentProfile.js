
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAgentDetails } from '../util/http';
import { WebsiteSvgIcon } from './SvgIcons';
import classes from './AgentProfile.module.css'

export default function AgentProfile() {
    const { username } = useParams()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [username],
        queryFn: ({ signal }) => fetchAgentDetails({ signal, username }),
        enabled: username !== '',
        refetchOnWindowFocus: false,
    });
    return (
        <>
            {data && <div className={classes.main}>
                <div className={classes['main-img']}>
                    <img src="https://rimh2.domainstatic.com.au/GwsVuCYK5_JDkkFXL6RfKMDIx-Y=/fit-in/1920x1080/filters:format(jpeg):quality(80):no_upscale()/2018431029_1_1_240308_023715-w3240-h2160" alt="" />
                </div>
                <div className={classes['agent-profile']}>
                    <div className={classes['agent-profile-img']}>
                        <img src={data.photoURL} alt="" />
                    </div>
                    <div>
                        <h1>{data.first_name} {data.last_name}</h1>
                    </div>
                    <ul className={classes['agent-links']}>
                        <li className={classes['icon-container']}>
                            <a href="/">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <symbol id="link-medium">
                                        <path d="M18.1213 14.8492L20.2426 12.7279C22.5822 10.3884 22.5822 6.58217 20.2426 4.24264C17.9031 1.90311 14.0969 1.90311 11.7574 4.24264L9.63604 6.36396L11.0503 7.77817L13.1716 5.65685C14.7315 4.09694 17.2689 4.09728 18.8284 5.65685C20.388 7.21643 20.3883 9.7538 18.8284 11.3137L16.7071 13.435L18.1213 14.8492Z" fill="currentColor"></path>
                                        <path d="M15.2929 17.6777L13.1716 19.799C10.832 22.1385 7.02582 22.1385 4.68629 19.799C2.34677 17.4595 2.34677 13.6532 4.68629 11.3137L6.80761 9.19239L8.22183 10.6066L6.10051 12.7279C4.54059 14.2878 4.54093 16.8252 6.10051 18.3848C7.66008 19.9443 10.1974 19.9447 11.7574 18.3848L13.8787 16.2635L15.2929 17.6777Z" fill="currentColor"></path>
                                        <path d="M15.2929 7.77817L16.7071 9.19239L9.63604 16.2635L8.22183 14.8492L15.2929 7.77817Z" fill="currentColor"></path>
                                    </symbol>
                                    <use xlinkHref="#link-medium" />
                                </svg>
                            </a>


                        </li>
                        <li className={classes['icon-container']}>
                            <a href="/">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <symbol id='facebook-medium'>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13.506 6.617V8.006H17.5L17.124 11.999H13.498V22H9.51V11.999H6.5V8.006H9.51V6.198C9.51 4.558 10.102 2 13.649 2L17.5 2.012V5.655H14.42C14.042 5.655 13.506 5.838 13.506 6.617Z" fill="currentColor"></path>
                                    </symbol>
                                    <use xlinkHref="#facebook-medium" />
                                </svg>
                            </a>

                        </li>
                        <li className={classes['icon-container']}>
                            <a href="">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <symbol id='instagram-medium'>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 15.334C10.159 15.334 8.666 13.841 8.666 12C8.666 10.159 10.159 8.666 12 8.666C13.841 8.666 15.334 10.159 15.334 12C15.334 13.841 13.841 15.334 12 15.334ZM12 6.865C9.164 6.865 6.865 9.164 6.865 12C6.865 14.836 9.164 17.135 12 17.135C14.836 17.135 17.135 14.836 17.135 12C17.135 9.164 14.836 6.865 12 6.865ZM18.538 6.662C18.538 7.324 18.001 7.862 17.338 7.862C16.676 7.862 16.137 7.324 16.137 6.662C16.137 5.999 16.676 5.461 17.338 5.461C18.001 5.461 18.538 5.999 18.538 6.662ZM20.141 16.041C20.096 17.016 19.932 17.545 19.796 17.897C19.614 18.364 19.397 18.698 19.047 19.048C18.697 19.398 18.363 19.615 17.896 19.796C17.545 19.933 17.016 20.096 16.041 20.141C14.986 20.188 14.67 20.198 12 20.198C9.33 20.198 9.014 20.188 7.959 20.141C6.984 20.096 6.455 19.932 6.103 19.796C5.636 19.614 5.302 19.397 4.952 19.047C4.602 18.697 4.385 18.363 4.204 17.897C4.067 17.545 3.904 17.016 3.859 16.041C3.812 14.986 3.802 14.67 3.802 12C3.802 9.33 3.812 9.014 3.859 7.959C3.904 6.984 4.068 6.455 4.204 6.103C4.386 5.636 4.603 5.302 4.953 4.952C5.303 4.602 5.637 4.385 6.104 4.204C6.455 4.067 6.984 3.904 7.959 3.859C9.014 3.812 9.33 3.802 12 3.802C14.67 3.802 14.986 3.812 16.041 3.859C17.016 3.904 17.545 4.068 17.897 4.204C18.364 4.386 18.698 4.603 19.048 4.953C19.398 5.303 19.615 5.637 19.796 6.104C19.933 6.455 20.096 6.984 20.141 7.959C20.188 9.014 20.198 9.33 20.198 12C20.198 14.67 20.188 14.986 20.141 16.041ZM21.475 5.449C21.22 4.791 20.878 4.234 20.322 3.678C19.766 3.122 19.208 2.78 18.551 2.525C17.914 2.277 17.187 2.108 16.123 2.061C15.056 2.012 14.716 2 12 2V2.001C9.284 2.001 8.944 2.012 7.877 2.059C6.813 2.109 6.085 2.277 5.449 2.526C4.791 2.78 4.234 3.122 3.678 3.678C3.122 4.234 2.78 4.792 2.525 5.449C2.277 6.086 2.108 6.813 2.06 7.877C2.012 8.944 2 9.284 2 12C2 14.716 2.012 15.057 2.06 16.123C2.108 17.188 2.276 17.915 2.525 18.551C2.78 19.209 3.122 19.766 3.678 20.322C4.234 20.878 4.792 21.22 5.449 21.475C6.086 21.723 6.813 21.892 7.877 21.939C8.944 21.988 9.284 22 12 22C14.716 22 15.057 21.988 16.123 21.939C17.187 21.892 17.915 21.723 18.551 21.475C19.209 21.22 19.766 20.878 20.322 20.322C20.878 19.766 21.22 19.208 21.475 18.551C21.723 17.914 21.892 17.188 21.94 16.123C21.988 15.056 22 14.716 22 12C22 9.284 21.988 8.943 21.94 7.877C21.892 6.813 21.724 6.085 21.475 5.449Z" fill="currentColor"></path>
                                    </symbol>
                                    <use xlinkHref="#instagram-medium" />
                                </svg>
                            </a>

                        </li>
                        <li className={classes['icon-container']}>
                            <a href="">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <symbol id='youtube-medium'>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M16.282 12.353L10.64 15.96C10.574 16.004 10.495 16.027 10.417 16.027C10.348 16.027 10.28 16.01 10.217 15.975C10.084 15.902 10 15.762 10 15.609V8.392C10 8.239 10.084 8.098 10.217 8.025C10.35 7.952 10.513 7.958 10.642 8.041L16.282 11.648C16.402 11.726 16.473 11.859 16.473 12C16.473 12.143 16.402 12.276 16.282 12.353ZM18.717 5H5.281C3.469 5 2 6.469 2 8.282V15.717C2 17.531 3.47 19 5.283 19H18.719C20.531 19 22 17.532 22 15.719V8.284C22 6.478 20.523 5 18.717 5Z" fill="currentColor"></path>
                                    </symbol>
                                    <use xlinkHref="#youtube-medium" />
                                </svg>
                            </a>

                        </li>
                        <li className={classes['icon-container']}>
                            <a href="">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <symbol id='linkedin-medium'>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.29706 21H7.03057V8.97671H3.29706V21ZM5.16494 3C3.96545 3 3 3.97151 3 5.1673C3 6.36422 3.96545 7.33461 5.16494 7.33461C6.35768 7.33461 7.3265 6.36422 7.3265 5.1673C7.3265 3.97151 6.35768 3 5.16494 3ZM21.0037 14.4057V21H17.2735V15.154C17.2735 13.7588 17.2488 11.9645 15.3348 11.9645C13.3926 11.9645 13.0978 13.4849 13.0978 15.0537V21H9.37104V8.97671H12.947V10.6199H12.9988C13.4961 9.67547 14.7125 8.67804 16.5275 8.67804C20.306 8.67804 21.0037 11.1677 21.0037 14.4057Z" fill="currentColor"></path>
                                    </symbol>
                                    <use xlinkHref="#linkedin-medium" />
                                </svg>
                            </a>

                        </li>
                    </ul>
                </div>


            </div>}
            {data && <div className={classes['company-details']}>
                <div className={classes['company-logo']}>
                    <img src={data.fkcompanyid.logo} alt="" />
                </div>
                <div className={classes['company']}>
                    <p className={classes['company-name']}>{data.fkcompanyid.companyName}</p>
                    <p className={classes['company-address']}>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                            <symbol id='address-medium'>
                                <path d="M12 1C7.04932 1 3.02197 4.87402 3.02197 9.63672C3.02197 14.1182 5.5 16.4463 7.68652 18.5C9.46435 20.1709 11 21.6133 11 24H13C13 21.6133 14.5356 20.1709 16.3135 18.5C18.5 16.4463 20.978 14.1182 20.978 9.63672C20.978 4.87402 16.9507 1 12 1ZM14.9443 17.043C13.8638 18.0576 12.7632 19.0918 12 20.3711C11.2368 19.0918 10.1362 18.0576 9.05566 17.043C6.98144 15.0938 5.02197 13.2529 5.02197 9.63672C5.02197 5.97754 8.15234 3 12 3C15.8477 3 18.978 5.97754 18.978 9.63672C18.978 13.2529 17.0186 15.0938 14.9443 17.043ZM14 10C14 11.1045 13.1046 12 12 12C10.8955 12 10 11.1045 10 10C10 8.89539 10.8955 8 12 8C13.1046 8 14 8.89539 14 10Z" fill="currentColor"></path>
                            </symbol>
                            <use xlinkHref="#address-medium" />
                        </svg>
                        {data.fkcompanyid.address}
                    </p>
                </div>
                <div className={classes['agent-contacts']}>
                    <button className={classes['agent-phone']}>Call</button>
                    <button className={classes['agent-email']}>Email</button>
                </div>
            </div>}
            {data && <div className={classes['agent-details-section']}>
                {data.about && <h2>About Agent</h2>}
                {data.about && <div dangerouslySetInnerHTML={{ __html: data.about }} />}
                <h2>Current Listings</h2>
                <p>{data.first_name} {data.last_name} is part of the team at {data.fkcompanyid.companyName} located at {data.fkcompanyid.address}, and has sold 13 properties in the last 12 months, and currently has 8 properties for sale.</p>
                <button>FOR SALE</button>
                <button>FOR RENT</button>
                <button>SOLD</button>
            </div>}
            {isError && <p>Error occurend</p>}
        </>


    )
}
