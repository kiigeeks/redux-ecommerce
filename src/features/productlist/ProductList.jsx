/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemsToCart } from "../cart/cartSlice";
import StarIcon from "../../assets/star.svg"
import Loading from "../../components/Loading";
import { selectProducts, storeProducts } from "./productSlice";
import ToTop from "../../components/ToTop";
import { IoEye } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";

function ProductList({ handleOpenModalCart, handleOpenModalProduct }) {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const datas = await response.json();

                dispatch(storeProducts(datas))
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleBuyNow = (product) => {
        dispatch(addItemsToCart(product))
        handleOpenModalCart()
    }

    return (
        <>
            <ToTop />
            {isLoading ? 
                (<Loading />)
            : 
                <>
                    {products.length === 0 ?
                            <div className="w-full flex justify-center items-start pt-12">
                                <h3 className="text-center text-2xl text-gray-700 font-extrabold italic">Product not found</h3>
                            </div>
                        :
                            <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 py-10 px-4 lg:px-0 ">
                                {products.map((product) => {
                                    return (
                                        <div key={product.id} className="bg-white rounded-xl border shadow p-4 w-full">
                                            <div className="relative w-[80%] h-[250px] mx-auto overflow-hidden">
                                                <img src={product.image} alt={product.title} loading="eager" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col gap-1 mt-5">
                                                <h3 className="font-bold text-lg text-justify md:truncate">{product.title}</h3>
                                                <h4 className="font-light italic tracking-wide text-gray-600 capitalize">{product.category}</h4>
                                                <h5 className="mt-3 font-bold text-xl tracking-wider">&#36; {product.price}</h5>
                                                <div className="mt-2 mb-1 flex flex-row gap-2 lg:gap-1 justify-start font-semibold tracking-wider text-gray-700 items-center">
                                                    <div className="h-full flex flex-row items-end lg:items-start gap-2 md:gap-1">
                                                        <img src={StarIcon} alt="star" loading="lazy" className="w-7 md:w-5 h-7 md:h-5" />
                                                        <span className="text-base">{product.rating.rate}</span> 
                                                    </div>
                                                    <span className="text-2xl font-thin">|</span>
                                                    <span className="text-base lg:text-sm">({product.rating.count} reviews)</span>
                                                </div>
                                                <div className="flex flex-row gap-2 justify-end">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleOpenModalProduct(product)}
                                                        className="mt-3 md:mt-0 w-10 md:w-9 h-10 md:h-9 p-2 bg-gray-400 text-white text-xl flex justify-center items-center rounded-md"
                                                    >
                                                        <IoEye />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleBuyNow(product)}
                                                        className="mt-3 md:mt-0 place-self-end md:place-self-center w-10 md:w-9 h-10 md:h-9 p-2 bg-gray-400 text-white text-xl flex justify-center items-center rounded-md"
                                                    >
                                                        <FaCartShopping />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                    }
                </>
            }
        </>
    )
}

export default ProductList