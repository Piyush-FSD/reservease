import React from 'react';
import styled from 'styled-components';
import ImageUpload from '../ImageUpload';

const AdminMenuHeader = () => {
    return (
        <HeaderImgContainer>
            <ImageUpload />
        </HeaderImgContainer>
    )
}

export default AdminMenuHeader

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
border: 2px solid red;
`;