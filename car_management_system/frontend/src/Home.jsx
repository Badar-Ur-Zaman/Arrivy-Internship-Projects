import React from "react"
import Header from "./Components/Slider";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";

function Home(){
    return(
        <div className="relative">
            <Navbar />
            <Header />
            <Search />
        </div>
    )
}

export default Home;