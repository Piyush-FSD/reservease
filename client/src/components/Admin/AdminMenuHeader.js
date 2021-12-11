import React from 'react';
import styled from 'styled-components';
import sidewalk from '../../WebImages/sidewalk.jpg'

export const AdminMenuHeader = () => {
    return (
        <HeaderImgContainer>
            <img alt="sidewalk-img" src={sidewalk} />
        </HeaderImgContainer>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
`;