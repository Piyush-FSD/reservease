import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { apiUrl } from '../urls';

// import { UserMenu } from './UserMenu';
// import { CgSearch } from 'react-icons/cg';

function getBusinesses(oldSearchValue) {

    return function search(newSearchValue) {

        setTimeout(async () => {

            if (oldSearchValue === newSearchValue) {
                const response = await fetch(`${apiUrl}/searchResults?prefix=${oldSearchValue}`)
                const searchData = await response.json();

                return searchData;
                // setSearchResults(searchData.data.map((result) => {
                //     //TODO change userID
                //     return { busName: result.busName, userId: result.userId }
                // }))
            }
        }, 2000);
    }

}
// search bar to display all Businesses
export const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState("");

    // business's information fetch
    useEffect(() => {

        console.log('inside useffect')

        if (!value) return;

        const searchIt = getBusinesses(value);

        searchIt(value)

    }, [value])

    return (
        <Container>
            {/* <CgSearch /> */}
            <SearchInput
                type="text"
                placeholder="Search here"
                onChange={(event) => setValue(event.target.value)}
            />
            {searchResults.length !== 0 && <SearchContainer>
                <>
                    <UnorderedList>
                        {searchResults.map((item, index) => {
                            return (
                                <DetailLink key={index} to={`user/menu/${item.userId}`}>
                                    <SuggestionList>
                                        {item.busName.slice(0, value.length)}
                                        <Result>
                                            {item.busName.slice(value.length)}
                                        </Result>
                                        {/* {" "} */}
                                    </SuggestionList>
                                </DetailLink>
                            )
                        })}
                    </UnorderedList>
                </>
            </SearchContainer>
            }
        </Container>
    )
};

const Container = styled.div`
position: relative;
display: block;
width: 100%;
`

const SearchContainer = styled.div`
position: relative;
`

const SearchInput = styled.input`
width: 400px;
height: 40px;
border-radius: 5px;
padding-left: 10px;
border: 1px solid #c2c2c2;
box-shadow: 0 0 4px 0 rgb(0 0 0 / 20%);
background: white;
margin: 0 auto;
color: black;
border: 3px solid #f6b210;

::placeholder {
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
}
`;

const SuggestionList = styled.li`
border: 5px solid white;
list-style-type: none;
padding: 10px 0;
margin-right: 100px;
width: 100%;
text-overflow: ellipsis;

text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;


&:hover {
background-color: #fff8dc;
}
`;

const UnorderedList = styled.ul`
position: absolute;
width: 370px;
background-color: white;
border: 2px solid black;
border-bottom: 1px solid black;
max-height: 300px;
text-align: left;
border-radius: 4px;
overflow-y: scroll;
margin: 0;
`;

const Result = styled.span`
font-weight: bold;
`;

const DetailLink = styled(Link)`
text-decoration: none;
color: black;
`;
