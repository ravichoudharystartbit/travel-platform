import Image from "next/image";

const Hero = () => {
    return (
        // Main section with background image and grid layout
        <section className="relative pt-32 p-8 bg-gray-900 bg-cover text-white" style={{ backgroundImage: 'url(/Images/hero/estate-bg.jpeg)' }}>
            {/* Overlay for darkening the background image */}
            <div className="absolute inset-0 bg-transparent"></div>

            {/* Container to apply max width */}
            <div className="container mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {/* Left side: Text content */}
                <div className="flex flex-col justify-center items-start p-4 space-y-4">
                    <h1 className="text-5xl text-black font-bold">Find Your Best Real Estate</h1>
                    <p className="text-lg">Your journey to excellence begins here.</p>
                    <a href="#learn-more" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition duration-300">Learn More</a>
                </div>

                {/* Right side: Image */}
                <div className="flex justify-center items-center">
                    <Image src="/hero-image.jpg" alt="Hero Image" width={500} height={500} className="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>
        
    );
};

export default Hero;
