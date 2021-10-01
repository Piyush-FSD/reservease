import React from 'react';
import styled from 'styled-components';
import { ImageUpload } from '../ImageUpload';

export const AdminMenuHeader = () => {
    return (
        <HeaderImgContainer>
            <ImageUpload />
        </HeaderImgContainer>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
border: 2px solid red;
`;