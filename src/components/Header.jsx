/* eslint-disable react/prop-types */
import CartIcon from '../assets/cart.svg'
import { useSelector } from "react-redux"
import { selectCartTotalItems } from '../features/cart/cartSlice'

const Header = ({ handleOpenModalCart }) => {
    const totalItems = useSelector(selectCartTotalItems)

    return (
        <header className="fixed top-0 z-10 w-screen bg-white shadow shadow-b-2">
            <div className="max-w-full md:max-w-[90%] mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-gray-800">
                        Redux E-Commerce
                    </h1>
                    <button
                        type="button"
                        onClick={handleOpenModalCart}
                        className="relative rounded-full bg-gray-400 p-2 text-white"
                    >
                        {totalItems ?
                                <span className='absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] md:text-xs rounded-full flex justify-center items-center'>
                                    {totalItems}
                                </span>
                            : null
                        }
                        <img src={CartIcon} alt='cart' className='w-6 h-6'/>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header