import Image from 'next/image';

const MaintenancePage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg text-center">
                <Image
                    src="/funkogram-logo.png"
                    alt="Funkogram Logo"
                    width={200}
                    height={200}
                    className="mx-auto"
                />
                <h1 className="text-3xl font-bold mt-6 text-funkogram_red">Технички проблеми</h1>
                <p className="text-lg text-gray-700 mt-4">
                    Се враќаме за кратко!
                </p>
                <div className="mt-8">
                    <div className="animate-bounce text-funkogram_red text-4xl">🔧</div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
