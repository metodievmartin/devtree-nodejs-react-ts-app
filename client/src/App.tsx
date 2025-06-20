const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Hello, World!</h1>
        <p className="text-gray-600 mb-6">
          This is a simple component to verify that Tailwind CSS is configured
          properly.
        </p>
        <div className="flex space-x-2">
          <div className="w-12 h-12 bg-blue-500 rounded-md"></div>
          <div className="w-12 h-12 bg-green-500 rounded-md"></div>
          <div className="w-12 h-12 bg-purple-500 rounded-md"></div>
          <div className="w-12 h-12 bg-yellow-500 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
