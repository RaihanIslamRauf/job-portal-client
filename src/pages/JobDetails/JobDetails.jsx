import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
    
    const {_id, title, company, description} = useLoaderData();
    

    return (
        <div className='m-10'>
            <h2 className='text-3xl'>job details for {title}</h2>
            <p>apply for: {company}</p>
            <p>description: {description}</p>
            <Link to={`/jobApply/${_id}`}><button className='btn btn-primary mt-2'>Apply Now</button></Link>
        </div>
    );
};

export default JobDetails;