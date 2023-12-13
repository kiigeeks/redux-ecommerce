/* eslint-disable react/prop-types */
import { useSelector } from "react-redux"
import { selectCartTotalItems } from '../features/cart/cartSlice'
import { FaCartShopping } from "react-icons/fa6";

const Header = ({ handleOpenModalCart }) => {
    const totalItems = useSelector(selectCartTotalItems)
    return (
        <header className="fixed top-0 z-20 w-screen bg-white shadow shadow-b-2">
            <div className="max-w-full md:max-w-[90%] mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-gray-800 cursor-pointer">
                        Redux E-Commerce
                    </h1>
                    <button
                        type="button"
                        onClick={handleOpenModalCart}
                        className="relative rounded-full bg-gray-400 w-10 h-10 p-2 text-white flex justify-center items-center"
                    >
                        {totalItems ?
                                <span className='absolute -top-[10px] -right-[10px] w-6 h-6 bg-red-500 text-white text-xs md:text-xs rounded-full flex justify-center items-center'>
                                    {totalItems}
                                </span>
                            : null
                        }
                        <FaCartShopping className='w-5 md:w-6 h-5 md:h-6' />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header