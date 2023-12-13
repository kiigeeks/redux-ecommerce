/* eslint-disable react/prop-types */
import Modal from '../../components/Modal'
import { useDispatch } from "react-redux"
import CloseIcon from '../../assets/close.svg'
import StarIcon from "../../assets/star.svg"
import MinusIcon from '../../assets/minus.svg'
import AddIcon from '../../assets/add.svg'
import { useState } from 'react'
import { changeQuantityItemsCart } from '../cart/cartSlice'

const ProductModal = ({ handleOpenModalCart, handleHideModalProduct, product }) => {
    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const handleAddToCart = () => {
        const itemProduct = {
            product,
            newQuantity: qty
        }
        dispatch(changeQuantityItemsCart(itemProduct))
        handleHideModalProduct()
        handleOpenModalCart()
    }

    return (
        <Modal>
            <div className="flex flex-col gap-3 p-1 w-[90vw] lg:w-[900px] font-urbanist">
                <div className='relative px-3 w-full flex justify-center items-center text-center'>
                    <h3 className='uppercase font-semibold tracking-wider text-2xl md:text-3xl'>detail product</h3>
                    <button
                        type='button'
                        onClick={handleHideModalProduct}
                        className='absolute -top-3 md:-top-4 -right-3 md:-right-1 w-12 h-12 rounded-lg'>
                        <img src={CloseIcon} alt='close' className='w-full h-full' />
                    </button>
                </div>
                <div className='w-full my-8 px-4 flex flex-col lg:flex-row justify-center items-center lg:items-start gap-7'>
                    <div className="w-[100px] h-auto overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className='max-w-[700px] flex flex-col'>
                        <h3 className="font-bold text-lg text-justify">{product.title}</h3>
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
                        <p className="mt-1 text-justify" >
                            {product.description}
                        </p>
                        
                        <div className='mt-5 w-full h-full flex flex-col lg:flex-row items-center justify-start gap-7 md:gap-5'>
                            <div className="flex flex-row gap-3 justify-center items-center">
                                <button
                                    type='button'
                                    onClick={() => qty > 1 && setQty(qty-1)}
                                    className="h-9 lg:h-7 w-9 lg:w-7 cursor-pointer">
                                        <img src={MinusIcon} loading='lazy' alt="minus" className="h-full w-full" />
                                </button>
                                <div className="h-10 md:h-7 w-1/2 lg:w-24 border border-gray-900 bg-white rounded-md flex justify-center items-center p-[2px]">
                                    <input
                                        type="number" 
                                        value={qty}
                                        onChange={(e) => parseInt(e.target.value, 10) >= 1 && setQty(parseInt(e.target.value, 10))}
                                        className="w-full h-full text-base md:text-sm text-center bg-transparent focus:outline-none focus:ring-0 " />
                                </div>
                                <button
                                    type='button'
                                    onClick={() => setQty(qty+1)}
                                    className="h-9 lg:h-7 w-9 lg:w-7 cursor-pointer">
                                    <img src={AddIcon} loading='lazy' alt="add" className="h-full w-full" />
                                </button>
                            </div>
                            <button
                                type='button'
                                onClick={handleAddToCart}
                                className='flex justify-center items-center bg-gray-400 hover:bg-gray-700 px-5 md:px-3 py-2 text-white rounded-md'
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ProductModal