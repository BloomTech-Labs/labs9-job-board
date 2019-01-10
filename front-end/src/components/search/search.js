import React from 'react';

const Search = props => {
    return (
        <div>
            <h5>GE</h5>
            <h5>UI/UX</h5>
            <h5>Programming</h5>
            <h5>Management</h5>
            <h5>DevOps</h5>
            <h5>Writing</h5>
            <h5>Finance</h5>
            <form>
                <input
                    placeholder='search jobs'
                    type='text'
                    name='search'
                    onChange={props.searchResults}
                    value={props.search}
                />
            </form>
        </div>
    )
};

export default Search;