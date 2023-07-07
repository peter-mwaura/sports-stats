import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiFootballFill, RiBasketballFill } from 'react-icons/ri';
import { FaVolleyballBall, FaStripeS } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
// import addCountries from '../redux/features/countries-slice';
// import ICountries from '../redux/features/countries-slice';

const Navbar = () => {
    // const dispatch = useDispatch();
    const [search, setSearch] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState([]);
    const [link, setLink] = useState<number>(0);

    const navList = [
        {
            name: "Football",
            icon: <RiFootballFill size={25}/>,
        },
        {
            name: "Basketball",
            icon: <RiBasketballFill size={25}/>,
        },
        {
            name: "Volleyball",
            icon: <FaVolleyballBall size={20}/>,
        },
    ];
    
    const countries = useSelector((state:any) => state.countries);

    const getCurrentDimension = () => {
        return window.innerWidth; 
        // {
        //     width: window.innerWidth,
        //     height: window.innerHeight
        // };
    };

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    const fetchCountries = () => {
        const api_key = "2c1a7f7236b73e1b2c3a65eab887f803666467e4a5a4ae588e5f416c60b2dfc9";
        const url = `https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`;
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setData(data.result);
            })
    };

    useEffect(() => {
        fetchCountries();
        
    }, []);

    // dispatch(addCountries(countries));

    return (
        <nav className="bg-[#111] text-[#aaa] h-16 flex justify-between items-center px-4 md:h-24">
            <div className="cursor-pointer md:hidden">
                <FaBars size={20} />
            </div>
            
            <div className="text-white md:flex md:items-center md:gap-x-8">
                <div className="flex items-center text-2xl md:text-3xl">
                    <FaStripeS style={{color: "#f43f5e"}}/> 
                    <h1>portstats</h1>
                </div>
                
                <ul className="hidden md:flex md:gap-x-6 md:text-xl md:ml-6">
                    {navList.map((item, index) => {
                        return (
                            <li 
                                key={index} 
                                onClick={() => setLink(index)}
                                className={`${index === link ? "flex items-center gap-x-1 cursor-pointer text-rose border-b-2 border-rose":"flex items-center gap-x-1 cursor-pointer"}`}
                            > 
                                {item.icon}
                                <h3>{item.name}</h3>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div
                onClick={() => setSearch(!search)}
                className="z-10 cursor-pointer"
            >
                {search ? <FaTimes size={30} /> : <AiOutlineSearch size={25} />}
            </div>

            {search && (
                <div className="bg-[#111] text-[#aaa] absolute top-0 left-0 w-full h-screen px-4">
                    <div className="flex items-center gap-x-2 pt-5 md:pt-12">
                        <AiOutlineSearch size={25} />
                        <input
                            type="text"
                            placeholder="Search by Country..."
                            className="w-3/4 bg-[#111]"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>

                    <ul className="pt-20">
                    	{countries.map((country:any, index:any) => {
                    		return (
                    			<li key={index} className="flex gap-x-2 items-center">
                                    <div className="rounded-full">
                            	       <img
                            		      className="object-cover w-full w-50 h-50"
                            		      style={{ width: "20px", height: "20px" }}
                            		      src={country.country_logo} 
                            		      alt={country.country_logo}
                            	       />
                                    </div>
                                    <div className="text-white">
                            	       {country.country_name}
                                    </div>
                        	   </li>	
                    		)
                    	})}
                    </ul>
                </div>
            )}
        </nav>
    );
}
export default Navbar;
