import React, { useEffect, useRef, useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style';
import slider1 from '../../assets/images/slider11.webp';
import slider2 from '../../assets/images/slider5.jpg';
import slider3 from '../../assets/images/slider4.jpg';
import slider4 from '../../assets/images/slider7.jpg';

import CardComponent from '../../components/CardComponent/CardComponent';
import * as ProductService from '../../services/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import unidecode from 'unidecode';
import FooterComponent from "../../components/FooterComponent/FooterComponent";


const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 1000);
    const [pending, setPending] = useState(false);
    const [limit, setLimit] = useState(12);
    const [typeProducts, setTypeProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [res, setRes] = useState([])



    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data);
        }
    };

    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    useEffect(() => {
        const fetchProductAll = async () => {
            try {
                setPending(true);
                let res = await ProductService.getAllProduct(searchDebounce, limit);
                setProducts(res?.data?.data);
                setRes(res?.data)

            } catch (error) {
                console.error('Error fetching products: ', error);
            } finally {
                setPending(false);
            }
        };

        fetchProductAll();
    }, [limit, searchDebounce]);
    // console.log('products', products)
    //console.log('res', res)

    useEffect(() => {
        // Lọc dữ liệu dựa trên searchDebounce sau khi đã lấy toàn bộ dữ liệu từ backend
        const filtered = products.filter(product => unidecode(product.name.toLowerCase()).includes(unidecode(searchDebounce.toLowerCase())));
        //const filtered = allProducts.filter(product => product.name.toLowerCase().includes(searchDebounce.toLowerCase()));
        setFilteredProducts(filtered);
    }, [searchDebounce, products]);


    return (
        <Loading isPending={pending}>
            <div style={{ fontSize: '20px', padding: '0 120px', marginTop: '79px' }}>
                <WrapperTypeProduct>
                    {typeProducts.map((item) => {
                        return (
                            <TypeProduct style={{ marginTop: '50px' }} name={item} key={item} />
                        );
                    })}
                </WrapperTypeProduct>
            </div>
            <div id="container" style={{ backgoundColor: '#efefef', padding: '0 120px', height: '1000px', width: '100%' }} >
                <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                <WrapperProducts>
                    {filteredProducts?.slice(0, limit)?.map((product) => (
                        <CardComponent
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                        />
                    ))}
                </WrapperProducts>


                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <WrapperButtonMore
                        textButton={res?.totalPage === res?.pageCurrent ? 'Load more' : "Xem thêm"}
                        type="outline"
                        styleButton={{
                            border: `1px solid ${res?.totalPage === res?.pageCurrent ? '#f5f5f5' : '#9255FD'}`,
                            color: `${res?.totalPage === res?.pageCurrent ? '#f5f5f5' : '#9255FD'}`,
                            width: '240px',
                            height: '38px',
                            borderRadius: '4px'
                        }}
                        disabled={res?.totalPage === res?.pageCurrent}
                        styleTextButton={{ fontWeight: 500, color: res?.totalPage === res?.pageCurrent && '#fff' }}
                        onClick={() => (res?.totalPage !== res?.pageCurrent) && (setLimit((prev) => prev + 6))}
                    />
                </div>
                <FooterComponent />
            </div>
        </Loading>
    );
};

export default HomePage;
