/* eslint-disable react/prop-types */
import Modal from '../../components/Modal'
import { useDispatch, useSelector } from "react-redux"
import { addQuantityItemsCart, 
            clearCart, 
            minusQuantityItemsCart, 
            removeItemsFormCart, 
            selectCartItems, 
            selectCartTotalItems, 
            selectCartTotalPrices } from './cartSlice'
import CloseIcon from '../../assets/close.svg'
import RemoveIcon from '../../assets/remove.svg'
import MinusIcon from '../../assets/minus.svg'
import AddIcon from '../../assets/add.svg'

const CartModal = ({ handleHideModalCart }) => {
    const cartItems = useSelector(selectCartItems);
    const totalItems = useSelector(selectCartTotalItems);
    const totalPrice = useSelector(selectCartTotalPrices);
    const dispatch = useDispatch();
  
    const handleCheckoutToWhatsapp = () => {
      if (totalItems === 0) return;
  
      const phoneNumber = "6281318841398";
      const message = encodeURIComponent(
        `Halo, Saya ingin membeli :\n${cartItems.map(product => `${product.quantity} barang - ${product.title}`).join(',\n')} \n\nTotal harga $${totalPrice}`
      );
  
      const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  
      window.open(URL, "_blank");
    };

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleRemoveItem = (product) => {
        dispatch(removeItemsFormCart(product))
    }

    const handleChangeItemCart = (product, operator) => {
        if (operator === 'add') {
            dispatch(addQuantityItemsCart(product))
        } else {
            dispatch(minusQuantityItemsCart(product))
        }
    }

  return (
    <Modal>
        <div className="flex flex-col gap-3 p-1 w-[90vw] lg:w-[900px] font-urbanist">
            <div className='relative px-3 w-full flex justify-center items-center text-center'>
                <h3 className='uppercase font-semibold tracking-wider text-2xl md:text-3xl'>Shopping cart</h3>
                <button
                    type='button'
                    onClick={handleHideModalCart}
                    className='absolute -top-3 md:-top-4 -right-3 md:-right-1 w-12 h-12 rounded-lg'>
                    <img src={CloseIcon} alt='close' className='w-full h-full' />
                </button>
            </div>
            {cartItems.length  ?
                <>
                    <div className="flex flex-col gap-3 py-2 max-h-[350px] overflow-auto">
                        {cartItems.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    className="w-full border-b-4 border-gray-200 py-3 px-5"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                                        <div className="w-[100px] h-auto overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="w-full md:max-w-[90%] flex flex-col items-start place-self-start overflow-hidden">
                                            <h3 className="capitalize text-lg font-medium text-clip">{product.title}</h3>
                                            <div className="flex items-center mt-2 md:mt-1">
                                                <h4 className="text-2xl md:text-base font-bold md:font-normal">$ {product.price}</h4>
                                            </div>
                                            <div className='mt-5 w-full h-full flex flex-row items-center justify-center md:justify-between gap-10 md:gap-0'>
                                                <div className="flex flex-row gap-3 justify-center items-center">
                                                    <button
                                                        type='button'
                                                        onClick={() => handleChangeItemCart(product, "minus")}
                                                        className="h-9 lg:h-7 w-9 lg:w-7 cursor-pointer">
                                                        <img src={MinusIcon} loading='lazy' alt="minus" className="h-full w-full" />
                                                    </button>
                                                    <div className="h-10 md:h-7 w-16 lg:w-24 border border-gray-900 bg-white rounded-md flex justify-center items-center p-[2px]">
                                                        <input type="number" value={product.quantity} className="w-full h-full text-base md:text-sm text-center bg-transparent focus:outline-none focus:ring-0 " />
                                                    </div>
                                                    <button
                                                        type='button'
                                                        onClick={() => handleChangeItemCart(product, "add")}
                                                        className="h-9 lg:h-7 w-9 lg:w-7 cursor-pointer">
                                                        <img src={AddIcon} loading='lazy' alt="add" className="h-full w-full" />
                                                    </button>
                                                </div>
                                                <button
                                                    type='button'
                                                    className='flex justify-center items-center'
                                                    onClick={() => handleRemoveItem(product)}
                                                >
                                                    <img src={RemoveIcon} alt='trash' className='w-10 md:w-8 h-10 md:h-8' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='w-full p-1 md:p-3'>
                        <div className='w-full h-full rounded-xl px-1 md:px-3 py-3 md:py-5 bg-gray-100 flex flex-col gap-2 items-center'>
                            <h3 className='text-xl md:text-2xl text-center font-medium md:font-semibold tracking-wider uppercase'>Shopping Summary</h3>
                            <div className='mt-2 w-11/12 md:w-1/2 flex flex-row justify-between'>
                                <h4 className="text-base md:text-lg font-medium">Total Price ({totalItems} items) :</h4>
                                <h3 className="text-lg md:text-xl font-semibold">$ {totalPrice}</h3>
                            </div>
                            <hr className='my-2 md:my-3 h-[2px] bg-gray-500 w-11/12 md:w-1/2'/>
                            <div className='w-11/12 md:w-1/2 flex flex-row justify-between'>
                                <h3 className="text-base md:text-lg font-bold md:font-extrabold">Grand Total :</h3>
                                <h2 className="text-lg md:text-xl font-bold md:font-extrabold">$ {totalPrice}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-3">
                        <span
                            className="text-gray-800 text-base tracking-wider hover:font-medium underline underline-offset-8 cursor-pointer"
                            onClick={handleHideModalCart}
                        >
                            Continue Shopping
                        </span>
                        <div className='flex gap-3'>
                            <button
                                type="button"
                                className="bg-white hover:bg-red-800 text-red-500 hover:text-white border border-red-800 py-3 px-5 md:px-8 rounded-xl text-sm md:text-base"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                            <button
                                type="button"
                                className="bg-green-600 hover:bg-green-800 text-white font-bold border border-green-800 py-3 px-5 md:px-8 rounded-xl text-sm md:text-base"
                                onClick={handleCheckoutToWhatsapp}
                            >
                                Checkout (Whatsapp)
                            </button>
                        </div>
                        
                    </div>
                </>
            : (
                <div className='my-8 flex flex-col justify-center items-center gap-7'>
                    <h3 className='text-xl text-gray-500 text-center font-bold tracking-wide italic'>Your Cart is Empty</h3>
                    <button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-800 text-white border border-gray-800 py-3 px-8 rounded-xl text-lg uppercase"
                        onClick={handleHideModalCart}
                    >
                        Shop Now
                    </button>
                </div>
            )}
        </div>
    </Modal>
  )
}

export default CartModal