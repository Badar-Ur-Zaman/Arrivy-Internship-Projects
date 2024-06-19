import React from "react";
import img from "../images/img1.jpg";

function About() {
    return (
        <div className="relative h-screen w-screen">
            <img src={img} alt="Background" className="absolute top-0 left-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center h-full p-8">
                <h1 className="text-gray-300 text-2xl sm:text-md md:text-md lg:text-2xl xl:text-3xl text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra mi ipsum. Nullam sed tempor tellus. Nunc gravida lacus vitae orci ultrices, et aliquet arcu suscipit. Nunc placerat porttitor bibendum. Quisque mattis pretium commodo. Nullam suscipit, est id tristique euismod, ipsum mauris tincidunt mauris, dignissim pulvinar sapien dolor et augue. Aenean a mauris gravida, consequat lectus nec, elementum nunc.
                    <br /><br />
                    Pellentesque in interdum nibh, in dapibus neque. Sed sed erat iaculis nulla iaculis ultricies eu vitae velit. Nam molestie nisl eget auctor gravida. Phasellus id tempor nibh, egestas varius purus. Nam ornare lacinia magna at pharetra. Vestibulum sed arcu et risus ultricies pellentesque. Suspendisse a est ligula. Fusce varius rhoncus congue.
                </h1>
            </div>
        </div>
    );
}

export default About;
