import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react"



const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`;

const Circle = styled.div`
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background-color: white;
        position: absolute;
`;

const Image = styled.img`
    height: 75%;
    z-index: 2;
`;

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Product = ({product, productId}) => {
    
    // const [oldImage, setOldImage] = useState(productId.image);

    // const handleEdit = () => navigate(`/admin/dash/products/${productId}`)

    const consoleLogs = () => {
        console.log("Product.js Product ID: ", productId)
        console.log("Product.js Product: ", product)
    }

    return (
        <Container>
            <Circle />
            <Image src={product.image?.[0].url} alt="Product Preview"/>
            <Info>
                <Icon>
                    <FontAwesomeIcon icon={faCartShopping} onClick={consoleLogs}/>
                </Icon>
                <Icon>
                    <Link to={`/dash/products/${product._id}`}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                </Icon>
                <Icon>
                    <FontAwesomeIcon icon={faHeart} />
                </Icon>
            </Info>
        </Container>
    );
};

export default Product;