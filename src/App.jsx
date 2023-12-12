import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import ProductList from './features/productlist/ProductList'
import CartModal from './features/cart/CartModal'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import SearchIcon from "./assets/search.svg"

function App() {
	const [isModalCart, setIsModalCart] = useState(false)
    const [sidebarToggle, setSidebarToggle] = useState(false)
    const [animateSidebar, setAnimateSidebar] = useState("animate__slideInLeft")

	const handleOpenModalCart = () => {
		setIsModalCart(true)
	}

	const handleHideModalCart = () => {
		setIsModalCart(false)
	}

    const handleSidebar = () => {
        if(sidebarToggle) {
            setAnimateSidebar("animate__slideOutLeft animate__fast")
            setTimeout(() => {
                setSidebarToggle(false)
            }, 500)
        } else {
            setAnimateSidebar("animate__slideInLeft")
            setSidebarToggle(true)
        }
    }

	return (
		<>
			{isModalCart ? <CartModal handleHideModalCart={handleHideModalCart} /> : null }
			<Header handleOpenModalCart={handleOpenModalCart}/>
			<main className="min-h-[85vh] max-w-10/12 lg:max-w-[90%] mx-auto lg:px-4 flex flex-row mt-20 lg:gap-4 font-urbanist">
				<div className='hidden lg:block'>
					<Sidebar />
				</div>
				
				{sidebarToggle ?
					<div className='fixed top-0 z-20 w-screen h-screen bg-black bg-opacity-40'>
						<div className={`fixed z-20 w-9/12 h-screen flex bg-darkPrimary overflow-y-auto shadow-md animate__animated ${animateSidebar}`}>
							<div className="relative w-full flex">
								<Sidebar handleSidebar={handleSidebar}/>
							</div>
						</div>
						<div onClick={handleSidebar} className='fixed z-10 right-0 w-3/5 h-screen'>
						</div>
					</div>
				:
					<div onClick={handleSidebar} className='lg:hidden fixed top-28 -left-5 z-50 w-16 h-12 p-2 flex justify-end items-center bg-blue-500 rounded-lg'>
						<img src={SearchIcon} alt="cart" loading="lazy" className="w-8 h-8 object-cover" />
					</div>
				}
				<ProductList handleOpenModalCart={handleOpenModalCart}/>
			</main>
			<Footer />
		</>
	)
}

export default App
