import React from 'react';
import styled from 'styled-components';
import { ImageUpload } from '../ImageUpload';
import sidewalk from '../../WebImages/sidewalk.jpg'

export const AdminMenuHeader = () => {
    return (
        <HeaderImgContainer>
            {/* <ImageUpload />  */}
            <img src={sidewalk} />
        </HeaderImgContainer>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
/* position: relative; */
width: 100%;
`;