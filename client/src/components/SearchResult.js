import React from 'react';
import styled from 'styled-components';

export const SearchResult = () => {

    return (
        <>
            <HeaderImgContainer>
                <UploadImg>Business image here</UploadImg>
            </HeaderImgContainer>
        </>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
border: 2px solid red;
`;

const UploadImg = styled.h1`
display: flex;
justify-content: center;
`