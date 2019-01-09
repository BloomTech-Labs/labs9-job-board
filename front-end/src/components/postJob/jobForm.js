import React from 'react';
import styled from 'styled-components';

const PostJobForm = styled.form`
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9px;
`

const JobForm = props => {
    return (
        <div>
            <PostJobForm onSubmit={props.addJob}>
                    <h3>Title</h3>
                    <input 
                        value={props.title}
                        name='title'
                        onChange={props.handleInput}
                        placeholder='Job Title'                        
                    />
                    <h3>Salary</h3>
                    <input 
                        value={props.salary}
                        name='salary'
                        onChange={props.handleInput}
                        placeholder='Salary Range'
                    />
                    <h3>Top Skills</h3>
                    <input 
                        value={props.topSkills}
                        name='topSkills'
                        onChange={props.handleInput}
                        placeholder='Top Skills'
                    />
                    <h3>Additional Skills</h3>
                    <input 
                        value={props.additionalSkills}
                        name='additionalSkills'
                        onChange={props.handleInput}
                        placeholder='Additional Skills'
                    />
                    <h3>Familiar With</h3>
                    <input 
                        value={props.familiarWith}
                        name='familiarWith'
                        onChange={props.handleInput}
                        placeholder='Remaining Skills'
                    />
                    <h3>Description</h3>
                    <textarea 
                        value={props.description}
                        name='description'
                        onChange={props.handleInput}
                        placeholder='Job Description'
                    />
                    <h3>Requirements</h3>
                    <textarea 
                        value={props.requirements}
                        name='requirements'
                        onChange={props.handleInput}
                        placeholder='Job Requirements'
                    />
                    <h5>Active</h5>
                    <input 
                        type='checkbox'
                        name='active'
                        value={props.active}
                    />
                    <h5>This requires a degree</h5>
                    <input 
                        type='checkbox'
                        name='requiresDegree'
                        value={props.requiresDegree}
                    />
                    <button
                        type='reset'
                        onClick={props.handleInput}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        onClick={props.handleInput}
                    >
                        Save
                    </button>
                </PostJobForm>
        </div>
    );
};

export default JobForm;