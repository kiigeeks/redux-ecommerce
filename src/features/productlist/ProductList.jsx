/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemsToCart } from "../cart/cartSlice";
import StarIcon from "../../assets/star.svg"
import CartIcon from "../../assets/cart.svg"
import Loading from "../../components/Loading";
import { selectProducts, storeProducts } from "./productSlice";
import ToTop from "../../components/ToTop";

function ProductList({ handleOpenModalCart }) {
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

    console.log(products.length); 
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
                            <div className="w-full h-full grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-10 px-4 md:px-0 ">
                                {products.map((product) => {
                                    return (
                                        <div key={product.id} className="group bg-white rounded-xl border shadow p-4 w-full">
                                            <div className="relative w-[80%] h-[250px] mx-auto overflow-hidden">
                                                <img src={product.image} alt={product.title} loading="eager" className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500 ease-in-out" />
                                            </div>
                                            <div className="flex flex-col gap-1 mt-5">
                                                <h3 className="font-bold text-lg text-justify md:truncate">{product.title}</h3>
                                                <h4 className="font-light italic tracking-wide text-gray-600 capitalize">{product.category}</h4>
                                                <h5 className="mt-3 font-bold text-xl tracking-wider">&#36; {product.price}</h5>
                                                <div className="mt-2 mb-1 flex flex-row gap-3 justify-start md:justify-center font-semibold tracking-wider text-gray-700 items-center">
                                                    <div className="flex flex-row gap-2 md:gap-1 justify-center items-center">
                                                        <img src={StarIcon} alt="star" loading="lazy" className="w-7 md:w-5 h-7 md:h-5" />
                                                        <span className="text-lg">{product.rating.rate}</span> 
                                                    </div>
                                                    <span className="text-2xl font-thin">|</span>
                                                    <span className="text-base">({product.rating.count} reviews)</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleBuyNow(product)}
                                                    className="mt-2 md:mt-0 place-self-end md:place-self-center w-10 md:w-9 h-10 md:h-9 p-2 bg-gray-400 rounded-md"
                                                >
                                                    <img src={CartIcon} alt="cart" loading="lazy" className="w-full h-full object-cover" />
                                                </button>
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