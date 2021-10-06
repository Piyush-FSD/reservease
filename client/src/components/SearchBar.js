import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { apiUrl } from '../urls';
// import { UserMenu } from './UserMenu';
// import { CgSearch } from 'react-icons/cg';

// search bar to display all Businesses
export const SearchBar = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [value, setValue] = useState("");
    const [filteredInput, setFilteredInput] = useState([])

    // business's information fetch
    useEffect(() => {
        const getBusNames = async () => {
            const response = await fetch("/search/results")
            const data = await response.json();

            setSearchResults(data.data.map((item) => {
                return { busName: item.busName, userId: item.userId }
            }))
        }
        getBusNames();
    }, [])


    // filter through business names
    // --> used below to map and return matched results
    useEffect(() => {

        if (searchResults.length === 0) return;
        if (!value) return;

        const filteredValue = searchResults.filter((item) => {
            return item.busName.toLowerCase().includes(value.toLowerCase());
        })

        setFilteredInput(filteredValue)
    }, [value, searchResults])

    return (
        <Container>
            {/* <CgSearch /> */}
            <SearchInput
                type="text"
                placeholder="Search here"
                onChange={(event) => setValue(event.target.value)}
            />
            {filteredInput.length !== 0 && <SearchContainer>
                <>
                    <UnorderedList>
                        {filteredInput.map((item, index) => {
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
            </SearchContainer>}
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

`;

const SuggestionList = styled.li`
border: 5px solid white;
list-style-type: none;
padding: 10px 0;
margin-right: 100px;
width: 100%;
text-overflow: ellipsis;

&:hover {
background-color: #fff8dc;
}
`;

const UnorderedList = styled.ul`
    position: absolute;
    left: 0px;
    width: 370px;
    /* float: right; */
    background-color: white;
    border: 2px solid black;
    border-bottom: 1px solid black;
    max-height: 300px;
    text-align: left;
    border-radius: 4px;
    overflow-y: scroll;
    z-index: 1;
    margin: 0;
`;

const Result = styled.span`
font-weight: bold;
`;

const DetailLink = styled(Link)`
text-decoration: none;
color: black;
`;
